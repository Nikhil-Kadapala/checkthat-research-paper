
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Cpu, BarChart2, Share2, Layers, Database, MessageSquare, CheckCircle, RefreshCw, Zap, ArrowRight, AlertCircle } from 'lucide-react';

// --- FINE-TUNING PROCESS VISUALIZER ---
export const NetworkTopologyDiagram: React.FC = () => {
  const [phase, setPhase] = useState<'idle' | 'forward_bad' | 'error' | 'backprop' | 'update' | 'forward_good' | 'success'>('idle');
  
  const runSimulation = () => {
    if (phase !== 'idle' && phase !== 'success') return;
    
    // Animation Sequence
    setPhase('forward_bad');
    setTimeout(() => setPhase('error'), 1500);
    setTimeout(() => setPhase('backprop'), 2500);
    setTimeout(() => setPhase('update'), 4000);
    setTimeout(() => setPhase('forward_good'), 5500);
    setTimeout(() => setPhase('success'), 7000);
    setTimeout(() => setPhase('idle'), 9000);
  };

  // Node positions
  const layers = [
    { x: 50, count: 3, label: "Input" },
    { x: 150, count: 4, label: "Hidden" },
    { x: 250, count: 2, label: "Output" }
  ];

  // Generate connections
  const connections = [];
  for (let i = 0; i < layers.length - 1; i++) {
    for (let j = 0; j < layers[i].count; j++) {
        for (let k = 0; k < layers[i+1].count; k++) {
            connections.push({
                id: `l${i}-${j}-to-l${i+1}-${k}`,
                x1: layers[i].x,
                y1: 50 + (j * 40) - ((layers[i].count-1)*20),
                x2: layers[i+1].x,
                y2: 50 + (k * 40) - ((layers[i+1].count-1)*20),
                layer: i
            });
        }
    }
  }

  const isTuned = phase === 'update' || phase === 'forward_good' || phase === 'success';

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-stone-200 my-8 w-full max-w-lg mx-auto">
      <div className="flex justify-between items-center w-full mb-6">
        <div>
            <h3 className="font-serif text-xl text-stone-900">Fine-Tuning Process</h3>
            <p className="text-xs text-stone-500 uppercase tracking-wider font-bold mt-1">Weight Adaptation Logic</p>
        </div>
        <button 
            onClick={runSimulation}
            disabled={phase !== 'idle' && phase !== 'success'}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${phase === 'idle' || phase === 'success' ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-md cursor-pointer' : 'bg-stone-100 text-stone-400 cursor-not-allowed'}`}
        >
            <RefreshCw size={14} className={phase !== 'idle' && phase !== 'success' ? 'animate-spin' : ''} />
            {phase === 'idle' || phase === 'success' ? 'Start Training' : 'Training...'}
        </button>
      </div>

      <div className="relative w-full h-64 bg-[#F9F9FA] rounded-lg border border-stone-200 overflow-hidden select-none">
         <svg className="w-full h-full" viewBox="0 0 300 150">
            {/* Connections */}
            {connections.map((conn) => (
                <motion.line 
                    key={conn.id}
                    x1={conn.x1} y1={conn.y1}
                    x2={conn.x2} y2={conn.y2}
                    strokeWidth={isTuned ? 2 : 1}
                    initial={{ stroke: "#e2e8f0" }}
                    animate={{ 
                        stroke: isTuned ? "#3b82f6" : "#e2e8f0",
                        opacity: isTuned ? 0.8 : 0.4 
                    }}
                    transition={{ duration: 1 }}
                />
            ))}

            {/* Backprop Gradients (Reverse Flow) */}
            <AnimatePresence>
                {phase === 'backprop' && connections.map((conn, i) => (
                    <motion.circle
                        key={`grad-${i}`}
                        r={2}
                        fill="#ef4444"
                        initial={{ cx: conn.x2, cy: conn.y2, opacity: 0 }}
                        animate={{ 
                            cx: conn.x1, 
                            cy: conn.y1, 
                            opacity: [0, 1, 0],
                        }}
                        transition={{ 
                            duration: 0.8, 
                            delay: Math.random() * 0.2 + (conn.layer === 1 ? 0 : 0.5), // Reverse layer order timing
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* Forward Data Flow */}
            <AnimatePresence>
                {(phase === 'forward_bad' || phase === 'forward_good') && connections.map((conn, i) => (
                    <motion.circle
                        key={`data-${phase}-${i}`}
                        r={3}
                        fill={phase === 'forward_good' ? "#22c55e" : "#64748b"}
                        initial={{ cx: conn.x1, cy: conn.y1 }}
                        animate={{ cx: conn.x2, cy: conn.y2 }}
                        transition={{ 
                            duration: 0.6, 
                            delay: Math.random() * 0.1 + (conn.layer * 0.3),
                            ease: "linear"
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* Nodes */}
            {layers.map((layer, lIdx) => (
                <g key={lIdx}>
                    {Array.from({ length: layer.count }).map((_, nIdx) => {
                        const cy = 50 + (nIdx * 40) - ((layer.count-1)*20);
                        return (
                            <motion.circle 
                                key={`node-${lIdx}-${nIdx}`}
                                cx={layer.x} 
                                cy={cy} 
                                r={6}
                                fill="white"
                                stroke="#334155"
                                strokeWidth={2}
                                animate={{
                                    scale: phase === 'update' ? [1, 1.2, 1] : 1,
                                    stroke: phase === 'update' ? "#3b82f6" : "#334155"
                                }}
                                transition={{ duration: 0.5 }}
                            />
                        );
                    })}
                </g>
            ))}
         </svg>
         
         {/* Status Indicators */}
         <div className="absolute top-2 left-2 right-2 flex justify-between text-[10px] font-mono font-bold text-stone-400">
            <span>EPOCH: {isTuned ? '10/10' : '0/10'}</span>
            <span className={phase === 'backprop' ? 'text-red-500 animate-pulse' : ''}>
                {phase === 'backprop' ? 'BACKPROPAGATING ERROR...' : phase === 'update' ? 'UPDATING WEIGHTS...' : ''}
            </span>
         </div>

         {/* Result Popup */}
         <AnimatePresence>
            {phase === 'error' && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-100 text-red-800 px-3 py-2 rounded border border-red-200 flex items-center gap-2 shadow-sm"
                >
                    <AlertCircle size={16} />
                    <span className="text-xs font-bold">High Loss</span>
                </motion.div>
            )}
            {phase === 'success' && (
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-green-100 text-green-800 px-3 py-2 rounded border border-green-200 flex items-center gap-2 shadow-sm"
                >
                    <CheckCircle size={16} />
                    <span className="text-xs font-bold">Claim Extracted</span>
                </motion.div>
            )}
         </AnimatePresence>
      </div>
      
      <p className="mt-4 text-sm text-stone-500 text-center italic">
         {phase === 'idle' ? 'Ready to train. ' : ''}
         {phase === 'forward_bad' ? 'Initial forward pass with random weights.' : ''}
         {phase === 'error' ? 'Output deviates from Gold Standard (Loss).' : ''}
         {phase === 'backprop' ? 'Calculating gradients (Backpropagation).' : ''}
         {phase === 'update' ? 'Optimizing weights for task.' : ''}
         {phase === 'forward_good' ? 'Inference with fine-tuned weights.' : ''}
         {phase === 'success' ? 'Model successfully aligned.' : ''}
      </p>
    </div>
  );
};

// --- PROCESS FLOW DIAGRAM (Claim Extraction Pipeline) ---
export const ProcessFlowDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-8 bg-[#F5F4F0] rounded-xl border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-stone-900">Claim Extraction Pipeline</h3>
      <p className="text-sm text-stone-600 mb-6 text-center max-w-md">
        From social media noise to verifiable fact through iterative refinement.
      </p>

      <div className="relative w-full max-w-lg h-56 bg-white rounded-lg shadow-inner overflow-hidden mb-6 border border-stone-200 flex items-center justify-center gap-6 p-4">
        
        {/* Input Stage */}
        <div className="flex flex-col items-center gap-2">
            <div className={`w-14 h-14 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 ${step === 0 ? 'border-blue-500 bg-blue-50' : 'border-stone-200 bg-stone-50'}`}>
                <MessageSquare size={20} className={step === 0 ? 'text-blue-500' : 'text-stone-300'} />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Social Post</span>
        </div>

        {/* Arrow */}
        <motion.div animate={{ opacity: step >= 1 ? 1 : 0.3, x: step >= 1 ? 0 : -5 }}>→</motion.div>

        {/* Processing Stage */}
        <div className="flex flex-col items-center gap-2">
             <div className={`w-20 h-20 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-colors duration-500 relative overflow-hidden ${step === 1 || step === 2 ? 'border-slate-800 bg-slate-900 text-white' : 'border-stone-200 bg-stone-50'}`}>
                {step === 2 ? <RefreshCw size={24} className="animate-spin text-white" /> : <Cpu size={24} className={step === 1 ? 'text-white animate-pulse' : 'text-stone-300'} />}
                
                {step === 1 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-[1px] bg-blue-400 absolute top-1/3 animate-ping"></div>
                    </div>
                )}
             </div>
             <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">{step === 2 ? "Self-Refine" : "LLM Extract"}</span>
        </div>

        {/* Arrow */}
        <motion.div animate={{ opacity: step >= 3 ? 1 : 0.3, x: step >= 3 ? 0 : -5 }}>→</motion.div>

        {/* Output Stage */}
        <div className="flex flex-col items-center gap-2">
            <div className={`w-14 h-14 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 ${step === 3 ? 'border-green-500 bg-green-50' : 'border-stone-200 bg-stone-50'}`}>
                <CheckCircle size={20} className={step === 3 ? 'text-green-600' : 'text-stone-300'}/>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Claim</span>
        </div>

      </div>

      <div className="flex gap-2">
          {[0, 1, 2, 3].map(s => (
              <div key={s} className={`h-1 rounded-full transition-all duration-300 ${step === s ? 'w-8 bg-slate-800' : 'w-2 bg-stone-300'}`}></div>
          ))}
      </div>
    </div>
  );
};

// --- RESULTS CHART DIAGRAM (Specific to Paper Results) ---
export const ResultsChartDiagram: React.FC<{ label1: string, label2: string, metricName: string }> = ({ label1, label2, metricName }) => {
    const [dataset, setDataset] = useState<number>(0);
    
    // Data extracted from Table 2 of the paper
    const data = [
        { name: "Validation Set", baseline: 24, proposed: 56 }, // Baseline vs FLAN-T5
        { name: "Test Set", baseline: 23, proposed: 37 }        // Baseline vs FLAN-T5
    ];

    const currentData = data[dataset];
    const maxVal = 60; // Scale to 60 since max score is ~0.56

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-slate-900 text-stone-100 rounded-xl my-8 border border-slate-800 shadow-lg">
            <div className="flex-1 min-w-[240px]">
                <h3 className="font-serif text-xl mb-2 text-white">Performance Metrics</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                    Fine-tuning the smaller FLAN-T5 model yielded significantly higher METEOR scores than the baseline, though test set generalization proved more challenging.
                </p>
                <div className="flex gap-2 mt-6">
                    {data.map((d, i) => (
                        <button 
                            key={i}
                            onClick={() => setDataset(i)} 
                            className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 border ${dataset === i ? 'bg-white text-slate-900 border-white' : 'bg-transparent text-slate-400 border-slate-700 hover:border-slate-500 hover:text-slate-200'}`}
                        >
                            {d.name}
                        </button>
                    ))}
                </div>
                <div className="mt-6 font-mono text-xs text-slate-500 flex items-center gap-2">
                    <BarChart2 size={14} className="text-white" /> 
                    <span className="uppercase">{metricName} (Higher is Better)</span>
                </div>
            </div>
            
            <div className="relative w-64 h-72 bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 flex justify-around items-end">
                {/* Background Grid Lines */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none opacity-10">
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                </div>

                {/* Baseline Bar */}
                <div className="w-20 flex flex-col justify-end items-center h-full z-10">
                    <div className="flex-1 w-full flex items-end justify-center relative mb-3">
                        <div className="absolute -top-6 w-full text-center text-sm font-mono text-slate-400 font-bold bg-slate-900/90 py-1 px-2 rounded backdrop-blur-sm border border-slate-700/50 shadow-sm">0.{currentData.baseline}</div>
                        <motion.div 
                            className="w-full bg-slate-600 rounded-t-md border-t border-x border-slate-500/30"
                            initial={{ height: 0 }}
                            animate={{ height: `${(currentData.baseline / maxVal) * 100}%` }}
                            transition={{ type: "spring", stiffness: 80, damping: 15 }}
                        />
                    </div>
                    <div className="h-8 flex items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center leading-tight">{label1}</div>
                </div>

                {/* Proposed Bar */}
                <div className="w-20 flex flex-col justify-end items-center h-full z-10">
                     <div className="flex-1 w-full flex items-end justify-center relative mb-3">
                        <div className="absolute -top-6 w-full text-center text-sm font-mono text-white font-bold bg-slate-900/90 py-1 px-2 rounded backdrop-blur-sm border border-white/30 shadow-sm">0.{currentData.proposed}</div>
                        <motion.div 
                            className="w-full bg-blue-500 rounded-t-md shadow-[0_0_20px_rgba(59,130,246,0.25)] relative overflow-hidden"
                            initial={{ height: 0 }}
                            animate={{ height: `${(currentData.proposed / maxVal) * 100}%` }}
                            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.1 }}
                        >
                           {/* Shine effect */}
                           <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20"></div>
                        </motion.div>
                    </div>
                     <div className="h-8 flex items-center text-[10px] font-bold text-blue-400 uppercase tracking-wider text-center leading-tight">{label2}</div>
                </div>
            </div>
        </div>
    )
}
