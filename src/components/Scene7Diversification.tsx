/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ArrowRight, Flame, Layers, HelpCircle, Activity, Sparkles } from 'lucide-react';

interface Scene7DiversificationProps {
  onNext: () => void;
}

export default function Scene7Diversification({ onNext }: Scene7DiversificationProps) {
  const [shockTriggered, setShockTriggered] = useState(false);
  const [animating, setAnimating] = useState(false);

  // States at beginning and after shock
  const initialValue = 10000000;
  const [valConcentrated, setValConcentrated] = useState(10000000);
  const [valDiversified, setValDiversified] = useState(10000000);

  const runSectorShock = () => {
    setAnimating(true);
    setShockTriggered(true);

    // sequential drop
    let step = 0;
    const interval = setInterval(() => {
      step++;
      // Concentrated drops 40%
      setValConcentrated((prev) => Math.max(6000000, Math.round(initialValue - (initialValue * 0.40 * (step / 10)))));
      // Diversified only drops ~6%
      setValDiversified((prev) => Math.max(9400000, Math.round(initialValue - (initialValue * 0.06 * (step / 10)))));

      if (step >= 10) {
        clearInterval(interval);
        setAnimating(false);
      }
    }, 70);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-8"
      >
        <span className="text-xs font-mono px-3 py-1 bg-slate-800 text-slate-400 rounded-full uppercase border border-slate-700/60">
          Escena 7: Diversificación
        </span>
        <h2 className="text-3xl font-extrabold font-display text-white mt-3">
          La Regla de Oro: Dividir para Conquistar
        </h2>
        <p className="text-slate-400 mt-2 max-w-2xl mx-auto text-xs sm:text-sm">
          Descubre por qué poner todos tus fondos virtuales en una sola alternativa bursátil expone tu capital a un peligro extremo.
        </p>
      </motion.div>

      {/* COMPARISON PANELS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Portfolio A: Concentrated */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-3 text-[10px] font-mono rounded bg-red-500/10 text-red-400 border border-red-500/15">
            CONCENTRADO
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🥚</span>
              <div className="text-left">
                <h4 className="font-display font-bold text-sm text-white">Portafolio "Un Solo Huevo"</h4>
                <p className="text-[10px] text-slate-500">Todo el capital concentrado en un único activo.</p>
              </div>
            </div>

            {/* Allocation listing */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-900 text-xs text-slate-400 text-left space-y-2">
              <div className="flex justify-between font-mono">
                <span>Acciones ECOPETROL:</span>
                <span className="text-white font-bold">100% (${initialValue.toLocaleString('es-CO')})</span>
              </div>
              <div className="w-full bg-red-500 h-2.5 rounded-full" />
            </div>

            {/* Current Balance Display */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 text-center">
              <span className="text-[9px] uppercase tracking-wider font-mono text-slate-500 block">Valor Cartera Real</span>
              <motion.p
                key={valConcentrated}
                className="text-2xl font-mono font-black text-white mt-1"
              >
                ${valConcentrated.toLocaleString('es-CO')}
              </motion.p>
              {shockTriggered && (
                <span className="text-xs text-red-400 font-mono font-bold mt-1 inline-block">-40% neto del capital</span>
              )}
            </div>
          </div>
        </div>

        {/* Portfolio B: Diversified */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-3 text-[10px] font-mono rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/15">
            DIVERSIFICADO
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🪺</span>
              <div className="text-left">
                <h4 className="font-display font-bold text-sm text-white">Portafolio "Cesta Protegida"</h4>
                <p className="text-[10px] text-slate-500">Múltiples sectores compensándose recíprocamente.</p>
              </div>
            </div>

            {/* Allocation listing */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-900 text-xs text-slate-400 text-left space-y-2 font-mono">
              <div className="flex justify-between">
                <span>CDT Seguro (Renta Fija):</span>
                <span>25%</span>
              </div>
              <div className="flex justify-between">
                <span>TES Soberano (Renta Fija):</span>
                <span>25%</span>
              </div>
              <div className="flex justify-between">
                <span>Acciones Multi-Sector (BVC):</span>
                <span>50%</span>
              </div>
              <div className="w-full h-2.5 rounded-full flex overflow-hidden">
                <div className="w-1/4 bg-blue-500 h-full" />
                <div className="w-1/4 bg-indigo-500 h-full" />
                <div className="w-1/2 bg-emerald-500 h-full" />
              </div>
            </div>

            {/* Current Balance Display */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 text-center">
              <span className="text-[9px] uppercase tracking-wider font-mono text-slate-500 block">Valor Cartera Real</span>
              <motion.p
                key={valDiversified}
                className="text-2xl font-mono font-black text-white mt-1"
              >
                ${valDiversified.toLocaleString('es-CO')}
              </motion.p>
              {shockTriggered && (
                <span className="text-xs text-red-300 font-mono font-bold mt-1 inline-block">-6% amortiguado</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SHOCK TRIGGER PANEL */}
      <div className="mt-8 p-6 rounded-2xl glass-panel relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl animate-pulse-slow" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 text-left space-y-2">
            <span className="inline-flex items-center gap-1.5 p-1.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono text-[9px] font-bold uppercase">
              NOTICIA DE ÚLTIMA HORA
            </span>
            <h4 className="font-display font-medium text-white text-sm">
              Colapso estrepitoso del Petróleo Brent por desaceleración global
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans antialiased">
              El crudo de referencia en Colombia cae de $110 USD a $65 USD por barril. Esto impacta masivamente los ingresos corporativos de Ecopetrol. Ejecuta el simulador de shock para observar el escudo protector de la diversificación.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            {!shockTriggered ? (
              <button
                onClick={runSectorShock}
                className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black tracking-wider text-xs uppercase rounded-xl shadow-lg shadow-amber-500/10 cursor-pointer transition-all"
              >
                Simular Impacto Petrolero 🔥
              </button>
            ) : (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold font-mono flex items-center justify-center gap-2">
                <ShieldCheck className="w-5 h-5" /> ¡Shock amortiguado!
              </div>
            )}
          </div>
        </div>

        {/* Post-shock educational disclosure */}
        <AnimatePresence>
          {shockTriggered && !animating && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 pt-6 border-t border-slate-800 text-left space-y-4 overflow-hidden"
            >
              <div>
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider block font-bold mb-1">
                  Explicación Financiera Práctica
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans antialiased">
                  Como descubriste, el <strong>Portafolio Concentrado</strong> sufrió de lleno la pérdida del 40%, golpeando severamente los ahorros de toda tu vida laboral. En cambio, en el <strong>Portafolio Diversificado</strong>, tus tenencias en CDT tradicionales, TES colombianos y acciones de construcción o alimentos (que de hecho subieron ligeramente porque un costo de combustible menor les beneficia) absorbieron el impacto.
                </p>
              </div>

              {/* FICs explanation */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="space-y-1">
                  <h5 className="font-display font-bold text-xs text-white flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    Fondos de Inversión Colectiva (FICs)
                  </h5>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                    ¿No tienes tiempo de analizar 30 empresas distintas? Las Carteras Colectivas o FICs de Colombia permiten que muchos pequeños inversionistas unan sus capitales. Un gestor profesional autorizado se encarga de diversificarlo bajo estrictos límites por ley.
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-center text-center">
                  <span className="text-[8px] uppercase tracking-wider font-mono text-slate-500">Beneficios de FICs</span>
                  <ul className="text-[9px] text-slate-300 font-sans space-y-1 mt-1 text-left">
                    <li>✓ Diversificación automática desde montos pequeños ($50k)</li>
                    <li>✓ Gestión a cargo de administradores certificados</li>
                    <li>✓ Acceso a macro-títulos que solo compran billonarios</li>
                  </ul>
                </div>
              </div>

              {/* Navigation button */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={onNext}
                  className="py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black tracking-wider text-xs uppercase rounded-lg shadow cursor-pointer transition-all flex items-center gap-1"
                >
                  Entender Derivados Financieros <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
