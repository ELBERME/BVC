/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ArrowRight, TrendingUp, Sparkles, RefreshCw, Layers, DollarSign, Activity, AlertCircle } from 'lucide-react';

interface Scene8DerivativesProps {
  onNext: (boughtHedge: boolean) => void;
}

export default function Scene8Derivatives({ onNext }: Scene8DerivativesProps) {
  const [choice, setChoice] = useState<boolean | null>(null);
  const [running, setRunning] = useState(false);
  const [tickerUSD, setTickerUSD] = useState(4000);
  const [day, setDay] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const startSimulation = () => {
    if (choice === null) return;
    setRunning(true);
    setDay(0);
    setTickerUSD(4000);
    setShowResult(false);
  };

  useEffect(() => {
    if (!running) return;

    if (day >= 30) {
      setRunning(false);
      setShowResult(true);
      return;
    }

    const timer = setTimeout(() => {
      setDay((d) => d + 2);
      
      // Simulate TRM dollar fluctuation drifting heavily upward towards $4,780 COP
      setTickerUSD((prev) => {
        const drift = 53; // net positive climb
        const volatility = (Math.random() - 0.45) * 60;
        return Math.min(4780, Math.round(prev + drift + volatility));
      });

    }, 120);

    return () => clearTimeout(timer);
  }, [running, day]);

  // Real costs computed
  const baseRate = 4000;
  const finalRate = 4780;
  const invoiceUSD = 2000;
  const costWithoutDerivative = invoiceUSD * finalRate; // $9,560,000 COP
  const costWithDerivative = invoiceUSD * baseRate;     // $8,000,000 COP
  const savings = costWithoutDerivative - costWithDerivative; // $1,560,000 COP

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-8"
      >
        <span className="text-xs font-mono px-3 py-1 bg-slate-800 text-slate-400 rounded-full uppercase border border-slate-700/60">
          Escena 8: El Mundo de los Derivados
        </span>
        <h2 className="text-3xl font-extrabold font-display text-white mt-3">
          Cobertura vs. Especulación
        </h2>
        <p className="text-slate-400 mt-2 max-w-2xl mx-auto text-xs sm:text-sm">
          Aprende el sofisticado mundo de los derivados financieros con un problema real de comercio exterior colombiano.
        </p>
      </motion.div>

      {/* STORYLINE BOARD */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 max-w-3xl mx-auto space-y-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📦💻</span>
          <div className="text-left">
            <h4 className="font-display font-bold text-sm text-white">Tu Empresa: TechColombia S.A.S.</h4>
            <p className="text-[10px] text-slate-500">Importadora de microconductores y tecnología de punta.</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed text-left font-sans antialiased">
          Has ordenado un lote de chips tecnológicos a tu fabricante en EE.UU. por valor de <strong>$2.000 USD</strong>. El plazo de pago que te otorgan vence en exactamente 30 días. El dólar hoy cotiza a una TRM estable de <strong>$4.000 COP</strong> (tu presupuesto planeado es de $8M COP).
        </p>

        <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-900 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-left">
          <div>
            <span className="text-slate-500 text-[10px] block uppercase">Peligro Monetario</span>
            <p className="text-red-400 mt-0.5">Si el dólar sube a $4.800 COP, pagarás $9.600.000 (sobrecosto de $1.6M COP del presupuesto).</p>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block uppercase">Solución de Bolsa (Derivados)</span>
            <p className="text-emerald-400 mt-0.5">Adquirir un contrato de "Futuro de Divisa" en la BVC para garantizar congelar la tasa a $4.000 COP.</p>
          </div>
        </div>
      </div>

      {/* SELECTION OR SIM LEVEL */}
      {!running && !showResult && (
        <div className="space-y-6 max-w-2xl mx-auto text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">            {/* Choice 1: Hedging Futuro */}
            <motion.div
              onClick={() => setChoice(true)}
              whileHover={{ y: -3 }}
              className={`relative cursor-pointer p-5 rounded-2xl border-2 transition-all h-44 flex flex-col justify-between text-left ${
                choice === true 
                  ? 'bg-emerald-950/20 border-emerald-400 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-500/30' 
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-600 hover:bg-slate-900/10'
              }`}
            >
              {/* Active Selection Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                {choice === true ? (
                  <span className="text-[9px] font-mono font-bold bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950" /> Seleccionado ✓
                  </span>
                ) : (
                  <span className="text-[8px] font-mono text-slate-500 border border-slate-800 px-2 py-0.5 rounded-full hover:text-slate-300 hover:border-slate-500">
                    Elegir
                  </span>
                )}
              </div>

              <div>
                <span className="text-2xl">🛡️🛡️</span>
                <h4 className="font-display font-bold text-xs text-white mt-1">Contratar Cobertura (Futuro)</h4>
                <p className="text-[10px] text-slate-400 mt-1 mr-14">
                  Congelas el tipo de cambio a $4.000 COP. Aseguras el presupuesto y mitigas cualquier volatilidad de divisa.
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-black">SEGURIDAD CORPORATIVA</span>
            </motion.div>
 
            {/* Choice 2: Speculate */}
            <motion.div
              onClick={() => setChoice(false)}
              whileHover={{ y: -3 }}
              className={`relative cursor-pointer p-5 rounded-2xl border-2 transition-all h-44 flex flex-col justify-between text-left ${
                choice === false 
                  ? 'bg-amber-950/20 border-amber-400 shadow-lg shadow-amber-500/20 ring-1 ring-amber-500/30' 
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-600 hover:bg-slate-900/10'
              }`}
            >
              {/* Active Selection Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                {choice === false ? (
                  <span className="text-[9px] font-mono font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950" /> Seleccionado ✓
                  </span>
                ) : (
                  <span className="text-[8px] font-mono text-slate-500 border border-slate-800 px-2 py-0.5 rounded-full hover:text-slate-300 hover:border-slate-500">
                    Elegir
                  </span>
                )}
              </div>

              <div>
                <span className="text-2xl">🎲🔮</span>
                <h4 className="font-display font-bold text-xs text-white mt-1">Arriesgarse (Sin Cobertura)</h4>
                <p className="text-[10px] text-slate-400 mt-1 mr-14">
                  No pagas garantías. Si el dólar baja, compras más barato. Pero si sube... asumes la pérdida total.
                </p>
              </div>
              <span className="text-[10px] font-mono text-amber-500 uppercase font-black">ESPECULAR / CORRER RIESGO</span>
            </motion.div>

          </div>

          <button
            disabled={choice === null}
            onClick={startSimulation}
            className={`py-3.5 px-8 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md transition-all inline-flex items-center gap-2 cursor-pointer ${
              choice !== null
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed'
            }`}
          >
            <Activity className="w-4 h-4 text-slate-950 animate-pulse" /> Simular Tasa cambiaria (30 Días) <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      )}

      {/* TICKING SIMULATOR AREA */}
      {running && (
        <motion.div
          key="running-sim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center max-w-md mx-auto space-y-4"
        >
          <span className="text-xs uppercase font-mono tracking-widest text-slate-500">TASA TRM DIARIA EN VIVO</span>
          
          <div className="py-6 px-4 bg-slate-900 rounded-xl border border-slate-850 flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-mono font-black text-white animate-pulse">
              ${tickerUSD.toLocaleString('es-CO')} <span className="text-xs text-slate-400 font-sans font-normal">COP/USD</span>
            </span>
            <div className="w-full h-1.5 bg-slate-850 rounded-full mt-4 overflow-hidden">
              <div style={{ width: `${(day/30)*100}%` }} className="h-full bg-emerald-400" />
            </div>
            <span className="text-[10px] font-mono text-emerald-400 mt-2">Día {day}/30 transcurridos</span>
          </div>
          
          <p className="text-[10px] text-slate-500">
            Sucesos macroeconómicos y flujos de capitales deciden el precio final en Colombia...
          </p>
        </motion.div>
      )}

      {/* SIMULATOR RESULTS DISPLAY */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 rounded-2xl glass-panel border-emerald-500/20 max-w-2xl mx-auto space-y-6"
        >
          {choice ? (
            /* RESULTS WITH DERIVATIVES */
            <div className="space-y-4 text-center">
              <div className="inline-flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 max-w-max mx-auto font-mono text-xs font-bold">
                <ShieldCheck className="w-4 h-4" /> TRASLADO DE RIESGO EXITOSO
              </div>
              <h3 className="font-display font-extrabold text-xl text-white">¡Éxito de Cobertura Financiera!</h3>
              <p className="text-xs text-slate-300 antialiased leading-relaxed max-w-xl mx-auto">
                El dólar en Colombia se disparó brutalmente cerrando a una TRM histórica de <strong>$4.780 COP</strong>. Sin embargo, gracias a tu contrato de Futuros cotizado en la BVC, tu comisionista exigió hacer cumplir tu tasa congelada de <strong>$4.000 COP</strong>.
              </p>

              {/* Math breakdown */}
              <div className="p-4 rounded-xl bg-slate-905 border border-slate-850 max-w-md mx-auto grid grid-cols-2 gap-4 text-xs font-mono text-left">
                <div>
                  <span className="text-slate-500">Costo real liquidado:</span>
                  <p className="text-emerald-400 font-bold">${costWithDerivative.toLocaleString('es-CO')} COP</p>
                </div>
                <div>
                  <span className="text-slate-500">Monto evitado (Ahorro):</span>
                  <p className="text-emerald-400 font-bold">+${savings.toLocaleString('es-CO')} COP</p>
                </div>
              </div>
            </div>
          ) : (
            /* RESULTS WITHOUT DERIVATIVES */
            <div className="space-y-4 text-center">
              <div className="inline-flex items-center gap-2 p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 max-w-max mx-auto font-mono text-xs font-bold">
                <AlertCircle className="w-4 h-4" /> CHOQUE DE CARAS DE DIVISA
              </div>
              <h3 className="font-display font-extrabold text-xl text-white">¡Presupuesto Devastado!</h3>
              <p className="text-xs text-slate-300 antialiased leading-relaxed max-w-xl mx-auto">
                Decidiste no cubrirte y especular. Lamentablemente, la TRM de divisas en Colombia cerró a <strong>$4.780 COP</strong>. Al carecer de un seguro financiero de derivados, tuviste que comprar los dólares al valor de contado del día, pagando un sobrecosto drástico.
              </p>

              {/* Math breakdown */}
              <div className="p-4 rounded-xl bg-slate-905 border border-slate-850 max-w-md mx-auto grid grid-cols-2 gap-4 text-xs font-mono text-left">
                <div>
                  <span className="text-slate-500">Liquidación manual:</span>
                  <p className="text-red-400 font-bold">${costWithoutDerivative.toLocaleString('es-CO')} COP</p>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold">Sobrecosto absorbido:</span>
                  <p className="text-red-400 font-bold">-${savings.toLocaleString('es-CO')} COP</p>
                </div>
              </div>
            </div>
          )}

          {/* Core concept explanation */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 text-left">
            <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider block font-bold mb-1">
              ¿Qué es un instrumento Derivado?
            </span>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans mt-1">
              Un <strong className="text-slate-300">Derivado Financiero</strong> es un contrato legal cuyo precio <em>se deriva</em> del comportamiento de otro activo principal (llamado "activo subyacente", en este caso la TRM del dólar o inclusive barriles de crudo). Sirven prioritariamente para mitigar riesgos comerciales (cobertura) o para especulación de alta volatilidad. Requieren garantías por ley y son de mayor complejidad.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 text-center flex gap-2 justify-center">
            <button
              onClick={() => {
                setChoice(null);
                setShowResult(false);
              }}
              className="py-2.5 px-4 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold text-xs flex items-center justify-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Re-jugar escenario
            </button>
            <button
              onClick={() => onNext(choice!)}
              className="py-2.5 px-6 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs uppercase cursor-pointer flex items-center justify-center gap-1 shadow-md"
            >
              Configurar Portafolio Final <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </motion.div>
      )}

    </div>
  );
}
