/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, HelpCircle, ArrowRight, Play, TrendingUp, Sparkles, UserPlus, Users, ArrowUp, ArrowDown } from 'lucide-react';
import { INITIAL_STOCKS } from '../data';
import { StockTicker } from '../types';

interface Scene2FusionProps {
  onNext: () => void;
}

export default function Scene2Fusion({ onNext }: Scene2FusionProps) {
  const [fused, setFused] = useState(false);
  const [stocks, setStocks] = useState<StockTicker[]>(INITIAL_STOCKS);
  const [selectedStockSymbol, setSelectedStockSymbol] = useState<string>('ECOPETROL');
  const [marketActivity, setMarketActivity] = useState<string[]>([
    'Inversionista de Cali colocó orden de compra en GEB.',
    'Corredor de Bogotá liquidó portafolio de construcción.'
  ]);

  // Simulate continuous market movements in real-time after fusion (Slower interval: 4000ms as requested)
  useEffect(() => {
    if (!fused) return;

    const interval = setInterval(() => {
      setStocks((prev) =>
        prev.map((s) => {
          // Slow background fluctuation (-1.2% to +1.5%)
          const changePct = (Math.random() - 0.44) * 0.015;
          const newPrice = Math.round(s.price * (1 + changePct));
          const updatedHistory = [...s.history.slice(1), s.price];

          return {
            ...s,
            prevPrice: s.price,
            price: newPrice,
            history: updatedHistory
          };
        })
      );

      // Random slow logs (slower so users have time to read)
      if (stocks.length > 0) {
        const randomSymbol = stocks[Math.floor(Math.random() * stocks.length)].symbol;
        const actions = ['colocó orden de compra', 'vendió participación', 'solicitó precio firme', 'reinvierte dividendos'];
        const cities = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Bucaramanga'];
        const randomActivity = `Mesa de ${cities[Math.floor(Math.random() * cities.length)]} ${actions[Math.floor(Math.random() * actions.length)]} en ${randomSymbol}.`;

        setMarketActivity((logs) => [randomActivity, ...logs.slice(0, 3)]);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [fused, stocks.length]);

  // Handle active stock supply/demand price changes
  const changeSelectedStockPrice = (direction: 'up' | 'down') => {
    const targetStock = stocks.find(s => s.symbol === selectedStockSymbol);
    if (!targetStock) return;

    const changePct = direction === 'up' ? 0.05 : -0.045; // +5% or -4.5%
    const newPrice = Math.round(targetStock.price * (1 + changePct));

    setStocks((prev) =>
      prev.map((s) => {
        if (s.symbol === selectedStockSymbol) {
          const updatedHistory = [...s.history.slice(1), s.price];
          return {
            ...s,
            prevPrice: s.price,
            price: newPrice,
            history: updatedHistory
          };
        }
        return s;
      })
    );

    const newLog = direction === 'up'
      ? `📈 Presión COMPRADORA: Alta demanda hace subir ${selectedStockSymbol} a $${newPrice.toLocaleString('es-CO')} COP.`
      : `📉 Presión VENDEDORA: Exceso de oferta baja el precio de ${selectedStockSymbol} a $${newPrice.toLocaleString('es-CO')} COP.`;

    setMarketActivity((logs) => [newLog, ...logs.slice(0, 3)]);
  };

  const activeStock = stocks.find((s) => s.symbol === selectedStockSymbol) || stocks[0];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-8"
      >
        <span className="text-xs font-mono px-3 py-1 bg-slate-800 text-slate-400 rounded-full uppercase border border-slate-700/60">
          Escena 2: Entrando a la BVC
        </span>
        <h2 className="text-3xl font-extrabold font-display text-white mt-3">
          El Gran Nacimiento del Mercado Unificado
        </h2>
        <p className="text-slate-400 mt-2 max-w-2xl mx-auto text-sm">
          Antes del año 2001, Colombia tenía la negociación bursátil fragmentada e ineficiente. Conoce cómo se resolvió esto para siempre.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!fused ? (
          <motion.div
            key="merger-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-2xl glass-panel text-center relative max-w-3xl mx-auto"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>

            <h3 className="font-display font-bold text-xl text-white mb-6">
              Año 2001: El Desafío de la Fusión
            </h3>
            <p className="text-xs text-slate-300 antialiased leading-relaxed max-w-lg mx-auto mb-8">
              En Bogotá, Medellín y Cali operaban tres bolsas independientes. Esto competía por liquidez y dividía el país financiero. Presiona para unificar las tres bolsas regionales en una sola entidad.
            </p>

            {/* FUSION ANIMATION DESIGN */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8 relative">
              
              {/* Regional 1 */}
              <motion.div
                animate={{ x: [0, 80, 0], y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="p-3 rounded-xl bg-gradient-to-br from-blue-900/30 to-slate-900 border border-blue-500/20 text-center"
              >
                <div className="text-2xl mb-1">🏛️</div>
                <h4 className="text-[11px] font-bold text-slate-200">Bolsa de Bogotá</h4>
                <p className="text-[9px] text-slate-500 mt-0.5">Fundada en 1928</p>
              </motion.div>

              {/* Regional 2 */}
              <motion.div
                animate={{ y: [0, -30, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="p-3 rounded-xl bg-gradient-to-br from-indigo-900/30 to-slate-900 border border-indigo-500/20 text-center"
              >
                <div className="text-2xl mb-1">🏗️</div>
                <h4 className="text-[11px] font-bold text-slate-200">Bolsa de Medellín</h4>
                <p className="text-[9px] text-slate-500 mt-0.5">Fundada en 1961</p>
              </motion.div>

              {/* Regional 3 */}
              <motion.div
                animate={{ x: [0, -80, 0], y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="p-3 rounded-xl bg-gradient-to-br from-cyan-900/30 to-slate-900 border border-cyan-500/20 text-center"
              >
                <div className="text-2xl mb-1">🌴</div>
                <h4 className="text-[11px] font-bold text-slate-200">Bolsa de Occidente</h4>
                <p className="text-[9px] text-slate-500 mt-0.5">Cali, fund. 1983</p>
              </motion.div>

              {/* Central Merger Target Area */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full border border-dashed border-emerald-500/20 animate-spin" />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setFused(true)}
              className="py-3 px-8 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold tracking-wider text-xs uppercase shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <Network className="w-4 h-4" /> ¡FUSIONAR BOLSAS EN LA BVC! <Sparkles className="w-4 h-4 text-slate-950" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="playground-screen"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Fusion Banner Alert */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎉</span>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-emerald-400 font-display">BVC (Bolsa de Valores de Colombia) Constituida</h4>
                  <p className="text-xs text-slate-400">Desde el 3 de julio de 2001, un solo parqué unificado y moderno para todo el país.</p>
                </div>
              </div>
              <span className="font-mono text-[10px] px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-bold">
                MERCADO INTEGRADO
              </span>
            </div>

            {/* Live Trading Playground Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Column 1: Live Market Monitor */}
              <div className="glass-panel rounded-xl p-5 flex flex-col h-112">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="font-display font-semibold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Pantalla Bursátil en Vivo
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500">Haz clic para seleccionar</span>
                </div>

                {/* Live Stock List */}
                <div className="flex-1 overflow-y-auto py-2 space-y-2 mt-2">
                  {stocks.map((item) => {
                    const diff = item.price - item.prevPrice;
                    const diffPct = ((diff / item.prevPrice) * 100).toFixed(2);
                    const isUp = diff >= 0;
                    const isSelected = selectedStockSymbol === item.symbol;

                    return (
                      <div
                        key={item.symbol}
                        onClick={() => setSelectedStockSymbol(item.symbol)}
                        className={`p-2.5 rounded-lg border flex items-center justify-between text-xs transition-all font-mono cursor-pointer ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-950/20 shadow-md shadow-emerald-500/10'
                            : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-left">
                          <span className="font-bold text-slate-100 block flex items-center gap-1.5">
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                            {item.symbol}
                          </span>
                          <span className="text-[9px] text-slate-500 truncate block max-w-36">{item.name}</span>
                        </div>
                        
                        {/* Static visual representation of history lines */}
                        <div className="hidden sm:block w-12 h-6 opacity-30">
                          <svg className="w-full h-full" viewBox="0 0 40 20">
                            <path
                              d={`M 0 10 Q 10 ${isUp ? 2 : 18} 20 10 T 40 ${isUp ? 2 : 18}`}
                              fill="none"
                              stroke={isUp ? '#10b981' : '#f87171'}
                              strokeWidth="2"
                            />
                          </svg>
                        </div>

                        <div className="text-right">
                          <span className="font-bold text-white block">${item.price.toLocaleString('es-CO')}</span>
                          <span className={`text-[10px] font-bold flex items-center justify-end gap-0.5 ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {isUp ? <ArrowUp className="w-2.5 h-2.5" /> : <ArrowDown className="w-2.5 h-2.5" />}
                            {isUp ? '+' : ''}{diffPct}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Column 2: Interactive - Oferta y Demanda */}
              <div className="glass-panel rounded-xl p-5 flex flex-col justify-between h-112">
                <div>
                  <h3 className="font-display font-semibold text-white text-xs uppercase tracking-wider pb-3 border-b border-slate-800 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    Simular de Oferta y Demanda
                  </h3>
                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    Las acciones varían por la puja diaria. Selecciona un título en el monitor de la izquierda y simula una orden de compra o venta directa para ver cómo reacciona el mercado:
                  </p>
                </div>

                {/* Selected Stock Interactive Card Display */}
                <div className="py-4 px-3 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col items-center justify-center my-2 relative">
                  <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-mono font-semibold">
                    {activeStock.symbol} en Negociación
                  </span>
                  
                  <p className="text-2xl font-black font-mono text-white mt-1.5">
                    ${activeStock.price.toLocaleString('es-CO')} <span className="text-xs text-slate-500 font-sans font-normal">COP</span>
                  </p>
                  
                  {/* Real interactive mock graph showing simple trend */}
                  <div className="w-full h-8 mt-3 flex items-end justify-center gap-1">
                    <div className="w-6 bg-slate-800 rounded-t h-3" />
                    <div className="w-6 bg-slate-800 rounded-t h-4" />
                    <div className="w-6 bg-slate-800 rounded-t h-5" />
                    <div className="w-6 bg-slate-800 rounded-t h-4" />
                    <div className="w-6 bg-emerald-500/60 rounded-t h-7 animate-pulse" />
                  </div>

                  {/* Buttons inside */}
                  <div className="grid grid-cols-2 gap-2.5 w-full mt-4">
                    <button
                      onClick={() => changeSelectedStockPrice('up')}
                      className="py-2.5 px-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-lg text-[11px] flex items-center justify-center gap-1 cursor-pointer transition-all uppercase tracking-tight"
                    >
                      <ArrowUp className="w-3.5 h-3.5" /> Comprar (Demanda)
                    </button>
                    <button
                      onClick={() => changeSelectedStockPrice('down')}
                      className="py-2.5 px-2 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-lg text-[11px] flex items-center justify-center gap-1 cursor-pointer transition-all uppercase tracking-tight"
                    >
                      <ArrowDown className="w-3.5 h-3.5" /> Vender (Oferta)
                    </button>
                  </div>
                </div>

                {/* Safe non-overflowing paragraph block */}
                <div className="p-3 bg-slate-950/90 rounded-lg border border-slate-850">
                  <p className="text-[10px] text-slate-400 leading-normal text-left">
                    💡 <strong className="text-slate-300">¿Cómo afecta esto?:</strong> Si eres inversionista y vendes para retirar dinero, hay un <strong className="text-rose-400">exceso de oferta</strong> y el precio cae. Si muchos quieren comprar, la <strong className="text-emerald-400">gran demanda</strong> eleva el valor.
                  </p>
                </div>
              </div>

              {/* Column 3: Live Order Stream & Advance Button */}
              <div className="glass-panel rounded-xl p-5 flex flex-col justify-between h-112">
                <div>
                  <h3 className="font-display font-semibold text-white text-xs uppercase tracking-wider pb-3 border-b border-slate-800">
                    Sucesos de la Rueda
                  </h3>
                  <div className="mt-4 space-y-3">
                    <AnimatePresence>
                      {marketActivity.map((log, idx) => (
                        <motion.div
                          key={log + idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-[11px] font-mono text-slate-300 leading-relaxed text-left"
                        >
                          <span className="text-emerald-400 font-bold shrink-0">🔔 </span>
                          {log}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 text-center">
                  <p className="text-[11px] text-slate-400 mb-4 antialiased">
                    ¡Excelente! Ya viste cómo se mueve un mercado bursátil activo de manera integrada. Ahora conozcamos quiénes participan en este parqué colombianizado.
                  </p>
                  <button
                    onClick={onNext}
                    className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold tracking-wider rounded-lg text-xs uppercase shadow-md hover:shadow-emerald-500/20 cursor-pointer transition-all flex items-center justify-center gap-1.5"
                  >
                    Avanzar a los Actores <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
