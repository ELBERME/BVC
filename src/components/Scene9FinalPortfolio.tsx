/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, CalendarRange, TrendingUp, Sparkles, Plus, Minus, Info, ArrowRight, Bell, RefreshCw } from 'lucide-react';

interface Scene9FinalPortfolioProps {
  onComplete: (stats: {
    finalBalance: number;
    initialBalance: number;
    accionesAllocated: number;
    rentaFijaAllocated: number;
    ficsAllocated: number;
    inflationErosion: number;
    history: number[];
    simulationLogs?: { year: number; balance: number; news: string; performance: string }[];
  }) => void;
  playerName: string;
  onRestart?: () => void;
}

export default function Scene9FinalPortfolio({ onComplete, playerName, onRestart }: Scene9FinalPortfolioProps) {
  const TOTAL_BUDGET = 100000000; // 100M COP
  const CHUNK_SIZE = 10000000;   // 10M COP chunks

  // Chunks allocated (sum must not exceed 10)
  const [accionesChunks, setAccionesChunks] = useState(0);
  const [rentaFijaChunks, setRentaFijaChunks] = useState(0);
  const [ficsChunks, setFicsChunks] = useState(0);

  const [simulating, setSimulating] = useState(false);
  const [simFinished, setSimFinished] = useState(false);
  const [yearNum, setYearNum] = useState(1);
  const [history, setHistory] = useState<number[]>([]);
  const [currentBalance, setCurrentBalance] = useState(TOTAL_BUDGET);
  const [newsFlash, setNewsFlash] = useState<string>('Preparen portafolios para el parqué.');
  const [simulationLogs, setSimulationLogs] = useState<{ year: number; balance: number; news: string; performance: string }[]>([]);

  const totalAllocated = (accionesChunks + rentaFijaChunks + ficsChunks) * CHUNK_SIZE;
  const cashRemaining = TOTAL_BUDGET - totalAllocated;

  const handleAdjust = (type: 'acciones' | 'rentafija' | 'fics', direction: 'plus' | 'minus') => {
    // Unlocked to allow active rebalancing in-game based on annual news events!
    const currentTotalChunks = accionesChunks + rentaFijaChunks + ficsChunks;

    if (direction === 'plus') {
      if (currentTotalChunks < 10) {
        if (type === 'acciones') setAccionesChunks(c => c + 1);
        if (type === 'rentafija') setRentaFijaChunks(c => c + 1);
        if (type === 'fics') setFicsChunks(c => c + 1);
      }
    } else {
      if (type === 'acciones' && accionesChunks > 0) setAccionesChunks(c => c - 1);
      if (type === 'rentafija' && rentaFijaChunks > 0) setRentaFijaChunks(c => c - 1);
      if (type === 'fics' && ficsChunks > 0) setFicsChunks(c => c - 1);
    }
  };

  const handlePresets = (p: 'balanced' | 'safe' | 'growth') => {
    if (p === 'balanced') {
      setAccionesChunks(4);
      setRentaFijaChunks(3);
      setFicsChunks(3);
    } else if (p === 'safe') {
      setAccionesChunks(1);
      setRentaFijaChunks(6);
      setFicsChunks(3);
    } else {
      setAccionesChunks(7);
      setRentaFijaChunks(1);
      setFicsChunks(2);
    }
  };

  const annualEvents = [
    { year: 1, text: '📈 Año 1: Auge minero-energético en Colombia impulsa el COLCAP +18%. Acciones suben con fuerza.', accChg: 0.18, rfChg: 0.09, ficsChg: 0.12 },
    { year: 2, text: '⚙️ Año 2: Estabilidad en mercados locales. El CDT rinde de acuerdo a lo pactado. FICs crecen sostenidos.', accChg: 0.04, rfChg: 0.085, ficsChg: 0.06 },
    { year: 3, text: '🔥 Año 3: Fuerte choque de inflación. El Banco de la República eleva tasas. Acciones sufren presión.', accChg: -0.12, rfChg: 0.11, ficsChg: 0.02 },
    { year: 4, text: '🏦 Año 4: Se normalizan tasas de interés. Bancolombia lidera recuperación del sector bancario.', accChg: 0.14, rfChg: 0.08, ficsChg: 0.10 },
    { year: 5, text: '🍂 Año 5: Incertidumbre pre-electoral frena grandes proyectos de infraestructura. Caída de cementeras.', accChg: -0.07, rfChg: 0.085, ficsChg: 0.04 },
    { year: 6, text: '🚀 Año 6: Alianza comercial energética e inversión extranjera récord. Las acciones colombianas vuelan +22%.', accChg: 0.22, rfChg: 0.08, ficsChg: 0.14 },
    { year: 7, text: '🔔 Año 7: Maduración de dividendos. Ecopetrol y Grupo Aval pagan montos récord a tenientes de acciones.', accChg: 0.15, rfChg: 0.07, ficsChg: 0.09 },
    { year: 8, text: '❄️ Año 8: Enfriamiento comercial global arrastra ligeramente las materias primas a la baja.', accChg: -0.05, rfChg: 0.075, ficsChg: 0.05 },
    { year: 9, text: '🏥 Año 9: Consolidación digital. FinTechs aceleran el consumo; excelente año para portafolios mixtos.', accChg: 0.12, rfChg: 0.08, ficsChg: 0.10 },
    { year: 10, text: '🏆 Año 10: Cierre estelar. Las inversiones han madurado a lo largo de una década con éxito.', accChg: 0.09, rfChg: 0.08, ficsChg: 0.08 }
  ];

  const start10Years = () => {
    if (totalAllocated === 0) return;
    setSimulating(true);
    setSimFinished(false);
    setYearNum(1);
    setHistory([TOTAL_BUDGET]);
    setCurrentBalance(TOTAL_BUDGET);
    setSimulationLogs([]);
    const firstEvent = annualEvents.find(e => e.year === 1);
    if (firstEvent) {
      setNewsFlash(firstEvent.text);
    }
  };

  // Explicit trigger to advance to Scene 10 summary
  const handleProceedToSummary = () => {
    const totalAccValNominal = accionesChunks * CHUNK_SIZE;
    const totalRfValNominal = rentaFijaChunks * CHUNK_SIZE;
    const totalFicsValNominal = ficsChunks * CHUNK_SIZE;

    onComplete({
      finalBalance: currentBalance,
      initialBalance: TOTAL_BUDGET,
      accionesAllocated: totalAccValNominal,
      rentaFijaAllocated: totalRfValNominal,
      ficsAllocated: totalFicsValNominal,
      inflationErosion: Math.round(((10 - (accionesChunks + rentaFijaChunks + ficsChunks)) * CHUNK_SIZE) * 0.45),
      history: history,
      simulationLogs: simulationLogs
    });
  };

  // Automated step-by-step annual compound loop
  useEffect(() => {
    if (!simulating) return;

    const timer = setTimeout(() => {
      const yearEvent = annualEvents.find(e => e.year === yearNum);
      if (!yearEvent) return;

      setCurrentBalance((prevBalance) => {
        const ratioAcc = accionesChunks / 10;
        const ratioRf = rentaFijaChunks / 10;
        const ratioFics = ficsChunks / 10;
        const ratioCash = (10 - (accionesChunks + rentaFijaChunks + ficsChunks)) / 10;

        const currentAccVal = prevBalance * ratioAcc * (1 + yearEvent.accChg);
        const currentRfVal = prevBalance * ratioRf * (1 + yearEvent.rfChg);
        const currentFicsVal = prevBalance * ratioFics * (1 + yearEvent.ficsChg);
        const currentCashVal = prevBalance * ratioCash;

        const nextTotal = Math.round(currentAccVal + currentRfVal + currentFicsVal + currentCashVal);
        const newHistory = [...history, nextTotal];
        setHistory(newHistory);

        // Record compiled log data
        const changePct = (((nextTotal - prevBalance) / prevBalance) * 100).toFixed(1);
        const currentLog = {
          year: yearNum,
          balance: nextTotal,
          news: yearEvent.text,
          performance: `${nextTotal >= prevBalance ? '+' : ''}${changePct}%`
        };
        const updatedLogs = [...simulationLogs, currentLog];
        setSimulationLogs(updatedLogs);

        if (yearNum >= 10) {
          setSimulating(false);
          setSimFinished(true); // Stop auto-forwarding, show beautiful review card!
        } else {
          const nextEvent = annualEvents.find(e => e.year === yearNum + 1);
          if (nextEvent) {
            setNewsFlash(nextEvent.text);
          }
          setYearNum(y => y + 1);
        }

        return nextTotal;
      });
    }, 900);

    return () => clearTimeout(timer);
  }, [simulating, yearNum, history, accionesChunks, rentaFijaChunks, ficsChunks, simulationLogs]);

  const handleResetSimulation = () => {
    setSimFinished(false);
    setSimulating(false);
    setYearNum(1);
    setHistory([TOTAL_BUDGET]);
    setCurrentBalance(TOTAL_BUDGET);
    setSimulationLogs([]);
    setNewsFlash('Preparen portafolios para el parqué.');
  };

  const finalYieldPct = (((currentBalance - TOTAL_BUDGET) / TOTAL_BUDGET) * 100).toFixed(1);

  const getAestheticExplanation = () => {
    const parts = [];
    const accPct = accionesChunks * 10;
    const rfPct = rentaFijaChunks * 10;
    const ficsPct = ficsChunks * 10;
    const cashPct = 100 - accPct - rfPct - ficsPct;

    if (accionesChunks >= 4) {
      parts.push("Tu portafolio tuvo una alta concentración en Renta Variable (Acciones BVC). Esto te permitió capitalizar de forma espectacular los auges bursátiles y de inversión extranjera de los Años 1, 4, 6 y 7, superando con creces la inflación en las etapas expansivas, aunque experimentando caídas tácticas de corto plazo en los años de desaceleración global.");
    } else if (accionesChunks > 0) {
      parts.push("La asignación moderada a Acciones colombianas aportó picos de rentabilidad indispensables en épocas alcistas sin exponer en exceso tu inversión a las correcciones bursátiles.");
    }

    if (rentaFijaChunks >= 4) {
      parts.push("La sólida porción destinada a Renta Fija Estatal (CDT & TES) actuó como un escudo contra la volatilidad. Te beneficiaste directamente del incremento de tasas en el Año 3 por la inflación (pactando retornos fijos de hasta el 11%), lo cual protegió de forma sumamente predecible tus ahorros.");
    } else if (rentaFijaChunks > 0) {
      parts.push("Tu porción regulada en CDT y TES aportó un flujo de caja predecible y estabilidad constante de bajo riesgo.");
    }

    if (ficsChunks >= 4) {
      parts.push("La asignación protagónica en Fondos de Inversión Colectiva (FICs) diversificados facilitó un crecimiento balanceado y constante con protección profesional multiactivo a lo largo de la década.");
    } else if (ficsChunks > 0) {
      parts.push("La inclusión de FICs (Carteras de inversión colectiva) ayudó a suavizar las curvas de riesgo agregando balance profesional.");
    }

    if (cashPct >= 30) {
      parts.push("Sin embargo, mantener una parte sustancial de tu capital detenido en Efectivo Líquido causó un desgaste acumulativo del 45% del poder de compra real debido al constante efecto erosivo de la inflación colombiana.");
    } else if (cashPct > 0) {
      parts.push("La pequeña porción de caja retenida te dio liquidez inmediata a costa de una leve pérdida por inflación.");
    }

    if (parts.length === 0) {
      return "Tu distribución de capital determinó de manera equilibrada tu rentabilidad decenal.";
    }
    return parts.join(" ");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-6"
      >
        <span className="text-xs font-mono px-3 py-1 bg-slate-800 text-slate-400 rounded-full uppercase border border-slate-700/60 font-medium">
          Escena 9: Tu Portafolio Definitivo
        </span>
        <h2 className="text-3xl font-extrabold font-display text-white mt-3">
          El Desafío Decenal de los $100 Millones
        </h2>
        {!simFinished ? (
          <p className="text-slate-400 mt-2 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed">
            Felicidades, {playerName}. Ya has adquirido todo el conocimiento bursátil básico. Te confiaremos un saldo virtual institucional de <strong>$100.000.000 COP</strong>. Configura tu portafolio ideal y enfréntate a una década entera de mercados dinámicos.
          </p>
        ) : (
          <p className="text-emerald-400 mt-2 max-w-2xl mx-auto text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 leading-relaxed">
            ✨ ¡Felicidades, {playerName}! Has completado de manera íntegra el ciclo de inversión automática a 10 años.
          </p>
        )}
      </motion.div>

      {/* RENDER FINISHED RESULTS BOARD */}
      {simFinished ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          {/* Main Success Dialog */}
          <div className="bg-slate-900 border-2 border-emerald-500/45 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-emerald-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 select-none pointer-events-none">
              <span className="text-9xl">🎓</span>
            </div>

            {/* Commemorative Header Banner */}
            <div className="text-center pb-6 border-b border-slate-800 space-y-3 mb-6">
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/40 px-3.5 py-1 rounded-full border border-emerald-500/35">
                La Experiencia Ha Finalizado por Completo 🏁
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-2">
                🏆 ¡Felicitaciones, {playerName}!
              </h3>
              <p className="text-xs text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
                Has culminado con éxito todas las etapas educativas y dinámicas del simulador financiero de la Bolsa de Valores de Colombia (BVC). Has madurado tu capital de trabajo de manera profesional durante un ciclo macroeconómico decenal completo de 10 años.
              </p>

              {/* STABLE GLOWING SCROLL ADVICE GUIDE */}
              <div className="mt-4 bg-emerald-950/40 border-2 border-emerald-400/50 px-4 py-2.5 rounded-xl max-w-lg mx-auto flex items-center justify-center gap-2.5 shadow-[0_0_15px_rgba(16,185,129,0.2)] animate-pulse-slow">
                <span className="text-xs">⬇️</span>
                <p className="text-[11.5px] text-emerald-300 font-bold font-mono tracking-wider uppercase">
                  Hay más información y análisis detallado abajo - ¡Por favor desliza!
                </p>
                <span className="text-xs">⬇️</span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-stretch">
              
              {/* Left Column: Yield & Performance Analysis */}
              <div className="lg:w-1/2 flex flex-col justify-between space-y-4">
                <div className="space-y-3 text-left">
                  <h4 className="text-[11px] uppercase font-mono tracking-widest text-slate-450 text-slate-300 font-bold border-b border-slate-850 pb-2">
                    📊 Resultados del Portafolio Decenal
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Este es el resultado numérico consolidado de tus decisiones tácticas frente al parqué durante la década:
                  </p>
                </div>

                {/* Score panel */}
                <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 space-y-3 font-mono">
                  <div className="flex justify-between items-center text-xs pb-1 border-b border-slate-900">
                    <span className="text-slate-400">Capital Inicial:</span>
                    <span className="text-slate-300 font-bold">$100.000.000 COP</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pb-1 border-b border-slate-900">
                    <span className="text-slate-400">Capital de Cierre (Año 10):</span>
                    <span className="text-white font-extrabold">${currentBalance.toLocaleString('es-CO')} COP</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">Rendimiento Histórico:</span>
                    <span className={`text-base font-black ${currentBalance >= TOTAL_BUDGET ? 'text-emerald-400' : 'text-red-400'}`}>
                      {currentBalance >= TOTAL_BUDGET ? '▲ +' : '▼ '}{finalYieldPct}%
                    </span>
                  </div>
                </div>

                {/* VISUAL BREAKDOWN BLOCK: POSITIVES (GREEN) & NEGATIVES (RED) */}
                <div className="space-y-3.5 text-left">
                  
                  {/* Positive Performance Factors List */}
                  <div className="p-4 bg-emerald-950/20 border border-emerald-500/25 rounded-2xl space-y-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-emerald-400 flex items-center gap-1.5">
                      🟢 Factores que hicieron SUBIR tu rendimiento (ALZA)
                    </span>
                    <ul className="space-y-1.5 text-[11px] text-emerald-300/90 font-sans list-disc pl-4 leading-relaxed">
                      {accionesChunks > 0 && (
                        <li>
                          <strong>Asignación a Acciones (BVC)</strong>: Tu distribución del {accionesChunks * 10}% capitalizó los auges y valorizaciones en los Años 1 (+18%), 4 (+14%) y 6 (+22%), capturando picos excelentes de rendimiento con dividendos de Ecopetrol y Grupo Aval.
                        </li>
                      )}
                      {rentaFijaChunks > 0 && (
                        <li>
                          <strong>Renta Fija Estatal (CDT & TES)</strong>: Tu {(rentaFijaChunks * 10)}% en tasas predecibles actuó como escudo contra choques locales de inflación y entregó retornos de hasta el 11% en el Año 3.
                        </li>
                      )}
                      {ficsChunks > 0 && (
                        <li>
                          <strong>Cartera Colectiva FICs</strong>: La gestión multiactivo diversificada te blindó ante oscilaciones imprevistas del parqué aportando estabilidad decenal.
                        </li>
                      )}
                      {100 - (accionesChunks * 10) - (rentaFijaChunks * 10) - (ficsChunks * 10) === 0 && (
                        <li>
                          <strong>Eficiencia Absoluta de Caja</strong>: Invertiste el 100% de tus recursos evitando que la inflación devorara tu dinero de manera ociosa.
                        </li>
                      )}
                      {100 - (accionesChunks * 10) - (rentaFijaChunks * 10) - (ficsChunks * 10) > 0 && (
                        <li>
                          <strong>Liquidez de Resguardo</strong>: El efectivo restante te dio margen de maniobra de dinero inmediato listo para retiros.
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Negative Performance Factors List */}
                  <div className="p-4 bg-red-950/20 border border-red-500/25 rounded-2xl space-y-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-red-400 flex items-center gap-1.5">
                      🔴 Factores de PRESIÓN que bajaron tu rendimiento (RIESGO)
                    </span>
                    <ul className="space-y-1.5 text-[11px] text-red-300/90 font-sans list-disc pl-4 leading-relaxed">
                      {accionesChunks >= 4 && (
                        <li>
                          <strong>Volatilidad Aguda de Volúmenes</strong>: La alta concentración bursátil te expuso directamente a las devaluaciones puntuales de los Años 3 (-12%), 5 (-7%) por incertidumbre y 8 (-5%) por materias primas globales.
                        </li>
                      )}
                      {accionesChunks === 0 && (
                        <li>
                          <strong>Costo de Oportunidad de Acciones</strong>: Con 0% en renta variable, dejaste ir espectaculares rallies nacionales (como el repunte del +22% del Año 6). Tu dinero no tuvo opción de valorización activa en dividendos.
                        </li>
                      )}
                      {rentaFijaChunks === 0 && (
                        <li>
                          <strong>Ausencia de Amortiguador</strong>: Al carecer de CDT o TES, tu portafolio no pactó retornos asegurados durante periodos de contracción económica, asumiendo riesgos directos sin salvaguardas.
                        </li>
                      )}
                      {(100 - (accionesChunks * 10) - (rentaFijaChunks * 10) - (ficsChunks * 10)) >= 30 && (
                        <li>
                          <strong>Fuerte desgaste inflacionario</strong>: Dejaste una porción alta en Efectivo Líquido, lo que provocó una erosión acumulada de casi el 45% del poder real de compra por indexación de precios.
                        </li>
                      )}
                      {ficsChunks > 0 && (
                        <li>
                          <strong>Costos de Administración Colectiva</strong>: Las comisiones de intermediación y corretaje de los FICs diluyeron una pequeña fracción de la renta directa nominal máxima.
                        </li>
                      )}
                    </ul>
                  </div>

                </div>
              </div>

              {/* Right Column: Scrollable interactive Events Retro list (Color Coded Green and Red) */}
              <div className="lg:w-1/2 bg-slate-950/70 p-5 rounded-2xl border border-slate-850 flex flex-col justify-between min-h-[400px]">
                <div>
                  <h4 className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold mb-3 flex items-center gap-1.5 border-b border-slate-900 pb-2">
                    ⏳ Resumen Histórico Año por Año (Años 1 al 10)
                  </h4>
                  
                  {/* Years logs timeline */}
                  <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1 select-none">
                    {simulationLogs.map((log) => {
                      const isPositive = !log.performance.startsWith('-');
                      return (
                        <div 
                          key={log.year} 
                          className={`p-3 rounded-xl border transition-colors flex items-start gap-2.5 ${
                            isPositive 
                              ? 'bg-emerald-950/20 border-emerald-500/25 shadow-[inset_0_1px_2px_rgba(16,185,129,0.02)]' 
                              : 'bg-red-950/20 border-red-500/25 shadow-[inset_0_1px_2px_rgba(239,68,68,0.02)]'
                          }`}
                        >
                          {/* Indicator pill */}
                          <div className="mt-1 shrink-0">
                            <span className={`w-2.5 h-2.5 rounded-full block ${isPositive ? 'bg-emerald-400 shadow-sm shadow-emerald-400' : 'bg-red-400 shadow-sm shadow-red-450'}`} />
                          </div>

                          <div className="space-y-1 text-left flex-1 bg-transparent">
                            <div className="flex items-center gap-2">
                              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                                isPositive 
                                  ? 'bg-emerald-500/10 text-emerald-400' 
                                  : 'bg-red-500/10 text-red-400'
                              }`}>
                                Año {log.year}
                              </span>
                              <span className={`text-[8px] font-mono font-bold uppercase tracking-wider ${
                                isPositive ? 'text-emerald-400' : 'text-red-400'
                              }`}>
                                {isPositive ? '✓ Alza / Positivo' : '✗ Desaceleración'}
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-305 text-slate-300 leading-relaxed font-sans font-medium">
                              {log.news}
                            </p>
                          </div>
                          
                          <div className="text-right shrink-0 font-mono">
                            <span className={`text-[11px] font-black block ${
                              isPositive ? 'text-emerald-400' : 'text-red-400'
                            }`}>
                              {log.performance}
                            </span>
                            <span className="text-[9px] text-slate-500">
                              ${log.balance.toLocaleString('es-CO')}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* VISUAL DEFINITIVE NOTICE: END OF THE EXPERIENCE */}
                <div className="mt-4 p-5 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-teal-950/20 to-slate-900 border-2 border-emerald-550/40 border-emerald-500/55 shadow-lg shadow-emerald-500/5 text-left space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🎓🏁</span>
                    <span className="text-xs font-mono font-black uppercase text-emerald-400 tracking-wider">
                      ¡Fin de la Experiencia Interactiva!
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-200 leading-relaxed font-sans">
                    Has completado con éxito la totalidad del simulador educativo de la BVC. Has aprendido las diferencias críticas de riesgo y retorno que dictan el éxito financiero en la vida real.
                  </p>
                  <p className="text-xs font-bold font-mono text-emerald-400 flex items-center gap-1">
                    🟢 ¡Chao contigo, nos vemos en la próxima! 👋✨
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Actions of Conmemorative Display */}
            <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row gap-3 mt-6">
              
              {/* Full Game Reset */}
              {onRestart && (
                <button
                  onClick={onRestart}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl border border-rose-500/30 hover:border-rose-500/50 hover:bg-rose-950/10 text-rose-300 text-xs font-semibold uppercase tracking-wider font-mono cursor-pointer flex items-center justify-center gap-1.5 transition-all"
                >
                  👋 Volver a empezar (Reiniciar)
                </button>
              )}

              {/* Just reset portfolio simulation */}
              <button
                onClick={handleResetSimulation}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl border border-slate-700 hover:bg-slate-800/80 text-xs font-semibold text-slate-200 transition-colors uppercase tracking-wider font-mono cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" /> Probar portafolio diferente
              </button>

              {/* Proceed to profile summary details if they wish */}
              <button
                onClick={handleProceedToSummary}
                className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-350 text-slate-950 font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-md shadow-emerald-500/10 flex items-center justify-center gap-1.5"
              >
                Ver Mi Perfil Financiero Final <ArrowRight className="w-4 h-4 text-slate-955 text-slate-950" />
              </button>
              
            </div>
          </div>
        </motion.div>
      ) : (
        /* NORMAL ALLOCATION GRID (BEFORE SIMULATION FINISHES) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Allocator (7 columns) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Quick presets */}
            {!simulating && (
              <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-xs flex-wrap">
                <span className="font-semibold text-slate-300">Modelos rápidos sugeridos:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePresets('safe')}
                    className="px-2.5 py-1 text-[11px] font-medium bg-blue-500/10 text-blue-400 rounded border border-blue-500/20 hover:bg-blue-500/20 cursor-pointer"
                  >
                    Conservador
                  </button>
                  <button
                    onClick={() => handlePresets('balanced')}
                    className="px-2.5 py-1 text-[11px] font-medium bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20 hover:bg-emerald-500/20 cursor-pointer"
                  >
                    Equilibrado FICs
                  </button>
                  <button
                    onClick={() => handlePresets('growth')}
                    className="px-2.5 py-1 text-[11px] font-medium bg-amber-500/10 text-amber-400 rounded border border-amber-500/20 hover:bg-amber-500/20 cursor-pointer"
                  >
                    Crecimiento Accivo
                  </button>
                </div>
              </div>
            )}

            {/* Allocation panels */}
            <div className="space-y-3">
              
              {/* Asset 1: Acciones */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl shrink-0">📈</span>
                  <div className="text-left">
                    <h4 className="font-medium text-xs text-white">Renta Variable (Acciones BVC)</h4>
                    <p className="text-[10px] text-slate-400">Ecopetrol, Bancolombia, ISA o Nutresa.</p>
                  </div>
                </div>

                {/* Incrementor */}
                <div className="flex items-center gap-3">
                  <button
                    disabled={accionesChunks === 0}
                    onClick={() => handleAdjust('acciones', 'minus')}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-white disabled:opacity-30 cursor-pointer transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-xs font-bold text-white w-20 text-center">
                    {(accionesChunks * 10).toFixed(0)}%
                  </span>
                  <button
                    disabled={(accionesChunks + rentaFijaChunks + ficsChunks) >= 10}
                    onClick={() => handleAdjust('acciones', 'plus')}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-white disabled:opacity-30 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Asset 2: Renta Fija */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl shrink-0">🏛️</span>
                  <div className="text-left">
                    <h4 className="font-medium text-xs text-white">Renta Fija Estatal (CDT & TES)</h4>
                    <p className="text-[10px] text-slate-400">Títulos de tesorería y certificados estables.</p>
                  </div>
                </div>

                {/* Incrementor */}
                <div className="flex items-center gap-3">
                  <button
                    disabled={rentaFijaChunks === 0}
                    onClick={() => handleAdjust('rentafija', 'minus')}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-white disabled:opacity-30 cursor-pointer transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-xs font-bold text-white w-20 text-center">
                    {(rentaFijaChunks * 10).toFixed(0)}%
                  </span>
                  <button
                    disabled={(accionesChunks + rentaFijaChunks + ficsChunks) >= 10}
                    onClick={() => handleAdjust('rentafija', 'plus')}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-white disabled:opacity-30 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Asset 3: FICs */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl shrink-0">🏺</span>
                  <div className="text-left">
                    <h4 className="font-medium text-xs text-white">Fondos de Inversión (FICs)</h4>
                    <p className="text-[10px] text-slate-400">Carteras colectivas y gestión diversificada.</p>
                  </div>
                </div>

                {/* Incrementor */}
                <div className="flex items-center gap-3">
                  <button
                    disabled={ficsChunks === 0}
                    onClick={() => handleAdjust('fics', 'minus')}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-white disabled:opacity-30 cursor-pointer transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-xs font-bold text-white w-20 text-center">
                    {(ficsChunks * 10).toFixed(0)}%
                  </span>
                  <button
                    disabled={(accionesChunks + rentaFijaChunks + ficsChunks) >= 10}
                    onClick={() => handleAdjust('fics', 'plus')}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-white disabled:opacity-30 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Warning for unallocated cash */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex gap-2">
              <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-left">
                <span className="font-bold text-[10px] text-slate-200 block">Atención con el Efectivo Líquido:</span>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans mt-0.5">
                  Cualquier porción de capital que no distribuyas se quedará estancada en tu saldo de caja. Recuerda que la inflación colombiana promedio durante 10 años acumulará un fuerte desgaste de casi un <strong className="text-red-400">45% de su valor adquisitivo</strong>.
                </p>
              </div>
            </div>

          </div>

          {/* Right Status / Live simulating panel (5 columns) */}
          <div className="lg:col-span-5 p-6 rounded-2xl glass-panel flex flex-col justify-between self-stretch">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-slate-400">Distribución de Activos</span>
                <span className="font-mono text-xs font-bold text-emerald-400">100M COP Cap.</span>
              </div>

              {/* Money breakdown bars */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Monto Invertido:</span>
                  <span className="text-white font-bold">${totalAllocated.toLocaleString('es-CO')} (${((totalAllocated/TOTAL_BUDGET)*100).toFixed(0)}%)</span>
                </div>
                <div className="w-full h-3.5 bg-slate-900 rounded-full flex overflow-hidden border border-slate-800">
                  <div style={{ width: `${(accionesChunks*10)}%` }} className="bg-emerald-500 transition-all duration-300 pointer-events-none" />
                  <div style={{ width: `${(rentaFijaChunks*10)}%` }} className="bg-blue-500 transition-all duration-300 pointer-events-none" />
                  <div style={{ width: `${(ficsChunks*10)}%` }} className="bg-indigo-500 transition-all duration-300 pointer-events-none" />
                  <div style={{ width: `${(cashRemaining/TOTAL_BUDGET)*100}%` }} className="bg-slate-800 transition-all duration-300 pointer-events-none" />
                </div>

                {/* Tag representations inside grids */}
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                    <span>Acciones ({(accionesChunks * 10).toFixed(0)}%)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></span>
                    <span>Renta Fija ({(rentaFijaChunks * 10).toFixed(0)}%)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0"></span>
                    <span>Carteras FICs ({(ficsChunks * 10).toFixed(0)}%)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-800 shrink-0"></span>
                    <span>Efectivo ({((cashRemaining/TOTAL_BUDGET)*100).toFixed(0)}%)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800">
              {/* INACTIVE TRIGGERS */}
              {!simulating && (
                <button
                  disabled={totalAllocated === 0}
                  onClick={start10Years}
                  className={`w-full py-4 px-6 rounded-xl uppercase font-bold tracking-widest text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    totalAllocated > 0
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed'
                  }`}
                >
                  <CalendarRange className="w-4 h-4 text-slate-950 animate-pulse" /> Iniciar Carrera de 10 Años <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                </button>
              )}

              {/* SIMULATING MODE TICKER DISPLAY */}
              {simulating && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-405 font-mono font-bold text-slate-400">CRONOGRAMA DECENAL</span>
                    <span className="font-mono text-xs font-bold text-emerald-400">Año Activo: {yearNum}/10</span>
                  </div>

                  {/* Simulated Ticker board card */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 text-center space-y-3">
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">Saldo de Portafolio Acumulado</span>
                    <p className="text-2xl sm:text-3xl font-mono font-black text-white">
                      ${currentBalance.toLocaleString('es-CO')} <span className="text-xs text-slate-500">COP</span>
                    </p>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                      <div style={{ width: `${((yearNum - 1) / 10) * 100}%` }} className="h-full bg-emerald-400 transition-all duration-300" />
                    </div>
                  </div>

                  {/* News ticker box */}
                  <div className="min-h-16 flex items-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={newsFlash}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="p-3.5 bg-slate-900 border border-slate-800 text-[10px] rounded-lg text-emerald-300 font-mono text-left leading-relaxed flex gap-2 w-full"
                      >
                        <Bell className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 animate-bounce" />
                        <span>{newsFlash}</span>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Active automated progress state */}
                  <div className="pt-2 space-y-2">
                    <div className="w-full py-4 px-6 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs flex items-center justify-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="font-mono font-bold tracking-wider uppercase text-emerald-400">Simulando Año {yearNum} automáticamente</span>
                    </div>
                    <p className="text-[10px] text-slate-500 text-center leading-relaxed">
                      ⏳ <strong className="text-slate-400">Progreso sin clics:</strong> La simulación avanza sola. Analiza cómo fluctúa tu saldo ante cada evento nacional en la parte superior. Puedes actualizar la distribución a la izquierda en tiempo real antes de que finalice el año.
                    </p>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      )}
    </div>
  );
}
