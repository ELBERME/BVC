/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coins, User, Landmark, ShieldCheck, Activity, Award, HelpCircle, ChevronRight, RefreshCw, Sparkles, LogOut, ChevronDown } from 'lucide-react';

import { SceneId, PlayerState } from './types';
import { INITIAL_STOCKS } from './data';

import IntroScreen from './components/IntroScreen';
import Scene1Origin from './components/Scene1Origin';
import Scene2Fusion from './components/Scene2Fusion';
import Scene3Actors from './components/Scene3Actors';
import Scene4Investment from './components/Scene4Investment';
import Scene5Historic from './components/Scene5Historic';
import Scene6RiskPerfil from './components/Scene6RiskPerfil';
import Scene7Diversification from './components/Scene7Diversification';
import Scene8Derivatives from './components/Scene8Derivatives';
import Scene9FinalPortfolio from './components/Scene9FinalPortfolio';
import Scene10Summary from './components/Scene10Summary';

export default function App() {
  const [currentScene, setCurrentScene] = useState<SceneId>('INTRO');
  
  // Running ticker tape prices for visual honest details
  const [tickerPrices, setTickerPrices] = useState(INITIAL_STOCKS);

  // Player State
  const [player, setPlayer] = useState<PlayerState>({
    name: '',
    cash: 5000000,
    initialCash: 5000000,
    portfolioScene4: { cdt: 0, tes: 0, acciones: 0 },
    decisions: {
      moneyChoice: null,
      actedDirectly: false,
      riskAction: null,
      hedgeDerivados: null
    },
    riskProfile: null
  });

  // Final decenal simulation results buffer
  const [finalSimStats, setFinalSimStats] = useState<{
    finalBalance: number;
    initialBalance: number;
    accionesAllocated: number;
    rentaFijaAllocated: number;
    ficsAllocated: number;
    inflationErosion: number;
    history: number[];
    simulationLogs?: { year: number; balance: number; news: string; performance: string }[];
  } | null>(null);

  // Custom visual scrollbar position and height trackers for absolute stability
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight > 5) {
        const progress = Math.min((scrollTop / scrollHeight) * 100, 100);
        setScrollProgress(progress);
        setIsScrollable(true);
      } else {
        setScrollProgress(0);
        setIsScrollable(false);
      }
    };

    // Attach resize observer to handle content length expansion dynamically (e.g., when scene results load)
    const observer = new ResizeObserver(() => {
      handleScroll();
    });
    observer.observe(document.body);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Fire initially and with a slight timeout to catch layout settling
    handleScroll();
    const initTimer = setTimeout(handleScroll, 120);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      observer.disconnect();
      clearTimeout(initTimer);
    };
  }, [currentScene, finalSimStats]);

  // Live simulation of ticker tape prices
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerPrices((prev) =>
        prev.map((ticker) => {
          const move = (Math.random() - 0.49) * (ticker.price * 0.015);
          return {
            ...ticker,
            price: Math.max(10, Math.round(ticker.price + move))
          };
        })
      );
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Handle Init Name
  const handleStart = (name: string) => {
    setPlayer((prev) => ({ ...prev, name }));
    setCurrentScene('SCENE_1_ORIGIN');
  };

  // Handle Scene 1 Origin choices
  const handleScene1Choice = (choice: 'gastar' | 'banco' | 'invertir') => {
    // If they spent, their virtual wallet is dry
    const nextCash = choice === 'gastar' ? 150000 : 5000000;
    
    setPlayer((prev) => ({
      ...prev,
      cash: nextCash,
      decisions: { ...prev.decisions, moneyChoice: choice }
    }));
    setCurrentScene('SCENE_2_FUSION');
  };

  // Handle Scene 4 First Investment results
  const handleScene4Complete = (portfolio: { cdt: number; tes: number; acciones: number }) => {
    setPlayer((prev) => ({
      ...prev,
      portfolioScene4: portfolio
    }));
    setCurrentScene('SCENE_5_HISTORIC');
  };

  // Handle Scene 6 Risk reaction
  const handleScene6Complete = (
    action: 'vender' | 'mantener' | 'comprar',
    profile: 'conservador' | 'moderado' | 'agresivo'
  ) => {
    setPlayer((prev) => ({
      ...prev,
      riskProfile: profile,
      decisions: { ...prev.decisions, riskAction: action }
    }));
    setCurrentScene('SCENE_7_DIVERSIFICATION');
  };

  // Handle Scene 8 Derivatives choice
  const handleScene8Complete = (boughtHedge: boolean) => {
    setPlayer((prev) => ({
      ...prev,
      decisions: { ...prev.decisions, hedgeDerivados: boughtHedge }
    }));
    setCurrentScene('SCENE_9_FINAL_PORTFOLIO');
  };

  // Handle final Decenal portfolio simulator complete
  const handleFinalComplete = (stats: {
    finalBalance: number;
    initialBalance: number;
    accionesAllocated: number;
    rentaFijaAllocated: number;
    ficsAllocated: number;
    inflationErosion: number;
    history: number[];
    simulationLogs?: { year: number; balance: number; news: string; performance: string }[];
  }) => {
    setFinalSimStats(stats);
    setCurrentScene('SCENE_10_SUMMARY');
  };

  // Reset/Restart game loop
  const handleRestart = () => {
    setPlayer({
      name: '',
      cash: 5000000,
      initialCash: 5000000,
      portfolioScene4: { cdt: 0, tes: 0, acciones: 0 },
      decisions: {
        moneyChoice: null,
        actedDirectly: false,
        riskAction: null,
        hedgeDerivados: null
      },
      riskProfile: null
    });
    setFinalSimStats(null);
    setCurrentScene('INTRO');
  };

  // Timeline Progress Helpers
  const timelineSteps = [
    { title: 'Origen', scene: 'SCENE_1_ORIGIN' },
    { title: 'Fusión BVC', scene: 'SCENE_2_FUSION' },
    { title: 'Actores', scene: 'SCENE_3_ACTORS' },
    { title: 'CDT o Acciones', scene: 'SCENE_4_INVESTMENT' },
    { title: '2001 Reto', scene: 'SCENE_5_HISTORIC' },
    { title: 'Crash', scene: 'SCENE_6_RISK_PERFIL' },
    { title: 'Socio o Cesta', scene: 'SCENE_7_DIVERSIFICATION' },
    { title: 'Dólar Futuro', scene: 'SCENE_8_DERIVATIVES' },
    { title: '10 Años', scene: 'SCENE_9_FINAL_PORTFOLIO' }
  ];

  const getStepProgressIndex = () => {
    const currentIdx = timelineSteps.findIndex((s) => s.scene === currentScene);
    return currentIdx === -1 && currentScene === 'SCENE_10_SUMMARY' ? 9 : currentIdx;
  };

  const progressIndex = getStepProgressIndex();

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950 font-sans relative antialiased leading-snug">
      
      {/* BACKGROUND DECORATIVE GRID */}
      <div className="absolute inset-0 mesh-bg pointer-events-none -z-20" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none -z-20" />

      {/* PERSISTENT HEADER (IF NOT ON INTRO) */}
      {currentScene !== 'INTRO' && (
        <>
          <header className="border-b border-white/10 bg-white/[0.03] backdrop-blur-md sticky top-0 z-40 px-4 py-3 shrink-0">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              
              {/* Title / Brand */}
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-display font-black text-white text-sm shadow">
                  B
                </span>
                <div className="text-left">
                  <span className="font-display font-extrabold text-xs sm:text-sm tracking-tight text-white block">
                    BVC <span className="text-blue-500 font-bold uppercase">Simulator</span>
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 block uppercase tracking-wider">
                    Bolsa de Valores de Colombia
                  </span>
                </div>
              </div>

              {/* Timeline Process */}
              <div className="hidden lg:flex items-center gap-1.5 font-mono text-[9px] text-slate-500 font-bold uppercase">
                {timelineSteps.map((step, idx) => {
                  const isPassed = idx < progressIndex;
                  const isCurrent = idx === progressIndex;

                  return (
                    <React.Fragment key={idx}>
                      <span className={`transition-all ${isCurrent ? 'text-blue-400' : isPassed ? 'text-slate-300' : 'text-slate-600'}`}>
                        {step.title}
                      </span>
                      {idx < timelineSteps.length - 1 && <ChevronRight className="w-3 h-3 text-slate-700" />}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* User credentials */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 p-1.5 px-3 bg-white/5 rounded-lg border border-white/10 text-xs text-slate-200 font-mono">
                  <User className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="max-w-28 truncate font-semibold font-sans">{player.name || 'Inversionista'}</span>
                </div>

                <button
                  onClick={handleRestart}
                  title="Salir / Reiniciar"
                  className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-slate-400 hover:text-red-400 cursor-pointer transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

            </div>
          </header>

          {/* STABLE HORIZONTAL SCROLLBAR PROGRESS INDICATOR (NEVER HIDDEN, HIGHLY VISIBLE ON SCREEN) */}
          <div className="sticky top-[58px] left-0 right-0 h-1.5 bg-slate-950 z-45 shrink-0 select-none overflow-hidden border-b border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-500 shadow-[0_0_12px_rgba(16,185,129,0.9)] transition-all duration-75"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* PARALLEL PERSISTENT VERTICAL SCROLLBAR (STABLE, REMAINS ALWAYS CONSTANT TO DEPICT ADDITIONAL DOWNWARD CONTENT) */}
          <div className="fixed right-3.5 top-[120px] bottom-[100px] w-5 rounded-full bg-slate-950/90 border-2 border-emerald-500/40 p-1 z-45 hidden md:flex flex-col justify-between items-center select-none shadow-2xl shadow-emerald-500/15">
            {/* Top Indicator */}
            <span className="text-[10px] font-mono text-emerald-400 font-extrabold animate-pulse">▲</span>
            
            {/* Stable inner track container */}
            <div className="flex-1 w-full relative my-3 bg-slate-900/80 rounded-full overflow-hidden border border-emerald-500/10 min-h-[120px]">
              {/* Dynamic scroll progress indicator block */}
              <div 
                className="absolute w-full rounded-full bg-gradient-to-b from-emerald-400 via-teal-300 to-blue-500 shadow-[0_0_14px_rgba(16,185,129,0.95)] transition-all duration-75"
                style={{ 
                  height: '15%', 
                  top: `${scrollProgress * 0.85}%`
                }}
              />
            </div>

            {/* Downward indicator emphasizing scroll capability */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-mono text-emerald-400 font-extrabold animate-bounce">▼</span>
              <span className="text-[7.5px] font-mono text-emerald-400 font-black leading-none uppercase tracking-widest origin-center rotate-90 my-5 whitespace-nowrap">
                HAY MÁS ABAJO
              </span>
            </div>
          </div>
        </>
      )}

      {/* CORE FRAMEWORK STAGE */}
      <main className="flex-grow flex flex-col justify-center py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {currentScene === 'INTRO' && (
              <IntroScreen onStart={handleStart} />
            )}
            
            {currentScene === 'SCENE_1_ORIGIN' && (
              <Scene1Origin onNext={handleScene1Choice} playerName={player.name} />
            )}

            {currentScene === 'SCENE_2_FUSION' && (
              <Scene2Fusion onNext={() => setCurrentScene('SCENE_3_ACTORS')} />
            )}

            {currentScene === 'SCENE_3_ACTORS' && (
              <Scene3Actors
                playerName={player.name}
                onNext={(triedDirect) => {
                  setPlayer((prev) => ({
                    ...prev,
                    decisions: { ...prev.decisions, actedDirectly: triedDirect }
                  }));
                  setCurrentScene('SCENE_4_INVESTMENT');
                }}
              />
            )}

            {currentScene === 'SCENE_4_INVESTMENT' && (
              <Scene4Investment onNext={handleScene4Complete} playerName={player.name} />
            )}

            {currentScene === 'SCENE_5_HISTORIC' && (
              <Scene5Historic onNext={() => setCurrentScene('SCENE_6_RISK_PERFIL')} />
            )}

            {currentScene === 'SCENE_6_RISK_PERFIL' && (
              <Scene6RiskPerfil onNext={handleScene6Complete} playerName={player.name} />
            )}

            {currentScene === 'SCENE_7_DIVERSIFICATION' && (
              <Scene7Diversification onNext={() => setCurrentScene('SCENE_8_DERIVATIVES')} />
            )}

            {currentScene === 'SCENE_8_DERIVATIVES' && (
              <Scene8Derivatives onNext={handleScene8Complete} />
            )}

            {currentScene === 'SCENE_9_FINAL_PORTFOLIO' && (
              <Scene9FinalPortfolio onComplete={handleFinalComplete} playerName={player.name} onRestart={handleRestart} />
            )}

            {currentScene === 'SCENE_10_SUMMARY' && finalSimStats && (
              <Scene10Summary
                stats={finalSimStats}
                playerName={player.name}
                calculatedProfile={player.riskProfile || 'moderado'}
                onRestart={handleRestart}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* PERSISTENT FOOTER TICKER BAND */}
      <footer className="h-10 glass mx-4 mb-4 flex items-center overflow-hidden shrink-0 select-none print:hidden z-10 mt-auto">
        <div className="bg-blue-600 px-4 h-full flex items-center text-[10px] font-bold uppercase tracking-wider z-20 text-white shrink-0">BVC LIVE</div>
        <div className="flex-1 overflow-hidden relative flex items-center">
          <div className="flex items-center gap-10 whitespace-nowrap animate-[marquee_24s_linear_infinite] hover:[animation-play-state:paused] inline-flex py-1">
            {/* Duplicate stock list to ensure smooth scrolling loop */}
            {[...tickerPrices, ...tickerPrices, ...tickerPrices].map((ticker, idx) => {
              const isUp = idx % 2 === 0; // simulated differences
              const diffSim = isUp ? '+' : '-';
              const diffPctSim = (isUp ? 0.35 : 0.42) + (idx % 3) * 0.12;

              return (
                <span key={idx} className="inline-flex items-center gap-2 font-mono text-[10px] text-slate-300 active:scale-95 duration-200">
                  <span className="font-bold text-white">{ticker.symbol}</span>
                  <span className="text-slate-100">${ticker.price.toLocaleString('es-CO')}</span>
                  <span className={`font-bold text-[9px] ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {diffSim}{diffPctSim.toFixed(2)}%
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </footer>

      {/* Custom CSS for ticker tape marquee scrolling */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>

    </div>
  );
}
