/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Landmark, TrendingUp, RefreshCw, ArrowRight, UserPlus, HelpCircle } from 'lucide-react';

interface Scene1OriginProps {
  onNext: (choice: 'gastar' | 'banco' | 'invertir') => void;
  playerName: string;
}

export default function Scene1Origin({ onNext, playerName }: Scene1OriginProps) {
  const [selected, setSelected] = useState<'gastar' | 'banco' | 'invertir' | null>(null);
  const [gastarStep, setGastarStep] = useState(0); // For animating consumption items
  const [gastarCash, setGastarCash] = useState(5000000);

  // Animation assets for Gastar
  const gastados = [
    { name: 'Smartphone de última generación', cost: 3200000, icon: '📱' },
    { name: 'Zapatillas importadas de edición especial', cost: 1100000, icon: '👟' },
    { name: 'Cena VIP y fiesta con amigos', cost: 550000, icon: '🥂' }
  ];

  const handleGastarClick = () => {
    setSelected('gastar');
    setGastarStep(1);
    // Drain money sequentially
    setTimeout(() => {
      setGastarCash(1800000); // minus 3.2M
      setGastarStep(2);
    }, 1500);
    setTimeout(() => {
      setGastarCash(700000);  // minus 1.1M
      setGastarStep(3);
    }, 3000);
    setTimeout(() => {
      setGastarCash(150000);  // minus 550K
      setGastarStep(4);
    }, 4500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-8"
      >
        <span className="text-xs font-mono px-3 py-1 bg-slate-800 text-slate-400 rounded-full uppercase border border-slate-700/60">
          Escena 1: El Origen del Dinero
        </span>
        <h2 className="text-3xl font-extrabold font-display text-white mt-3">
          ¡Te has ganado el chance: recibes $5.000.000 COP!
        </h2>
        <p className="text-slate-400 mt-2 max-w-2xl mx-auto text-sm">
          ¡Qué increíble golpe de suerte! Acabas de ganarte el chance acumulado y recibes tu primer capital libre. En tus manos está determinar tu futuro financiero en Colombia. ¿Qué harás con este dinero?
        </p>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Gastar */}
        <motion.div
          onClick={() => {
            if (selected !== 'gastar') handleGastarClick();
          }}
          whileHover={{ y: -4 }}
          className={`cursor-pointer rounded-2xl p-6 glass-panel transition-all flex flex-col justify-between h-80 relative overflow-hidden ${
            selected === 'gastar' ? 'border-red-500/40 bg-red-950/20' : 'hover:border-red-500/20'
          }`}
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white font-display">Opción A: Gastarlo Todo</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Disfrutar el presente. Adquirir tecnología, ropa importada y celebrar por lo alto. ¡La vida es ahora!
            </p>
          </div>
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-red-400">
            <span>CONSUMO INMEDIATO</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </motion.div>

        {/* Card 2: Guardar */}
        <motion.div
          onClick={() => {
            setSelected('banco');
            setGastarStep(0);
          }}
          whileHover={{ y: -4 }}
          className={`cursor-pointer rounded-2xl p-6 glass-panel transition-all flex flex-col justify-between h-80 relative overflow-hidden ${
            selected === 'banco' ? 'border-blue-500/40 bg-blue-950/20' : 'hover:border-blue-500/20'
          }`}
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white font-display">Opción B: Guardarlo en el Banco</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              ¿Seguridad ante todo? Colocar el dinero a salvo en una cuenta bancaria nacional de ahorros.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-400">
            <span>MERCADO INTERMEDIADO</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </motion.div>

        {/* Card 3: Invertir */}
        <motion.div
          onClick={() => {
            setSelected('invertir');
            setGastarStep(0);
          }}
          whileHover={{ y: -4 }}
          className={`cursor-pointer rounded-2xl p-6 glass-panel transition-all flex flex-col justify-between h-80 relative overflow-hidden ${
            selected === 'invertir' ? 'border-emerald-500/40 bg-emerald-950/20' : 'hover:border-emerald-500/20'
          }`}
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white font-display">Opción C: Invertir en la Bolsa</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Convertirse en socio de empresas colombianas buscando utilidades y valorización del dinero.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400">
            <span>MERCADO NO INTERMEDIADO</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </motion.div>

      </div>

      {/* Interactive Floating Window (Modal) for Selection Details */}
      <AnimatePresence>
        {selected !== null && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className={`w-full max-w-2xl bg-slate-900 border text-left rounded-2xl relative shadow-2xl p-6 sm:p-8 overflow-hidden my-auto max-h-[90vh] flex flex-col justify-between ${
                selected === 'gastar' ? 'border-red-500/30 shadow-red-500/10' :
                selected === 'banco' ? 'border-blue-500/30 shadow-blue-500/10' :
                'border-emerald-500/30 shadow-emerald-500/10'
              }`}
            >
              {/* Top Banner & Title inside Floating Window */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  {selected === 'gastar' ? '⚠️ Consumo Excesivo' : selected === 'banco' ? '🏦 Banco Tradicional' : '🚀 Bolsa de Valores Directa'}
                </span>
                <button
                  onClick={() => {
                    setSelected(null);
                    setGastarStep(0);
                    setGastarCash(5000000);
                  }}
                  className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-sm font-semibold border border-slate-700/80 cursor-pointer hover:bg-slate-700 transition-colors"
                  title="Cerrar ventana"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="flex-1 overflow-y-auto py-5 space-y-5 pr-1 text-slate-300">
                {selected === 'gastar' && (
                  <div className="space-y-5">
                    <h4 className="font-display font-bold text-white text-lg flex items-center gap-2">
                      <span>🛍️ El frenesí de compras de {playerName}</span>
                      <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 font-semibold ml-auto shrink-0">
                        Consumidor Pasivo
                      </span>
                    </h4>

                    <p className="text-xs text-slate-400">
                      Has decidido gastar los $5.000.000 COP en gustos pasajeros. Observa de forma secuencial cómo se reduce tu capital de trabajo sin generar retornos:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                      <div className="md:col-span-7">
                        <ul className="space-y-2.5">
                          <li className={`flex items-center gap-3 p-2.5 rounded-xl bg-slate-950 border transition-all ${gastarStep >= 2 ? 'border-red-950 bg-red-955/5 opacity-100' : 'border-dashed border-slate-800 opacity-40'}`}>
                            <span className="text-2xl">{gastados[0].icon}</span>
                            <div className="flex-1 text-left">
                              <p className="text-xs font-semibold text-white">{gastados[0].name}</p>
                              <p className="text-[10px] text-slate-500">Pasivo inmediato: pierde el 30% de su valor al abrir el empaque.</p>
                            </div>
                            <span className="font-mono text-xs font-bold text-red-400 font-bold">-$3.2M</span>
                          </li>
                          <li className={`flex items-center gap-3 p-2.5 rounded-xl bg-slate-950 border transition-all ${gastarStep >= 3 ? 'border-red-950 bg-red-955/5 opacity-100' : 'border-dashed border-slate-800 opacity-40'}`}>
                            <span className="text-2xl">{gastados[1].icon}</span>
                            <div className="flex-1 text-left">
                              <p className="text-xs font-semibold text-white">{gastados[1].name}</p>
                              <p className="text-[10px] text-slate-500">Moda rápida que pasa de moda y se desgasta en meses.</p>
                            </div>
                            <span className="font-mono text-xs font-bold text-red-400 font-bold">-$1.1M</span>
                          </li>
                          <li className={`flex items-center gap-3 p-2.5 rounded-xl bg-slate-950 border transition-all ${gastarStep >= 4 ? 'border-red-950 bg-red-955/5 opacity-100' : 'border-dashed border-slate-800 opacity-40'}`}>
                            <span className="text-2xl">{gastados[2].icon}</span>
                            <div className="flex-1 text-left">
                              <p className="text-xs font-semibold text-white">{gastados[2].name}</p>
                              <p className="text-[10px] text-slate-500">Experiencia del momento. No queda ningún activo físico.</p>
                            </div>
                            <span className="font-mono text-xs font-bold text-red-400 font-bold">-$550K</span>
                          </li>
                        </ul>
                      </div>

                      {/* Display wallet state */}
                      <div className="md:col-span-5 p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Billetera Restante</p>
                        <motion.p
                          key={gastarCash}
                          initial={{ scale: 1.15, color: '#f87171' }}
                          animate={{ scale: 1, color: '#ffffff' }}
                          className="text-2xl sm:text-3xl font-mono font-black mt-1 text-white"
                        >
                          ${gastarCash.toLocaleString('es-CO')} <span className="text-[10px] text-slate-500 font-normal">COP</span>
                        </motion.p>

                        {gastarStep === 4 ? (
                          <div className="mt-4 space-y-3 w-full">
                            <span className="text-[9px] uppercase font-mono bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded font-bold">Lección</span>
                            <p className="text-[10.5px] text-red-300 leading-normal text-left">
                              ⚠️ Te quedan apenas <strong>$150.000 COP</strong> de tus cinco millones de pesos iniciales. Compraste lujos momentáneos, pero no creaste ninguna maquinaria productiva para tu futuro.
                            </p>
                          </div>
                        ) : (
                          <div className="mt-4 text-xs text-slate-500 flex items-center gap-2 animate-pulse">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin text-red-400" />
                            Gastando saldo...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {selected === 'banco' && (
                  <div className="space-y-5">
                    <h4 className="font-display font-bold text-white text-lg flex items-center gap-2 text-left">
                      <span>🏦 ¿Cómo opera la intermediación bancaria tradicional?</span>
                      <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold ml-auto shrink-0">
                        Ahorrador Pasivo
                      </span>
                    </h4>

                    <p className="text-xs text-slate-300 antialiased leading-relaxed text-left">
                      En el <strong className="text-blue-400">Mercado Intermediado</strong>, el banco asiste tu seguridad y se encarga del riesgo. Sin embargo, a cambio de esta tranquilidad, el banco te paga una módica rentabilidad fija (ahorros o CDT de baja tasa) y presta tu propio capital a empresas o personas a una tasa extremadamente alta (crédito).
                    </p>

                    {/* Flow diagram of bank */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
                      {/* Actor 1 */}
                      <div className="flex flex-col items-center p-2.5 rounded-xl bg-slate-900 border border-slate-800 w-32 relative">
                        <span className="text-xl">🧑‍💻</span>
                        <span className="text-[11px] font-bold text-white mt-1">Tú ({playerName})</span>
                        <span className="text-[10px] text-emerald-400 font-mono font-semibold mt-1">+3% E.A.</span>
                      </div>

                      {/* Connector 1 */}
                      <div className="flex flex-col items-center">
                        <span className="text-blue-400 text-[10px] font-mono font-bold animate-pulse">Depositas $5M</span>
                        <div className="w-8 h-0.5 bg-blue-500/50" />
                      </div>

                      {/* Actor 2 */}
                      <div className="flex flex-col items-center p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/40 w-32 relative">
                        <span className="text-xl">🏦</span>
                        <span className="text-[11px] font-bold text-blue-400 mt-1">EL BANCO</span>
                        <span className="text-[9px] text-slate-500">¿Spread? Alto</span>
                      </div>

                      {/* Connector 2 */}
                      <div className="flex flex-col items-center">
                        <span className="text-red-400 text-[10px] font-mono font-bold animate-pulse">Presta a 21%</span>
                        <div className="w-8 h-0.5 bg-red-500/50" />
                      </div>

                      {/* Actor 3 */}
                      <div className="flex flex-col items-center p-2.5 rounded-xl bg-slate-900 border border-slate-800 w-32 relative">
                        <span className="text-xl">🏗️</span>
                        <span className="text-[11px] font-bold text-white mt-1">Empresarios</span>
                        <span className="text-[10px] text-red-400 font-mono font-semibold mt-1">Pagan 21% E.A.</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 text-left text-xs text-slate-400 space-y-1">
                      <p className="font-semibold text-slate-200">🔍 Margen Neto de Intermediación (Spread Bursátil):</p>
                      <p className="leading-relaxed">
                        El banco captura una brecha colosal del 18% anual (21% cobrado menos el 3% pagado). El banco se enriquece prestando dinero ajeno mientras tú pierdes poder adquisitivo latente por culpa de la inflación real del país.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 flex items-center justify-between font-mono text-xs">
                      <span className="text-slate-400">Poder bruto proyectado tras 1 año:</span>
                      <span className="text-white font-bold">$5.150.000 COP</span>
                    </div>
                  </div>
                )}

                {selected === 'invertir' && (
                  <div className="space-y-4">
                    <h4 className="font-display font-bold text-white text-lg flex items-center gap-2 text-left">
                      <span>🚀 El canal directo: Mercado de Valores No Intermediado</span>
                      <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold ml-auto shrink-0">
                        Inversionista Activo
                      </span>
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed text-left">
                      En el <strong className="text-emerald-400">Mercado No Intermediado</strong>, quitas del medio la figura del intermediario bancario pesado. Conectas tus recursos directamente a los emisores que cotizan en la Bolsa de Valores de Colombia (BVC). Tú eres el socio directo que asume el reto y la rentabilidad.
                    </p>

                    {/* Direct flow chart */}
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-850 flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
                      <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg w-36">
                        <span className="text-lg">🧑‍💻</span>
                        <p className="text-xs font-semibold text-white mt-0.5">Tú (Inversionista)</p>
                        <p className="text-[10px] text-slate-500">Recibe todas las ganancias</p>
                      </div>

                      <div className="flex-1 flex flex-col items-center">
                        <span className="text-emerald-400 text-[10px] font-mono tracking-wider font-bold">Bolsa Unificada BVC</span>
                        <div className="w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full animate-pulse my-1" />
                        <span className="text-[9px] text-slate-500">Sin spread del banco</span>
                      </div>

                      <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg w-36">
                        <span className="text-lg">🏭⚙️</span>
                        <p className="text-xs font-semibold text-emerald-400 mt-0.5">Grandes Empresas</p>
                        <p className="text-[10px] text-slate-500">Capital directo para crecer</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 text-left text-xs text-slate-400 space-y-1">
                      <p className="font-semibold text-slate-200">💎 Tu gran beneficio bursátil:</p>
                      <p className="leading-relaxed">
                        Toda la rentabilidad real corporativa (pago directo de dividendos trimestrales y la valorización patrimonial diaria de la acción) se deposita directo a tu nombre sin que un intermediario tradicional capte tu renta.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Actions Footer */}
              <div className="pt-4 border-t border-slate-800 flex gap-3 shrink-0">
                {selected === 'gastar' && gastarStep === 4 ? (
                  <>
                    <button
                      onClick={() => {
                        setGastarCash(5000000);
                        setGastarStep(0);
                        setSelected(null);
                      }}
                      className="flex-1 py-3 px-4 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-xs text-white font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Re-evaluar decisión
                    </button>
                    <button
                      onClick={() => onNext('gastar')}
                      className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-xs text-white font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Asumir lección y avanzar <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : selected === 'gastar' ? (
                  <div className="w-full text-center text-xs text-slate-500 py-3 font-mono animate-pulse">
                    Completa el simulador secuencial de lujos antes de continuar...
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setSelected(null)}
                      className="flex-1 py-3 px-4 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer text-center"
                    >
                      Volver a evaluar
                    </button>
                    <button
                      onClick={() => onNext(selected as 'banco' | 'invertir')}
                      className={`flex-2 py-3 px-4 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        selected === 'banco' 
                          ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                          : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black'
                      }`}
                    >
                      {selected === 'banco' ? 'Colocar saldo en el Banco' : 'Ingresar al parqué de la Bolsa'} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
