/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, ArrowRight, UserCheck, Scale, Award, HeartPulse, Sparkles } from 'lucide-react';

interface Scene6RiskPerfilProps {
  onNext: (riskAction: 'vender' | 'mantener' | 'comprar', calculatedProfile: 'conservador' | 'moderado' | 'agresivo') => void;
  playerName: string;
}

export default function Scene6RiskPerfil({ onNext, playerName }: Scene6RiskPerfilProps) {
  const [chosenAction, setChosenAction] = useState<'vender' | 'mantener' | 'comprar' | null>(null);
  const [profileResult, setProfileResult] = useState<'conservador' | 'moderado' | 'agresivo' | null>(null);

  const handleChoice = (action: 'vender' | 'mantener' | 'comprar') => {
    setChosenAction(action);
    
    // Evaluate psychological financial profile
    let profile: 'conservador' | 'moderado' | 'agresivo' = 'moderado';
    if (action === 'vender') {
      profile = 'conservador';
    } else if (action === 'mantener') {
      profile = 'moderado';
    } else if (action === 'comprar') {
      profile = 'agresivo';
    }
    
    setProfileResult(profile);
  };

  const getProfileTitle = (p: 'conservador' | 'moderado' | 'agresivo') => {
    if (p === 'conservador') return 'Inversionista Conservador 🛡️';
    if (p === 'moderado') return 'Inversionista Moderado ⚖️';
    return 'Inversionista Agresivo / Aventurero 🚀';
  };

  const getProfileDescription = (p: 'conservador' | 'moderado' | 'agresivo') => {
    if (p === 'conservador') {
      return 'Priorizas la seguridad absoluta y la preservación de tu dinero por encima de todo. Prefieres ganancias moderadas y constantes (como CDTs o TES) y te asustan las caídas prolongadas. Es una excelente base para proteger fondos destinados a necesidades de corto plazo.';
    }
    if (p === 'moderado') {
      return 'Buscas un balance inteligente. Entiendes que el mercado tiene ciclos y caídas, pero no te asustas fácilmente. Divides tus recursos entre activos estables y acciones líquidas colombianas, tolerando fluctuaciones temporales a cambio de una rentabilidad superior en el tiempo.';
    }
    return '¡Inmune al pánico! Sabes perfectamente que las mayores fortunas de la bolsa se construyen comprando cuando los precios están de rebaja (comprar el "dip"). Toleras alta volatilidad con tal de multiplicar tu patrimonio y maximizar tu crecimiento a largo plazo.';
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-8"
      >
        <span className="text-xs font-mono px-3 py-1 bg-slate-800 text-slate-400 rounded-full uppercase border border-slate-700/60">
          Escena 6: Riesgo y Tolerancia
        </span>
        <h2 className="text-3xl font-extrabold font-display text-white mt-3">
          ¡Pánico en el Parqué de la Bolsa!
        </h2>
        <p className="text-slate-400 mt-2 max-w-2xl mx-auto text-xs sm:text-sm">
          Has completado tus primeras inversiones. De pronto, un choque inflacionario internacional y temores de recesión global provocan pánico en la BVC.
        </p>
      </motion.div>

      {/* EMERGENCY CRISIS BOARD */}
      <div className="p-6 rounded-2xl border border-red-500/30 bg-red-950/20 max-w-2xl mx-auto space-y-4 mb-8 text-center relative overflow-hidden">
        {/* Sirens back glows */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl -z-10 animate-pulse-slow" />
        
        <div className="inline-flex items-center gap-2 p-2 rounded-lg bg-red-500/15 text-red-400 border border-red-500/25">
          <ShieldAlert className="w-5 h-5 animate-bounce" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider">¡ALERTA ROJA: CRASH BURSÁTIL EN LA BVC!</span>
        </div>

        <h3 className="font-display font-medium text-white text-base">
          El índice insignia MSCI COLCAP acumula una caída del 30% en pocas horas
        </h3>

        <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed antialiased">
          El valor virtual de tus acciones de Ecopetrol y otras empresas se ha desinflado un tercio. El ambiente en la calle es tenso, las noticias de televisión muestran gráficos rojos y el público vende sin control. ¿Cuál es tu reacción?
        </p>

        {/* MSCI COLCAP EDUCATIONAL BOX */}
        <div className="pt-3.5 border-t border-red-500/15 text-left max-w-md mx-auto">
          <details className="group cursor-pointer">
            <summary className="flex items-center gap-1.5 text-[11px] font-bold text-red-300 list-none group-hover:text-red-200 select-none">
              <span className="text-[9px] bg-red-500/20 text-red-405 text-red-400 px-1.5 py-0.5 rounded font-mono uppercase">Saber Más</span>
              ¿Qué es el índice MSCI COLCAP exactamente?
              <span className="text-[8px] text-red-400 transition-transform duration-150 group-open:rotate-180">▼</span>
            </summary>
            <p className="text-[10px] text-slate-300 mt-2 leading-relaxed pl-2.5 border-l border-red-500/35 font-sans">
              El <strong>MSCI COLCAP</strong> es el termómetro rector del mercado bursátil colombiano (el equivalente nacional al prestigioso S&P 500 de Wall Street). Su valor consolida el movimiento promedio diario de las <strong>20 acciones más negociadas y líquidas</strong> de Colombia (como ECOPETROL, Bancolombia, Grupo Sura, e ISA). Si el COLCAP se desploma un 30%, es porque hay un pánico generalizado y la mayoría de empresas líderes están perdiendo valor colectivo temporal, no solo tus acciones.
            </p>
          </details>
        </div>
      </div>

      {/* CHOICES GRID */}
      {!profileResult ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {/* Option 1: Vender */}
          <motion.div
            onClick={() => handleChoice('vender')}
            whileHover={{ y: -3 }}
            className="cursor-pointer p-5 rounded-xl border border-slate-800 hover:border-red-500/30 bg-slate-900/60 hover:bg-red-950/5 transition-all text-center flex flex-col justify-between h-48"
          >
            <div>
              <span className="text-2xl">🏃‍♂️💸</span>
              <h4 className="font-display font-bold text-xs text-white mt-2">Vender de inmediato</h4>
              <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed font-sans">
                "Prefiero retirar lo que me queda antes de que llegue a cero. El mercado financiero es muy arriesgado."
              </p>
            </div>
            <span className="text-[10px] uppercase font-mono text-red-400 font-bold block pt-2 border-t border-slate-800/80">
              CORTAR PÉRDIDAS
            </span>
          </motion.div>

          {/* Option 2: Mantener */}
          <motion.div
            onClick={() => handleChoice('mantener')}
            whileHover={{ y: -3 }}
            className="cursor-pointer p-5 rounded-xl border border-slate-800 hover:border-blue-500/30 bg-slate-900/60 hover:bg-blue-950/5 transition-all text-center flex flex-col justify-between h-48"
          >
            <div>
              <span className="text-2xl">⚓🧠</span>
              <h4 className="font-display font-bold text-xs text-white mt-2">Mantener la calma (Holding)</h4>
              <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed font-sans">
                "No vendo. Mi horizonte de inversión es a largo plazo. Históricamente, las empresas sólidas siempre se recuperan."
              </p>
            </div>
            <span className="text-[10px] uppercase font-mono text-blue-400 font-bold block pt-2 border-t border-slate-800/80">
              paciencia estratégica
            </span>
          </motion.div>

          {/* Option 3: Comprar más */}
          <motion.div
            onClick={() => handleChoice('comprar')}
            whileHover={{ y: -3 }}
            className="cursor-pointer p-5 rounded-xl border border-slate-800 hover:border-emerald-500/30 bg-slate-900/60 hover:bg-emerald-950/5 transition-all text-center flex flex-col justify-between h-48"
          >
            <div>
              <span className="text-2xl">🛒🔥</span>
              <h4 className="font-display font-bold text-xs text-white mt-2">Comprar más acciones de rebaja</h4>
              <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed font-sans">
                "¡Oportunidad de oro! Las mismas empresas excelentes hoy cuestan 30% menos. Duplicaré mi capital aquí."
              </p>
            </div>
            <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold block pt-2 border-t border-slate-800/80">
              comprar el "dip"
            </span>
          </motion.div>
        </div>
      ) : (
        /* REVEAL PROFILE CARD */
        <motion.div
          key="reveal-profile"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 rounded-2xl glass-panel max-w-2xl mx-auto border-emerald-500/20 space-y-6"
        >
          <div className="flex flex-col items-center text-center space-y-3 pb-5 border-b border-slate-800">
            <span className="text-xs uppercase font-mono tracking-widest text-slate-500">Resultado de Comportamiento</span>
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <UserCheck className="w-6 h-6 animate-pulse" />
            </div>
            <h4 className="font-display font-black text-xl text-white">
              {getProfileTitle(profileResult)}
            </h4>
          </div>

          <div className="space-y-4 text-left">
            <div>
              <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider block font-bold mb-1">
                ¿Qué revela tu decisión de {chosenAction === 'vender' ? 'Vender' : chosenAction === 'mantener' ? 'Mantener' : 'Comprar más'}?
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans antialiased">
                {getProfileDescription(profileResult)}
              </p>
            </div>

            {/* Educational concept box: Riesgo/Rentabilidad */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <h5 className="font-display font-semibold text-xs text-white flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-emerald-400" />
                  La Relación Riesgo-Rentabilidad
                </h5>
                <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed font-sans">
                  En finanzas colombianas, a mayor expectativa de ganancia, se debe estar dispuesto a tolerar mayor volatilidad y riesgo temporal de pérdida. No existen retornos legendarios sin periodos de fluctuación.
                </p>
              </div>
              <div className="h-full p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-center text-center">
                <span className="text-[8px] uppercase tracking-wider font-mono text-slate-500">Regla de Hierro</span>
                <span className="text-xs text-emerald-300 font-bold mt-1">"No hay almuerzo gratis"</span>
                <span className="text-[9px] text-slate-500 italic mt-0.5">Si es demasiado rentable y cero volátil, duda y alerta de estafa.</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-center">
            <button
              onClick={() => onNext(chosenAction!, profileResult!)}
              className="py-3 px-8 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black tracking-wider text-xs uppercase rounded-xl shadow-lg cursor-pointer transition-all inline-flex items-center gap-2"
            >
              Masterizar Diversificación <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
