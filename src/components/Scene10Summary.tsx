/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Award, TrendingUp, Sparkles, Printer, RefreshCw, BookOpen, ChevronDown, ChevronUp, DollarSign, Download } from 'lucide-react';

interface Scene10SummaryProps {
  stats: {
    finalBalance: number;
    initialBalance: number;
    accionesAllocated: number;
    rentaFijaAllocated: number;
    ficsAllocated: number;
    inflationErosion: number;
    history: number[];
    simulationLogs?: { year: number; balance: number; news: string; performance: string }[];
  };
  playerName: string;
  calculatedProfile: 'conservador' | 'moderado' | 'agresivo';
  onRestart: () => void;
}

export default function Scene10Summary({ stats, playerName, calculatedProfile, onRestart }: Scene10SummaryProps) {
  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState<string | null>(null);
  const [showCompletionNotification, setShowCompletionNotification] = useState(true);

  const netGain = stats.finalBalance - stats.initialBalance;
  const yieldPct = ((netGain / stats.initialBalance) * 100).toFixed(1);

  const getProfileName = (p: 'conservador' | 'moderado' | 'agresivo') => {
    if (p === 'conservador') return 'CONSERVADOR TRADICIONAL 🛡️';
    if (p === 'moderado') return 'MODERADO EQUILIBRADO ⚖️';
    return 'CRECIMIENTO AGRESIVO BVC 🚀';
  };

  const getSlogan = (p: 'conservador' | 'moderado' | 'agresivo') => {
    if (p === 'conservador') return 'Preservación de capital y prudencia en épocas de volatilidad.';
    if (p === 'moderado') return 'Balance inteligente, capturando crecimiento con escudo protector.';
    return 'Visión a largo plazo y aprovechamiento estratégico del pánico vendedor.';
  };

  const glossary = [
    {
      term: 'Mercado Intermediado',
      def: 'El ecosistema financiero tradicional regulado donde el usuario deposita capital en bancos comerciales. El banco absorbe el riesgo crediticio y capta la mayor porción del margen prestando ese capital a un interés drásticamente mayor.'
    },
    {
      term: 'Mercado No Intermediado (MND)',
      def: 'El mercado bursátil directo. El inversionista interactúa directamente con los emisores (corporaciones, Estado) mediante títulos cotizados en bolsa (BVC), maximizando utilidades al no pagar spread bancario.'
    },
    {
      term: 'Acciones (Renta Variable)',
      def: 'Títulos de participación digital de una empresa. Te hacen socio real del emisor. Tu retorno proviene de la valorización temporal del activo y del cobro trimestral/anual de dividendos decretados.'
    },
    {
      term: 'CDT & TES (Renta Fija)',
      def: 'CDT (Certificado de Depósito a Término) y TES (Títulos de Tesorería del Estado). Conoces el rendimiento y la fecha de vencimiento con exactitud matemática desde el primer día.'
    },
    {
      term: 'Sociedad Comisionista de Bolsa (SCB)',
      def: 'Las únicas intermediarias financieras autorizadas legalmente por la Superfinanciera para operar en el Core central de negociación de la Bolsa de Valores de Colombia.'
    },
    {
      term: 'DECEVAL',
      def: 'Depósito Centralizado de Valores. Entidad encargada de custodiar, liquidar y registrar de manera electrónica los derechos de propiedad de todas las acciones adquiridas en Colombia.'
    },
    {
      term: 'Derivados (Futuros)',
      def: 'Contratos financieros cuyo precio "deriva" de un subyacente (como la tasa del dólar). Utilizados por empresas colombianas para congelar tipos de cambio (cobertura) y eludir fluctuaciones alarmantes.'
    },
    {
      term: 'Diversificación (Regla de Oro)',
      def: 'Estrategia de gestión de riesgo que distribuye el dinero entre múltiples activos independientes. Evita que un golpe específico sectorial (como la crisis del petróleo) pulverice tus ahorros de toda la vida.'
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 font-sans">
      
      {/* COMPLETION MODAL OVERLAY */}
      <AnimatePresence>
        {showCompletionNotification && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl shadow-emerald-500/10"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/35 flex items-center justify-center text-emerald-400 mx-auto select-none">
                <Award className="w-8 h-8 animate-bounce" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/30 px-3 py-1 rounded-full border border-emerald-500/20">
                  Simulación Finalizada
                </span>
                <h3 className="text-2xl font-display font-extrabold text-white pt-2">
                  ¡La Experiencia ha Terminado!
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans mt-2">
                  Hola, <strong className="text-emerald-300">{playerName}</strong>. Tus 10 años de decisiones de inversión en el mercado financiero colombiano (BVC) han culminado con éxito.
                </p>
              </div>

              {/* Mini Stats Recap on the modal */}
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2 font-mono">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Saldo Final:</span>
                  <span className="text-white font-bold">${stats.finalBalance.toLocaleString('es-CO')} COP</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Rendimiento Histórico:</span>
                  <span className="text-emerald-400 font-bold">+{yieldPct}%</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Perfil Desarrollado:</span>
                  <span className="text-slate-300 font-medium truncate max-w-[180px] text-right">{calculatedProfile.toUpperCase()}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={onRestart}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors uppercase tracking-wider font-mono cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Re-jugar
                </button>
                <button
                  onClick={() => setShowCompletionNotification(false)}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-emerald-500/10"
                >
                  Ver Resultados
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SUCCESS CONFETTI TOP BANNER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-1.5 p-2 bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 rounded-full text-xs font-mono font-bold tracking-wider uppercase mb-3 px-4">
          <Award className="w-4 h-4 text-emerald-400" /> SIMULACIÓN COMPLETADA CON ÉXITO
        </div>
        <h2 className="text-4xl font-extrabold font-display text-white">
          ¡Felicidades, {playerName}!
        </h2>
        <p className="text-slate-400 mt-2 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed antialiased">
          Has superado con éxito todos los desafíos del simulador bursátil y dominado los pilares del engranaje financiero colombiano de la BVC.
        </p>
      </motion.div>

      {/* CORE DIPLOMA CARD VIEW */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        id="diploma-card"
        className="p-8 sm:p-12 rounded-3xl glass-panel relative border border-emerald-500/30 text-center space-y-8 overflow-hidden bg-slate-950 shadow-2xl"
      >
        {/* Holographic certification frames */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-blue-500 to-teal-400" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10 animate-pulse-slow" />
        
        {/* Certificate Logo */}
        <div className="flex justify-center flex-col items-center">
          <div className="relative flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Award className="w-10 h-10 animate-pulse" />
            </div>
            {/* Tiny stars */}
            <Sparkles className="w-5 h-5 text-emerald-400 absolute -top-1 -right-1" />
          </div>
          <span className="text-[10px] tracking-widest uppercase font-mono text-slate-500 font-bold mt-4">BOLSA DE VALORES DE COLOMBIA</span>
          <span className="text-[9px] font-mono text-slate-500 font-bold">PROYECTO ACADÉMICO BVC</span>
        </div>

        {/* Certificate Text core */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold">
            HISTORIAL DE LOGROS DE
          </h3>
          <h4 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            INVERSIONISTA JUNIOR CERTIFICADO
          </h4>
          <p className="text-xs text-slate-400 font-serif italic max-w-md mx-auto">
            A nombre de:
          </p>
          <p className="text-2xl sm:text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 tracking-wider">
            {playerName.toUpperCase()}
          </p>
          <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed antialiased">
            Por haber comprendido la intermediación legal bursátil, administrado capital de trabajo, mitigado riesgos mediante contratos corporativos de derivados y estructurado carteras de inversión diversificadas.
          </p>
        </div>

        {/* Dynamic results statistics grid inside the certificate */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-6 border-t border-slate-800/80">
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
            <span className="text-[9px] uppercase tracking-wider font-mono text-slate-500 block">Patrimonio Final</span>
            <span className="text-sm font-mono font-bold text-white mt-0.5 block">${stats.finalBalance.toLocaleString('es-CO')} COP</span>
          </div>
          
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
            <span className="text-[9px] uppercase tracking-wider font-mono text-slate-500 block">Rendimiento Neto</span>
            <span className="text-sm font-mono font-bold text-emerald-400 mt-0.5 block flex items-center justify-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" />
              +{yieldPct}%
            </span>
          </div>

          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
            <span className="text-[9px] uppercase tracking-wider font-mono text-slate-500 block">Perfil de Tolerancia</span>
            <span className="text-xs font-mono font-bold text-slate-300 mt-1 block truncate">
              {calculatedProfile.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Signature stamp mock layout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 text-[10px] font-mono text-slate-500 max-w-2xl mx-auto border-t border-slate-800/80">
          <div>
            <p className="font-semibold text-slate-400">Sello Digital BVC</p>
            <p className="text-[9px] text-slate-600 truncate max-w-xs">{`HASH_${playerName.slice(0, 3).toUpperCase()}_${stats.finalBalance}`}</p>
          </div>
          <div className="text-center sm:text-right">
            <p className="font-semibold text-slate-400">Fecha del Reporte</p>
            <p className="text-slate-600">Simulador en Vivo</p>
          </div>
        </div>
      </motion.div>

      {/* 10-YEAR ANNUAL RETROSPECTIVE LOGS TIMELINE */}
      {stats.simulationLogs && stats.simulationLogs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 text-left space-y-4"
        >
          <div className="flex items-center gap-2 pb-2.5 border-b border-slate-800">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h3 className="font-display font-medium text-white text-base">
              Retrospectiva de tu Portafolio Decenal (Año por Año)
            </h3>
          </div>
          <p className="text-xs text-slate-400 leading-normal mb-4">
            Repasa exactamente cómo reaccionó tu patrimonio ante cada ciclo macroeconómico de Colombia:
          </p>
          <div className="space-y-4 pt-2">
            {stats.simulationLogs.map((log) => (
              <div key={log.year} className="flex gap-4 items-start pl-2">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-slate-950 border border-emerald-500/35 flex items-center justify-center font-mono text-[9px] font-black text-emerald-400 shrink-0">
                    A{log.year}
                  </div>
                  {log.year < 10 && <div className="w-0.5 h-10 bg-slate-800/80" />}
                </div>
                <div className="flex-1 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/75 space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-[11px] font-mono text-emerald-400 font-extrabold uppercase tracking-wide">
                      Año {log.year} - Evento de Mercado
                    </span>
                    <div className="flex gap-2">
                      <span className="text-[10px] font-mono font-bold text-slate-300">
                        Saldo: ${log.balance.toLocaleString('es-CO')} COP
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-1.5 rounded ${log.performance.startsWith('-') ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-450 text-emerald-400 border border-emerald-500/20'}`}>
                        {log.performance}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-300 leading-relaxed font-sans mt-0.5">
                    {log.news}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* COMPANION UTILITY ACTIONS BAR */}
      <div className="flex justify-center gap-3 mt-6 print:hidden">
        <button
          onClick={onRestart}
          className="py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs uppercase cursor-pointer flex items-center gap-1 shadow transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Re-jugar Simulador
        </button>
      </div>

      {/* EDUCATIONAL KNOWLEDGE CENTER BASE (GLOSSARY) */}
      <div className="mt-12 space-y-4 text-left print:hidden">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          <h3 className="font-display font-bold text-white text-base">
            Glosario interactivo del Inversionista BVC
          </h3>
        </div>

        <p className="text-xs text-slate-400 leading-normal mb-6">
          ¿Deseas repasar los tecnicismos y figuras del mercado que dominarás en la vida real? Haz clic en cada uno para obtener el resumen directo teórico:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {glossary.map((g) => {
            const active = activeGlossaryTerm === g.term;

            return (
              <div
                key={g.term}
                onClick={() => setActiveGlossaryTerm(active ? null : g.term)}
                className="cursor-pointer p-3 rounded-xl border border-slate-800 hover:border-slate-705 bg-slate-900/40 hover:bg-slate-900 transition-all space-y-2 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-xs text-white">{g.term}</span>
                  {active ? (
                    <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </div>

                <AnimatePresence>
                  {active && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="text-[11px] text-slate-300 leading-relaxed font-sans mt-2 pt-2 border-t border-slate-800/80"
                    >
                      {g.def}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
