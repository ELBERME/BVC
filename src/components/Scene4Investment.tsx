/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Calendar, DollarSign, Award, TrendingUp, Sparkles, Plus, Minus, Info, ArrowRight, Bell, RefreshCw, Landmark } from 'lucide-react';

interface Scene4InvestmentProps {
  onNext: (portfolio: { cdt: number; tes: number; acciones: number }) => void;
  playerName: string;
}

export default function Scene4Investment({ onNext, playerName }: Scene4InvestmentProps) {
  const TOTAL_CAPITAL = 5000000;
  
  // Allocations (multiples of 500,000 COP)
  const [cdt, setCdt] = useState(0);
  const [tes, setTes] = useState(0);
  const [acciones, setAcciones] = useState(0);

  const [simulating, setSimulating] = useState(false);
  const [day, setDay] = useState(0);
  const [balanceHistory, setBalanceHistory] = useState<{ day: number; total: number; cdtVal: number; tesVal: number; accVal: number }[]>([]);
  const [simResults, setSimResults] = useState<{
    cdtFinal: number;
    tesFinal: number;
    accFinal: number;
    dividendReceived: number;
    valorizacionGain: number;
  } | null>(null);

  const [notifications, setNotifications] = useState<{ id: string; text: string; day: number }[]>([]);

  const allocated = cdt + tes + acciones;
  const remaining = TOTAL_CAPITAL - allocated;

  const handleAdjust = (asset: 'cdt' | 'tes' | 'acciones', direction: 'plus' | 'minus') => {
    if (simulating) return;
    const CHUNK = 500000;

    if (direction === 'plus') {
      if (remaining >= CHUNK) {
        if (asset === 'cdt') setCdt((v) => v + CHUNK);
        if (asset === 'tes') setTes((v) => v + CHUNK);
        if (asset === 'acciones') setAcciones((v) => v + CHUNK);
      }
    } else {
      if (asset === 'cdt' && cdt >= CHUNK) setCdt((v) => v - CHUNK);
      if (asset === 'tes' && tes >= CHUNK) setTes((v) => v - CHUNK);
      if (asset === 'acciones' && acciones >= CHUNK) setAcciones((v) => v - CHUNK);
    }
  };

  const handleQuickPreset = (preset: 'safe' | 'balanced' | 'aggressive') => {
    if (simulating) return;
    if (preset === 'safe') {
      setCdt(2500000);
      setTes(2000000);
      setAcciones(500000);
    } else if (preset === 'balanced') {
      setCdt(1500000);
      setTes(1500000);
      setAcciones(2000000);
    } else {
      setCdt(0);
      setTes(500000);
      setAcciones(4500000);
    }
  };

  const startSimulation = () => {
    if (allocated === 0) return;
    setSimulating(true);
    setDay(0);
    setBalanceHistory([]);
    setNotifications([]);
    setSimResults(null);
  };

  // Perform simulation step-by-step
  useEffect(() => {
    if (!simulating) return;

    if (day >= 90) {
      // Calculate finished values
      // CDT: flawless 10% E.A. -> in 90 days is approx (10% * 90/365) = 2.46%
      const cdtProfit = Math.round(cdt * 0.0246);
      
      // TES: sovereign 11.5% E.A. -> approx 2.83%
      const tesProfit = Math.round(tes * 0.0283);

      // Acciones: random final price fluctuation between -15% and +28%
      // Let's make it typical positive outcome for Ecopetrol: +14% capital gain
      const capitalGainPct = 0.145;
      const valorizacionGain = Math.round(acciones * capitalGainPct);
      
      // Dividend: flat decreed cash proportional to holdings
      const dividendReceived = acciones > 0 ? Math.round((acciones / 2500) * 125) : 0; // simulated dividend yield

      setSimResults({
        cdtFinal: cdt + cdtProfit,
        tesFinal: tes + tesProfit,
        accFinal: acciones + valorizacionGain,
        dividendReceived,
        valorizacionGain
      });
      setSimulating(false);
      return;
    }

    const timer = setTimeout(() => {
      setDay((d) => d + 3);

      // Fluctuating values step-by-step
      const cdtAccumulated = cdt * (1 + (0.0246 * (day / 90)));
      const tesAccumulated = tes * (1 + (0.0283 * (day / 90)));
      
      // Acciones fluctuates with a wavy trajectory with positive drift
      // At day 45 it takes a dip, at day 65 it recovers, at day 90 it finishes up
      let accMult = 1;
      if (day < 30) {
        accMult = 1 + (0.05 * (day / 30)); // rises first
      } else if (day < 60) {
        accMult = 1.05 - (0.09 * ((day - 30) / 30)); // falls slightly
      } else {
        accMult = 0.96 + (0.185 * ((day - 60) / 30)); // recovers and soars
      }
      const accAccumulated = acciones * accMult;

      const totalValue = Math.round(cdtAccumulated + tesAccumulated + accAccumulated + remaining);

      setBalanceHistory((prev) => [
        ...prev,
        {
          day,
          total: totalValue,
          cdtVal: Math.round(cdtAccumulated),
          tesVal: Math.round(tesAccumulated),
          accVal: Math.round(accAccumulated)
        }
      ]);

      // Trigger notifications during simulation
      if (day === 15 && acciones > 0) {
        setNotifications((prev) => [
          ...prev,
          { id: '1', text: '📈 ECOPETROL avanza un 5% por rumores de nuevos descubrimientos de gas en el Caribe.', day: 15 }
        ]);
      }
      if (day === 45 && acciones > 0) {
        setNotifications((prev) => [
          ...prev,
          { id: '2', text: '🔔 DIVIDENDOS DECRETADOS: Junta directiva de Ecopetrol confirma pago extraordinario de dividendos.', day: 45 }
        ]);
      }
      if (day === 60 && tes > 0) {
        setNotifications((prev) => [
          ...prev,
          { id: '3', text: '🏦 MINISTERIO DE HACIENDA: TES cumplen pago puntual de intereses semestrales sin retrasos.', day: 60 }
        ]);
      }
      if (day === 75 &&acciones > 0) {
        setNotifications((prev) => [
          ...prev,
          { id: '4', text: '🚀 VALORIZACIÓN: El precio de la acción Ecopetrol cruza un canal de resistencia, acumulando ganancias latentes.', day: 75 }
        ]);
      }

    }, 80);

    return () => clearTimeout(timer);
  }, [simulating, day, cdt, tes, acciones]);

  // Max value of history plot for responsive visual scale
  const maxVal = balanceHistory.length > 0 
    ? Math.max(...balanceHistory.map((b) => b.total)) * 1.02 
    : TOTAL_CAPITAL * 1.1;
  const minVal = balanceHistory.length > 0 
    ? Math.min(...balanceHistory.map((b) => b.total)) * 0.98 
    : TOTAL_CAPITAL * 0.9;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-6"
      >
        <span className="text-xs font-mono px-3 py-1 bg-slate-800 text-slate-400 rounded-full uppercase border border-slate-700/60">
          Escena 4: Tu primera inversión
        </span>
        <h2 className="text-3xl font-extrabold font-display text-white mt-3">
          ¿Cómo distribuirás tus $5.000.000 COP?
        </h2>
        <p className="text-slate-400 mt-1 max-w-2xl mx-auto text-xs">
          Es hora de armar tu primer portafolio y poner el capital virtual en marcha. Conoce los dos grandes mundos de la bolsa: Renta Fija (estabilidad conocida) contra Renta Variable (potencial fluctuante).
        </p>
      </motion.div>

      {/* TOP CONFIG BAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Allocator (8 Columns) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Quick presets */}
          {!simulating && !simResults && (
            <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-xs flex-wrap">
              <span className="font-semibold text-slate-300">Modelos rápidos sugeridos:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleQuickPreset('safe')}
                  className="px-2.5 py-1 text-[11px] font-medium bg-blue-500/10 text-blue-400 rounded border border-blue-500/20 hover:bg-blue-500/20 cursor-pointer"
                >
                  Conservador (Seguro)
                </button>
                <button
                  onClick={() => handleQuickPreset('balanced')}
                  className="px-2.5 py-1 text-[11px] font-medium bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20 hover:bg-emerald-500/20 cursor-pointer"
                >
                  Socio Equilibrado
                </button>
                <button
                  onClick={() => handleQuickPreset('aggressive')}
                  className="px-2.5 py-1 text-[11px] font-medium bg-amber-500/10 text-amber-400 rounded border border-amber-500/20 hover:bg-amber-500/20 cursor-pointer"
                >
                  Agresivo (Acciones)
                </button>
              </div>
            </div>
          )}

          {/* Allocation Cards */}
          <div className="space-y-3">
            
            {/* Asset 1: CDT (Renta Fija) */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 font-bold text-sm shrink-0">
                  CDT
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-xs text-white">Certificado de Depósito (CDT)</h4>
                  <p className="text-[10px] text-slate-400">Renta Fija Tradicional. Tasa pactada: 10% E.A.</p>
                </div>
              </div>

              {/* Incrementor */}
              <div className="flex items-center gap-3">
                <button
                  disabled={cdt === 0 || simulating || simResults !== null}
                  onClick={() => handleAdjust('cdt', 'minus')}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-white disabled:opacity-30 cursor-pointer transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-sm font-bold text-white w-24 text-center">
                  ${cdt.toLocaleString('es-CO')}
                </span>
                <button
                  disabled={remaining < 500000 || simulating || simResults !== null}
                  onClick={() => handleAdjust('cdt', 'plus')}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-white disabled:opacity-30 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Asset 2: TES (Deuda Soberana) */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 font-bold text-sm shrink-0">
                  TES
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-xs text-white">Bonos de Deuda Soberana (TES)</h4>
                  <p className="text-[10px] text-slate-400">Renta Fija de la República de Colombia. Tasa: 11.5% E.A.</p>
                </div>
              </div>

              {/* Incrementor */}
              <div className="flex items-center gap-3">
                <button
                  disabled={tes === 0 || simulating || simResults !== null}
                  onClick={() => handleAdjust('tes', 'minus')}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-white disabled:opacity-30 cursor-pointer transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-sm font-bold text-white w-24 text-center">
                  ${tes.toLocaleString('es-CO')}
                </span>
                <button
                  disabled={remaining < 500000 || simulating || simResults !== null}
                  onClick={() => handleAdjust('tes', 'plus')}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-white disabled:opacity-30 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Asset 3: Acciones (Petróleo) */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 font-bold text-sm shrink-0">
                  BVC
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-xs text-white">Acciones de ECOPETROL S.A.</h4>
                  <p className="text-[10px] text-slate-400">Renta Variable. Fluctuación y dividendos del sector energético.</p>
                </div>
              </div>

              {/* Incrementor */}
              <div className="flex items-center gap-3">
                <button
                  disabled={acciones === 0 || simulating || simResults !== null}
                  onClick={() => handleAdjust('acciones', 'minus')}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-white disabled:opacity-30 cursor-pointer transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-sm font-bold text-white w-24 text-center">
                  ${acciones.toLocaleString('es-CO')}
                </span>
                <button
                  disabled={remaining < 500000 || simulating || simResults !== null}
                  onClick={() => handleAdjust('acciones', 'plus')}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-white disabled:opacity-30 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex gap-2">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-400 leading-normal text-left">
              <strong className="text-slate-200">Riqueza no invertida:</strong> Si dejas dinero disponible en "Efectivo", no devengará ganancias en absoluto. El efectivo estéril no puede resistir la fuerza inflacionaria del mercado. ¡Procura optimizar tu cartera!
            </p>
          </div>

        </div>

        {/* Right Status / Simulation View (5 Columns) */}
        <div className="lg:col-span-12 xl:col-span-5 glass-panel rounded-2xl p-6 flex flex-col justify-between self-stretch">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-slate-400">Distribución Financiera</span>
              <span className="font-mono text-xs font-bold text-emerald-400">TOTAL: 5M COP</span>
            </div>

            {/* Money breakdown bars */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Total Invertido:</span>
                <span className="text-white font-bold">${allocated.toLocaleString('es-CO')} ({((allocated/TOTAL_CAPITAL)*100).toFixed(0)}%)</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full flex overflow-hidden">
                <div style={{ width: `${(cdt/TOTAL_CAPITAL)*100}%` }} className="bg-blue-500 transition-all duration-300" title="CDT" />
                <div style={{ width: `${(tes/TOTAL_CAPITAL)*100}%` }} className="bg-indigo-500 transition-all duration-300" title="TES" />
                <div style={{ width: `${(acciones/TOTAL_CAPITAL)*100}%` }} className="bg-emerald-500 transition-all duration-300" title="ECOPETROL" />
                <div style={{ width: `${(remaining/TOTAL_CAPITAL)*100}%` }} className="bg-slate-800 transition-all duration-300" title="EFECTIVO" />
              </div>

              {/* Tags references with values */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></span>
                  <span>CDT Safe ({((cdt/TOTAL_CAPITAL)*100).toFixed(0)}%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0"></span>
                  <span>Gov TES ({((tes/TOTAL_CAPITAL)*100).toFixed(0)}%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                  <span>Acciones Variable ({((acciones/TOTAL_CAPITAL)*100).toFixed(0)}%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800 shrink-0"></span>
                  <span>Efectivo ({((remaining/TOTAL_CAPITAL)*100).toFixed(0)}%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action trigger area */}
          <div className="pt-6 border-t border-slate-800">
            {!simulating && !simResults && (
              <button
                disabled={allocated === 0}
                onClick={startSimulation}
                className={`w-full py-4 px-6 rounded-xl uppercase font-bold tracking-widest text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  allocated > 0
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed'
                }`}
              >
                <Calendar className="w-4 h-4 text-slate-950 animate-pulse" /> Simular 90 Días de Mercado <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              </button>
            )}

            {/* SIMULATING MODE */}
            {simulating && (
              <div className="space-y-4 text-center">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">Cronograma del Parqué</span>
                  <span className="font-mono text-xs font-bold text-emerald-400">Haciendo holding...</span>
                </div>
                
                {/* Simulated circular progress */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[10px] text-slate-500 font-mono block">DÍA DE NEGOCIACIÓN</span>
                    <span className="text-2xl font-mono font-bold text-white tracking-widest">{day}/90</span>
                  </div>
                  <div className="w-2/3 bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div style={{ width: `${(day/90)*100}%` }} className="h-full bg-emerald-400 transition-all duration-100" />
                  </div>
                </div>

                <div className="min-h-16 flex items-center justify-center">
                  <AnimatePresence mode="popLayout">
                    {notifications.slice(-1).map((notif) => (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-3 bg-slate-900 border border-slate-800 text-[10px] rounded-lg text-emerald-300 font-mono text-left leading-relaxed flex gap-2 w-full"
                      >
                        <Bell className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 animate-bounce" />
                        <span>{notif.text}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* SIMULATION RESULTS VIEW */}
            {simResults && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="p-3 bg-emerald-950/15 border border-emerald-500/25 rounded-xl">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase mb-1">Cierre de Periodo (Día 90)</span>
                  <p className="text-xs text-slate-300">
                    Tu primer contacto con la BVC ha finalizado. Conoce la liquidación electrónica de tu portafolio:
                  </p>
                </div>

                <div className="space-y-2 font-mono text-xs text-left p-3.5 bg-slate-900 rounded-lg border border-slate-800/80">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Rendimiento CDT:</span>
                    <span className="text-blue-400 font-semibold">+${(simResults.cdtFinal - cdt).toLocaleString('es-CO')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Rendimiento TES:</span>
                    <span className="text-indigo-400 font-semibold">+${(simResults.tesFinal - tes).toLocaleString('es-CO')}</span>
                  </div>
                  {acciones > 0 && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Valorización Acciones Acc:</span>
                        <span className={`font-semibold ${simResults.valorizacionGain >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          +${simResults.valorizacionGain.toLocaleString('es-CO')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Dividendos Pagados:</span>
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                          +${simResults.dividendReceived.toLocaleString('es-CO')}
                        </span>
                      </div>
                    </>
                  )}
                  <div className="pt-2 border-t border-slate-800 flex justify-between text-sm">
                    <span className="text-slate-200 font-semibold">Valor Final Portafolio:</span>
                    <span className="text-white font-black">
                      ${(simResults.cdtFinal + simResults.tesFinal + simResults.accFinal + simResults.dividendReceived + remaining).toLocaleString('es-CO')} COP
                    </span>
                  </div>
                </div>

                {/* Explicación de Eventos y Desempeño */}
                <div className="p-3.5 bg-slate-905 bg-slate-900/60 rounded-xl border border-slate-800 text-left space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-emerald-400 block pb-1.5 border-b border-slate-800/80">
                    🔍 Análisis Financiero del Portafolio:
                  </span>
                  
                  <div className="space-y-2 text-[10px] leading-relaxed text-slate-300">
                    {cdt > 0 && (
                      <p>
                        • <strong className="text-blue-400">CDT (+2.46%):</strong> Aportó un retorno seguro de <strong className="text-white">${(simResults.cdtFinal - cdt).toLocaleString('es-CO')} COP</strong>. Al ser un contrato de renta fija convencional, blindó tu capital de la volatilidad y ruidos informativos del exterior.
                      </p>
                    )}
                    {tes > 0 && (
                      <p>
                        • <strong className="text-indigo-400">TES del Estado (+2.83%):</strong> Cumplió con rentar <strong className="text-white">${(simResults.tesFinal - tes).toLocaleString('es-CO')} COP</strong> sin contratiempos, tal como se comunicó de forma oficial al confirmarse el pago puntual de deuda (Día 60).
                      </p>
                    )}
                    {acciones > 0 && (
                      <p>
                        • <strong className="text-emerald-400">Acciones ECOPETROL S.A.:</strong> Experimentaron un destacado avance de valorización real de <strong className="text-emerald-350">+14.5%</strong> impulsadas por el rumor de reservas de gas del Caribe (Día 15), rindiendo además <strong className="text-white">${simResults.dividendReceived.toLocaleString('es-CO')} COP</strong> en dividendos en efectivo (Día 45).
                      </p>
                    )}
                    {remaining > 0 && (
                      <p className="text-amber-400/90 italic">
                        • <strong className="font-semibold text-amber-400">Efectivo Guardado:</strong> Mantuviste de forma inactiva <strong className="text-white">${remaining.toLocaleString('es-CO')} COP</strong>. Este capital estuvo expuesto a pérdida de poder adquisitivo real por no haberse transado en bolsa.
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSimResults(null);
                      setCdt(0);
                      setTes(0);
                      setAcciones(0);
                    }}
                    className="w-1/3 py-2.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Re-intentar
                  </button>
                  <button
                    onClick={() => onNext({ cdt, tes, acciones })}
                    className="w-2/3 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase cursor-pointer flex items-center justify-center gap-1 shadow transition-colors"
                  >
                    Ir al Reto Histórico 2001 <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>
                </div>
              </motion.div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
