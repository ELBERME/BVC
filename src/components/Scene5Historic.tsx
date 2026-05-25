/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, ArrowRight, ShieldCheck, History, Landmark, Flame, TrendingUp, Sparkles, RefreshCw, CalendarRange } from 'lucide-react';
import { HISTORICAL_ASSETS } from '../data';
import { HistoricalAsset } from '../types';

interface Scene5HistoricProps {
  onNext: () => void;
}

export default function Scene5Historic({ onNext }: Scene5HistoricProps) {
  const INITIAL = 1000000;
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [year, setYear] = useState(2001);
  const [showChart, setShowChart] = useState(false);
  const travelButtonRef = React.useRef<HTMLButtonElement>(null);

  // Auto scroll to time-travel trigger button when an asset is chosen
  useEffect(() => {
    if (selectedAssetId && !running && !showChart) {
      setTimeout(() => {
        travelButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    }
  }, [selectedAssetId, running, showChart]);

  const selectedAsset = HISTORICAL_ASSETS.find((a) => a.id === selectedAssetId);

  const startTimeTravel = () => {
    if (!selectedAssetId) return;
    setRunning(true);
    setYear(2001);
    setShowChart(false);
  };

  // Animate year ticker
  useEffect(() => {
    if (!running) return;

    if (year >= 2026) {
      setRunning(false);
      setShowChart(true);
      return;
    }

    const timer = setTimeout(() => {
      setYear((y) => Math.min(2026, y + 1.25));
    }, 90);

    return () => clearTimeout(timer);
  }, [running, year]);

  // Year integer for printing
  const printYear = Math.floor(year);

  // Return comments
  const getSmartComment = (id: string) => {
    if (id === 'bogota') {
      return 'Mientras otros aprendían a caminar, esta inversión crecía más de 20 veces su valor. ¡Esa es la asombrosa magia de la valorización financiera!';
    }
    if (id === 'ecopetrol') {
      return 'La "Iguana" estatal de energía pagó dividendos legendarios periódicamente. El holding de largo plazo venció todos los pronósticos políticos.';
    }
    if (id === 'tes') {
      return 'Seguridad a prueba de todo. Preservaste tu capital inicial con creces y venciste la inflación sin un solo sobresalto de mercado.';
    }
    return '¡Ay caramba! El efectivo estático es devorado sin piedad por la inflación silenciosa. Guardar pesos billete bajo el colchón equivale a desangrar tu poder adquisitivo.';
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-8"
      >
        <span className="text-xs font-mono px-3 py-1 bg-slate-800 text-slate-400 rounded-full uppercase border border-slate-700/60">
          Escena 5: Máquina del Tiempo de la BVC
        </span>
        <h2 className="text-3xl font-extrabold font-display text-white mt-3">
          El Reto Histórico del Millón de Pesos
        </h2>
        <p className="text-slate-400 mt-2 max-w-2xl mx-auto text-xs sm:text-sm">
          Imagina que es el año 2001, justo cuando nació la bolsa integrada de Colombia. Tienes exactamente $1.000.000 COP libres. ¿Dónde pondrás este capital para preservarlo por el próximo cuarto de siglo?
        </p>
      </motion.div>

      {/* STAGE 1: ASSET SELECTION */}
      {!running && !showChart && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HISTORICAL_ASSETS.map((asset) => {
              const active = selectedAssetId === asset.id;

              return (
                <motion.div
                  key={asset.id}
                  onClick={() => setSelectedAssetId(asset.id)}
                  whileHover={{ y: -3 }}
                  className={`cursor-pointer rounded-2xl p-5 border flex flex-col justify-between h-56 transition-all ${
                    active
                      ? 'bg-slate-900 border-emerald-400 shadow-lg shadow-emerald-500/5'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">
                        {asset.id === 'bogota' && '🏢'}
                        {asset.id === 'ecopetrol' && '🦎'}
                        {asset.id === 'tes' && '🇨🇴'}
                        {asset.id === 'efectivo' && '🛌'}
                      </span>
                      <span className="font-mono text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-bold">
                        {asset.symbol}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-xs text-white pt-2">{asset.name}</h4>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-sans mt-1 line-clamp-3">
                      {asset.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/85">
                    <span className="text-[9px] text-slate-500 font-mono uppercase block">Costo 2001</span>
                    <span className="font-mono text-xs font-bold text-white">
                      {asset.id === 'tes' || asset.id === 'efectivo' 
                        ? '$1M COP completo' 
                        : `$${asset.price2001.toLocaleString('es-CO')} c/u`}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center pt-4">
            <button
              ref={travelButtonRef}
              disabled={!selectedAssetId}
              onClick={startTimeTravel}
              className={`py-4 px-8 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedAssetId
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed'
              }`}
            >
              <History className="w-4 h-4 text-slate-950 animate-spin" /> Viajar del 2001 al Presente <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 2: RUNNING TIME MACHINE TICKER */}
      {running && (
        <motion.div
          key="time-machine"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-12 rounded-2xl bg-slate-950 border border-emerald-500/20 text-center relative overflow-hidden"
        >
          {/* Cosmic temporal glowing fields */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
          
          <div className="relative space-y-6">
            <CalendarRange className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
            
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-slate-500">PRODUCIENDO INTERÉS COMPUESTO</span>
              <h3 className="text-6xl sm:text-7xl font-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 mt-2 font-mono">
                {printYear}
              </h3>
            </div>

            <p className="text-xs text-slate-400 animate-pulse">
              Simulando 25 años de fluctuaciones de la Bolsa de Valores de Colombia (BVC)...
            </p>
          </div>
        </motion.div>
      )}

      {/* STAGE 3: RESULT DASHBOARD & SVG CHART PLOT */}
      {showChart && selectedAsset && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
        >
          {/* Chart Display (7 columns) */}
          <div className="lg:col-span-7 p-5 rounded-2xl glass-panel flex flex-col justify-between">
            <div>
              <h3 className="font-display font-semibold text-xs text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Curvas de Rendimiento Acumulado (2001 - 2026)
              </h3>

              {/* Responsive SVG Chart */}
              <div className="w-full h-64 bg-slate-950/80 rounded-xl border border-slate-800 p-4 relative overflow-visible flex flex-col justify-between">
                
                {/* Horizontal guide grids */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-10">
                  <div className="w-full border-t border-slate-500" />
                  <div className="w-full border-t border-slate-500" />
                  <div className="w-full border-t border-slate-500" />
                  <div className="w-full border-t border-slate-500" />
                </div>

                {/* Drawn Tracks */}
                <div className="flex-1 w-[82%] h-full relative mt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Track 1: Banco de Bogotá (Shares shoot up high!) */}
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                      d="M 2,90 L 20,85 L 40,70 L 60,50 L 80,30 L 98,10"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth={selectedAssetId === 'bogota' ? '5.5' : '2.5'}
                      strokeLinecap="round"
                      className="cursor-pointer transition-all hover:stroke-[7px]"
                      onClick={() => setSelectedAssetId('bogota')}
                      style={{ opacity: selectedAssetId === 'bogota' ? 1 : 0.25 }}
                    />
                    <path
                      d="M 2,90 L 20,85 L 40,70 L 60,50 L 80,30 L 98,10"
                      fill="none"
                      stroke="transparent"
                      strokeWidth="16"
                      className="cursor-pointer"
                      onClick={() => setSelectedAssetId('bogota')}
                    />
                    
                    {/* Track 2: Ecopetrol (Corrected to realistic 1.65x return trajectory) */}
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: 'easeOut', delay: 0.1 }}
                      d="M 2,90 L 20,88 L 40,83 L 60,86 L 80,80 L 98,75"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth={selectedAssetId === 'ecopetrol' ? '5.5' : '2.5'}
                      strokeLinecap="round"
                      className="cursor-pointer transition-all hover:stroke-[7px]"
                      onClick={() => setSelectedAssetId('ecopetrol')}
                      style={{ opacity: selectedAssetId === 'ecopetrol' ? 1 : 0.25 }}
                    />
                    <path
                      d="M 2,90 L 20,88 L 40,83 L 60,86 L 80,80 L 98,75"
                      fill="none"
                      stroke="transparent"
                      strokeWidth="16"
                      className="cursor-pointer"
                      onClick={() => setSelectedAssetId('ecopetrol')}
                    />

                    {/* Track 3: TES (Steady upward angle) */}
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                      d="M 2,90 L 20,82 L 40,74 L 60,66 L 80,58 L 98,50"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth={selectedAssetId === 'tes' ? '5.5' : '2.5'}
                      strokeDasharray={selectedAssetId === 'tes' ? '' : '3 1.5'}
                      strokeLinecap="round"
                      className="cursor-pointer transition-all hover:stroke-[7px]"
                      onClick={() => setSelectedAssetId('tes')}
                      style={{ opacity: selectedAssetId === 'tes' ? 1 : 0.25 }}
                    />
                    <path
                      d="M 2,90 L 20,82 L 40,74 L 60,66 L 80,58 L 98,50"
                      fill="none"
                      stroke="transparent"
                      strokeWidth="16"
                      className="cursor-pointer"
                      onClick={() => setSelectedAssetId('tes')}
                    />

                    {/* Track 4: Cash Under mattress (Collapses down) */}
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
                      d="M 2,90 L 20,91 L 40,93 L 60,95 L 80,97 L 98,98"
                      fill="none"
                      stroke="#f87171"
                      strokeWidth={selectedAssetId === 'efectivo' ? '5.5' : '2.5'}
                      strokeLinecap="round"
                      className="cursor-pointer transition-all hover:stroke-[7px]"
                      onClick={() => setSelectedAssetId('efectivo')}
                      style={{ opacity: selectedAssetId === 'efectivo' ? 1 : 0.25 }}
                    />
                    <path
                      d="M 2,90 L 20,91 L 40,93 L 60,95 L 80,97 L 98,98"
                      fill="none"
                      stroke="transparent"
                      strokeWidth="16"
                      className="cursor-pointer"
                     onClick={() => setSelectedAssetId('efectivo')}
                    />
                  </svg>
                </div>

                {/* Clickable Line labels on the far right end of the SVG track lines (aligned to coordinates relative to chart) */}
                <div className="absolute right-1 sm:right-3 top-0 bottom-12 w-[20%] flex flex-col justify-between py-6 pointer-events-auto select-none">
                  {/* Bogotá label at ~10% SVG Y height */}
                  <div style={{ top: '8%' }} className="absolute right-0">
                    <button
                      onClick={() => setSelectedAssetId('bogota')}
                      className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-black border transition-all cursor-pointer block text-right whitespace-nowrap ${
                        selectedAssetId === 'bogota'
                          ? 'bg-[#10b981] border-[#10b981] text-slate-950 shadow shadow-emerald-500/20 scale-105'
                          : 'bg-slate-900/90 border-slate-800 text-[#10b981] hover:border-emerald-500/50 hover:bg-slate-800'
                      }`}
                    >
                      🏢 BOGOTÁ (+1.970%)
                    </button>
                  </div>

                  {/* TES label at ~50% SVG Y height */}
                  <div style={{ top: '48%' }} className="absolute right-0">
                    <button
                      onClick={() => setSelectedAssetId('tes')}
                      className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-black border transition-all cursor-pointer block text-right whitespace-nowrap ${
                        selectedAssetId === 'tes'
                          ? 'bg-[#3b82f6] border-[#3b82f6] text-white shadow shadow-blue-500/20 scale-105'
                          : 'bg-slate-900/90 border-slate-800 text-[#3b82f6] hover:border-blue-500/50 hover:bg-slate-800'
                      }`}
                    >
                      🇨🇴 TES (+392%)
                    </button>
                  </div>

                  {/* Ecopetrol label at ~75% SVG Y height */}
                  <div style={{ top: '72%' }} className="absolute right-0 font-bold">
                    <button
                      onClick={() => setSelectedAssetId('ecopetrol')}
                      className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-black border transition-all cursor-pointer block text-right whitespace-nowrap ${
                        selectedAssetId === 'ecopetrol'
                          ? 'bg-[#a855f7] border-[#a855f7] text-white shadow shadow-purple-500/20 scale-105'
                          : 'bg-slate-900/90 border-slate-800 text-[#a855f7] hover:border-purple-500/50 hover:bg-slate-800'
                      }`}
                    >
                      🦎 ECOPETROL (+65%)
                    </button>
                  </div>

                  {/* Cash/Colchon label at ~98% SVG Y height */}
                  <div style={{ top: '92%' }} className="absolute right-0">
                    <button
                      onClick={() => setSelectedAssetId('efectivo')}
                      className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-black border transition-all cursor-pointer block text-right whitespace-nowrap ${
                        selectedAssetId === 'efectivo'
                          ? 'bg-[#f87171] border-[#f87171] text-white shadow shadow-red-500/20 scale-105'
                          : 'bg-slate-900/90 border-slate-800 text-[#f87171] hover:border-red-500/50 hover:bg-slate-800'
                      }`}
                    >
                      🛌 COLCHÓN (-72%)
                    </button>
                  </div>
                </div>
              </div>

              {/* Interactive Legend & Selection Toggles - Extracted outside of chart box to prevent text overlap */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 z-10">
                {HISTORICAL_ASSETS.map((asset) => {
                  const isSelected = selectedAssetId === asset.id;
                  
                  const dotColor =
                    asset.id === 'bogota' ? 'bg-[#10b981]' :
                    asset.id === 'ecopetrol' ? 'bg-[#a855f7]' :
                    asset.id === 'tes' ? 'bg-[#3b82f6]' :
                    'bg-[#f87171]';

                  const pctText =
                    asset.id === 'bogota' ? '+1.970%' :
                    asset.id === 'ecopetrol' ? '+65%' :
                    asset.id === 'tes' ? '+392%' :
                    '-72%';

                  return (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() => setSelectedAssetId(asset.id)}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[10px] font-mono cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-emerald-500 bg-emerald-950/20 text-white font-extrabold shadow shadow-emerald-500/10 scale-102 ring-1 ring-emerald-500/20' 
                          : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                      title={`Analizar de ${asset.name}`}
                    >
                      <div className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                        <span className="font-bold">{asset.symbol}</span>
                      </div>
                      <span className="text-[8px] text-slate-500 mt-0.5">{pctText}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Smart financial comment */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-left">
              <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold mb-1">
                Análisis Profesional Colombiano
              </span>
              <p className="text-xs text-emerald-300 italic font-medium antialiased">
                "{getSmartComment(selectedAsset.id)}"
              </p>
            </div>
          </div>

          {/* Results Side (5 columns) */}
          <div className="lg:col-span-5 p-6 rounded-2xl glass-panel flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">Tu Liquidación Real</span>
              
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <span className="text-xl">
                  {selectedAsset.id === 'bogota' && '🏢'}
                  {selectedAsset.id === 'ecopetrol' && '🦎'}
                  {selectedAsset.id === 'tes' && '🇨🇴'}
                  {selectedAsset.id === 'efectivo' && '🛌'}
                </span>
                <p className="text-sm font-semibold text-white mt-1">{selectedAsset.name}</p>
                <p className="text-[10px] text-slate-500">Inversión inicial 2001: $1.000.000 COP</p>
              </div>

              {/* Calculations comparison */}
              <div className="space-y-2 p-4 bg-slate-900 rounded-xl border border-slate-800/80 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Monto Nominal:</span>
                  <span className="text-slate-300">$1.000.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Factor Multiplicador:</span>
                  <span className="text-emerald-400 font-bold">{selectedAsset.ratioMultiplier}x</span>
                </div>
                {selectedAsset.id !== 'tes' && selectedAsset.id !== 'efectivo' && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cantidad Acciones 2001:</span>
                    <span className="text-slate-300">
                      {Math.floor(1000000 / selectedAsset.price2001).toLocaleString('es-CO')} u.
                    </span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm">
                  <span className="text-slate-200 font-semibold uppercase">Poder de Compra Actual:</span>
                  <span className={`font-black ${selectedAsset.id === 'efectivo' ? 'text-red-400' : 'text-emerald-400'}`}>
                    ${(INITIAL * selectedAsset.ratioMultiplier).toLocaleString('es-CO')}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-900/60 flex gap-2">
                <AlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${selectedAsset.id === 'efectivo' ? 'text-red-400' : 'text-emerald-400'}`} />
                <p className="text-[10px] text-slate-500 text-left leading-normal">
                  Este es el poder del interés compuesto y la tenencia de acciones a largo plazo. En los mercados bursátiles, la paciencia sistemática paga jugosos dividendos e incrementa tu riqueza patrimonial.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex gap-2">
              <button
                onClick={() => {
                  setSelectedAssetId(null);
                  setShowChart(false);
                }}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300 flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Re-invertir
              </button>
              <button
                onClick={onNext}
                className="flex-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs uppercase cursor-pointer flex items-center justify-center gap-1 shadow-md transition-colors"
              >
                Siguiente Reto: Riesgo <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </div>

        </motion.div>
      )}

    </div>
  );
}
