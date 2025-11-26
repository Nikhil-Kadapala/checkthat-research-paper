
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, AbstractDataScene } from './components/QuantumScene';
import { NetworkTopologyDiagram, ProcessFlowDiagram, ResultsChartDiagram } from './components/Diagrams';
import { ArrowDown, Menu, X, BookOpen, ExternalLink, Trophy, Medal, Star } from 'lucide-react';

// --- CONFIGURATION: UPDATED FOR UNH CHECKTHAT! 2025 PAPER ---
const paperData = {
  meta: {
    title: "UNH at CheckThat! 2025",
    subtitle: "Fine-tuning Vs Prompting in Claim Extraction",
    journal: "CLEF 2025 Working Notes",
    date: "September 2025",
    link: "https://ceur-ws.org/Vol-4038/paper_103.pdf"
  },
  hero: {
    title: "Claim Extraction",
    subtitle: "Fine-tuning Small Models vs. Prompting Giants",
    description: "An empirical study exploring the trade-offs between fine-tuning FLAN-T5 and prompting Large Language Models (LLMs) like LLaMA and Grok for automated fact-checking support."
  },
  introduction: {
    heading: "The Challenge",
    text1: "The CheckThat! Lab aims to support human fact-checkers by verifying social media text. Task 2 focuses on extracting the main claim from a post in succinct, neutral language suitable for manual verification.",
    text2: "We identify unique challenges such as missing multi-modal content (images), sarcasm, and the risk of 'hallucinations'—where models invent plausible but incorrect details not present in the source text."
  },
  methodology: {
    heading: "Hybrid Methodology",
    description1: "We explored the design space across three categories: Fine-tuning approaches (Flan-T5, DeepSeek), Prompting strategies (Few-shot, Chain-of-Thought), and 'Frustratingly Easy' baselines.",
    description2: "Our fine-tuning approach (visualized right) adapts the weights of smaller models like FLAN-T5 (783M parameters) to mimic the specific extraction patterns of the training data, contrasting with the frozen weights of prompted giant models."
  },
  innovation: {
    heading: "Key Innovation",
    description1: "We discovered a critical disconnect between automated metrics and human utility. While fine-tuned Flan-T5 achieved the highest METEOR score (0.56), it often produced overly literal extractions.",
    description2: "Conversely, prompting larger models with 'Self-Refinement' loops yielded lower automated scores but generated claims that better captured the underlying intent and nuance of sarcastic posts."
  },
  results: {
    heading: "Experimental Results",
    description: "We evaluated methods using METEOR scores on the validation set. Fine-tuning smaller models outperformed zero-shot prompting of massive models on this metric, setting a high benchmark despite qualitative limitations.",
    metrics: {
        baseline: "Baseline (Regurgitation)",
        proposed: "Fine-tuned Flan-T5",
        metricName: "METEOR Score"
    }
  },
  leaderboard: {
    heading: "Global Leaderboard Standing",
    description: "Our approaches demonstrated competitive performance on the official CLEF 2025 CheckThat! Task 2 leaderboard, securing top-tier positions against international research teams.",
    achievements: [
        {
            rank: "9th",
            entity: "UNH Team (Main)",
            detail: "Achieved with Fine-tuned FLAN-T5, focusing on METEOR score optimization.",
            icon: Trophy
        },
        {
            rank: "12th",
            entity: "Nikhil Kadapala",
            detail: "Individual submission using 'Claimify' Self-Refinement. Outperformed competitors by focusing on nuance over raw overlap.",
            icon: Medal
        }
    ]
  },
  impact: {
    heading: "Broader Impact",
    description1: "This work highlights the limitations of current automated evaluation metrics for abstractive tasks. High overlap scores do not always correlate with useful, verifiable claims.",
    description2: "The study demonstrates that while massive LLMs are capable reasoners, smaller, task-specific models can still dominate on structural extraction tasks when resources are constrained."
  },
  authors: [
    { name: "Joe Wilder", role: "Primary Author", delay: "0s" },
    { name: "Nikhil Kadapala", role: "Contributor", delay: "0.1s" },
    { name: "Benji Xu", role: "Contributor", delay: "0.2s" },
    { name: "Laura Dietz", role: "Supervisor", delay: "0.3s" }
  ]
};

