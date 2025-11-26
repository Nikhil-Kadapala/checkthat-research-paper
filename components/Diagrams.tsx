
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, BarChart2, Share2, Layers, Database, MessageSquare, CheckCircle, Search, RefreshCw } from 'lucide-react';

// --- NETWORK TOPOLOGY DIAGRAM (Methodology: Transformer/Fine-tuning) ---
export const NetworkTopologyDiagram: React.FC = () => {
  const [activeNodes, setActiveNodes] = useState<number[]>([]);
  
  // Graph representing LLM Fine-tuning topology
  const nodes = [
    { id: 0, x: '20%', y: '50%', label: 'Input' },
    { id: 1, x: '50%', y: '20%', label: 'Attention' },
    { id: 2, x: '50%', y: '80%', label: 'Feed Fwd' },
    { id: 3, x: '80%', y: '50%', label: 'Output' },
  ];

  const toggleNode = (id: number) => {
    setActiveNodes(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-stone-800">Model Architecture: FLAN-T5</h3>
      <p className="text-sm text-stone-500 mb-6 text-center max-w-md">
        We fine-tuned the 783M parameter FLAN-T5 Large model. Click nodes to simulate the data flow during claim extraction.
      </p>
      
      <div className="relative w-64 h-64 bg-[#F9F9FA] rounded-lg border border-stone-200 p-4 flex flex-wrap justify-between content-between relative">
         {/* Connecting Lines */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            <line x1="20%" y1="50%" x2="50%" y2="20%" stroke="#333" strokeWidth="2" />
            <line x1="20%" y1="50%" x2="50%" y2="80%" stroke="#333" strokeWidth="2" />
            <line x1="50%" y1="20%" x2="80%" y2="50%" stroke="#333" strokeWidth="2" />
            <line x1="50%" y1="80%" x2="80%" y2="50%" stroke="#333" strokeWidth="2" />
            <line x1="50%" y1="20%" x2="50%" y2="80%" stroke="#333" strokeWidth="1" strokeDasharray="4" />
         </svg>

         {/* Nodes */}
         {nodes.map(node => (
             <button
                key={`node-${node.id}`}
                onClick={() => toggleNode(node.id)}
                className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10 ${activeNodes.includes(node.id) ? 'bg-slate-800 border-slate-900 text-white scale-110 shadow-lg' : 'bg-white border-stone-300 hover:border-slate-500 text-stone-400'}`}
                style={{ left: node.x, top: node.y }}
             >
                <Share2 size={18} />
             </button>
         ))}
      </div>

      <div className="mt-6 flex items-center gap-4 text-xs font-mono text-stone-500">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-slate-800"></div> Active</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-white border border-stone-300"></div> Frozen</div>
      </div>
      
      <div className="mt-4 h-6 text-sm font-serif italic text-stone-600">
        {activeNodes.length === 0 ? "Model idle." : `Processing tokens in ${activeNodes.length} layers.`}
      </div>
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
    // Baseline: Regurgitation Baseline (full post) ~0.19 or Cut-to-100 ~0.24. Let's use 0.24 for "Strong Baseline".
    // Proposed: Finetuned FLAN-T5-Large: 0.5569
    // Middle ground: Claimify (Prompting): 0.33
    
    // We will show comparisons for Validation set
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