const AuthorCard = ({ name, role, delay }: { name: string, role: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-slate-400" style={{ animationDelay: delay }}>
      <h3 className="font-serif text-2xl text-stone-900 text-center mb-3">{name}</h3>
      <div className="w-12 h-0.5 bg-slate-800 mb-4 opacity-60"></div>
      <p className="text-xs text-stone-500 font-bold uppercase tracking-widest text-center leading-relaxed">{role}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9FA] text-stone-800 selection:bg-slate-300 selection:text-stone-900">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F9F9FA]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-slate-900 rounded-sm flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm pb-1">U</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              UNH <span className="font-normal text-stone-500">Research</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-slate-900 transition-colors cursor-pointer uppercase">Introduction</a>
            <a href="#leaderboard" onClick={scrollToSection('leaderboard')} className="hover:text-slate-900 transition-colors cursor-pointer uppercase">Leaderboard</a>
            <a href="#methodology" onClick={scrollToSection('methodology')} className="hover:text-slate-900 transition-colors cursor-pointer uppercase">Methodology</a>
            <a href="#results" onClick={scrollToSection('results')} className="hover:text-slate-900 transition-colors cursor-pointer uppercase">Results</a>
            <a 
              href={paperData.meta.link}
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
            >
              <span>Read Paper</span>
              <ExternalLink size={14} />
            </a>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F9FA] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-slate-900 transition-colors cursor-pointer uppercase">Introduction</a>
            <a href="#leaderboard" onClick={scrollToSection('leaderboard')} className="hover:text-slate-900 transition-colors cursor-pointer uppercase">Leaderboard</a>
            <a href="#methodology" onClick={scrollToSection('methodology')} className="hover:text-slate-900 transition-colors cursor-pointer uppercase">Methodology</a>
            <a href="#results" onClick={scrollToSection('results')} className="hover:text-slate-900 transition-colors cursor-pointer uppercase">Results</a>
            <a 
              href={paperData.meta.link}
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setMenuOpen(false)} 
              className="px-6 py-3 bg-slate-900 text-white rounded-full shadow-lg cursor-pointer"
            >
              Read Paper
            </a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,249,250,0.85)_0%,rgba(249,249,250,0.5)_50%,rgba(249,249,250,0.3)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-slate-900 text-slate-900 text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30">
            {paperData.meta.journal}
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight md:leading-[1.1] mb-8 text-stone-900 drop-shadow-sm">
            {paperData.hero.title} <br/><span className="italic font-normal text-stone-600 text-2xl md:text-4xl block mt-4">{paperData.hero.subtitle}</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-700 font-light leading-relaxed mb-12">
            {paperData.hero.description}
          </p>
          
          <div className="flex justify-center">
             <a href="#introduction" onClick={scrollToSection('introduction')} className="group flex flex-col items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
                <span>DISCOVER</span>
                <span className="p-2 border border-stone-300 rounded-full group-hover:border-stone-900 transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Introduction */}
        <section id="introduction" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">Introduction</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-stone-900">{paperData.introduction.heading}</h2>
              <div className="w-16 h-1 bg-slate-900 mb-6"></div>
            </div>
            <div className="md:col-span-8 text-lg text-stone-600 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-slate-900">T</span>{paperData.introduction.text1}
              </p>
              <p>
                {paperData.introduction.text2}
              </p>
            </div>
          </div>
        </section>

        {/* Leaderboard Section */}
        <section id="leaderboard" className="py-20 bg-slate-900 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 bg-gradient-to-l from-blue-500 to-transparent"></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                     <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 text-yellow-400 border border-yellow-500/30 text-xs font-bold tracking-widest uppercase rounded-full mb-6">
                        <Trophy size={14} /> TOP PERFORMERS
                     </div>
                    <h2 className="font-serif text-4xl md:text-5xl mb-6">{paperData.leaderboard.heading}</h2>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">{paperData.leaderboard.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {paperData.leaderboard.achievements.map((item, idx) => (
                        <div key={idx} className="bg-slate-800/50 backdrop-blur-md rounded-xl p-8 border border-slate-700 hover:border-blue-500/50 transition-colors group">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <div className="text-5xl font-serif text-white mb-2">{item.rank}</div>
                                    <div className="text-sm uppercase tracking-widest text-blue-400 font-bold">Overall Rank</div>
                                </div>
                                <div className="p-3 bg-slate-700 rounded-lg group-hover:bg-blue-600 transition-colors">
                                    <item.icon className="text-white" size={24} />
                                </div>
                            </div>
                            <h3 className="text-2xl font-serif mb-3 text-white">{item.entity}</h3>
                            <p className="text-slate-400 leading-relaxed">{item.detail}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Methodology: Network Diagram */}
        <section id="methodology" className="py-24 bg-white border-t border-stone-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200">
                            <BookOpen size={14}/> SYSTEM MODEL
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">{paperData.methodology.heading}</h2>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                           {paperData.methodology.description1}
                        </p>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                            {paperData.methodology.description2}
                        </p>
                    </div>
                    <div>
                        <NetworkTopologyDiagram />
                    </div>
                </div>
            </div>
        </section>

        {/* Innovation: Process Flow */}
        <section className="py-24 bg-[#EBEBEF] text-stone-900 border-y border-stone-300">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <ProcessFlowDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-stone-900 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-300 shadow-sm">
                            <Star size={14} className="text-yellow-500 fill-yellow-500"/> THE INNOVATION
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">{paperData.innovation.heading}</h2>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                            {paperData.innovation.description1}
                        </p>
                        <p className="text-lg text-stone-600 leading-relaxed">
                            {paperData.innovation.description2}
                        </p>
                     </div>
                </div>
            </div>
        </section>

        {/* Results: Chart */}
        <section id="results" className="py-24 bg-[#F9F9FA]">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">{paperData.results.heading}</h2>
                    <p className="text-lg text-stone-600 leading-relaxed">
                        {paperData.results.description}
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <ResultsChartDiagram 
                        label1={paperData.results.metrics.baseline} 
                        label2={paperData.results.metrics.proposed}
                        metricName={paperData.results.metrics.metricName}
                    />
                </div>
            </div>
        </section>

        {/* Impact */}
        <section id="impact" className="py-24 bg-white border-t border-stone-200">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 relative">
                    <div className="aspect-square bg-[#F5F4F0] rounded-xl overflow-hidden relative border border-stone-200 shadow-inner">
                        <AbstractDataScene />
                        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-stone-400 font-serif italic">Conceptual visualization of claim extraction</div>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">IMPACT</div>
                    <h2 className="font-serif text-4xl mb-6 text-stone-900">{paperData.impact.heading}</h2>
                    <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                        {paperData.impact.description1}
                    </p>
                    <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                        {paperData.impact.description2}
                    </p>
                    
                    <div className="p-6 bg-[#F9F9FA] border border-stone-200 rounded-lg border-l-4 border-l-slate-900">
                        <p className="font-serif italic text-xl text-stone-800 mb-4">
                            "Most of our methods converged on a METEOR score of approximately 0.27. The differences between methods only became apparent through manual inspection."
                        </p>
                        <span className="text-sm font-bold text-stone-500 tracking-wider uppercase">— Wilder et al., 2025</span>
                    </div>
                </div>
             </div>
        </section>

        {/* Authors */}
        <section id="authors" className="py-24 bg-[#EBEBEF] border-t border-stone-300">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">RESEARCH TEAM</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-stone-900">University of New Hampshire</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">CS881 Graduate Course & CRA UR2PhD Program</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center flex-wrap">
                    {paperData.authors.map((author, index) => (
                        <AuthorCard 
                            key={index}
                            name={author.name} 
                            role={author.role} 
                            delay={author.delay} 
                        />
                    ))}
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2">{paperData.meta.title}</div>
                <p className="text-sm">{paperData.meta.subtitle}</p>
            </div>
            <div className="flex gap-6">
                <a href={paperData.meta.link} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest hover:text-white transition-colors">Read Paper</a>
            </div>
        </div>
        <div className="text-center mt-12 text-xs text-slate-600">
            Based on research published in {paperData.meta.journal}. Visualization generated by AI.
        </div>
      </footer>
    </div>
  );
};

export default App;
