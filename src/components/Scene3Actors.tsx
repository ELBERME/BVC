/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, ArrowRight, UserCheck, Landmark, ShieldCheck, Briefcase, HelpCircle, AlertCircle } from 'lucide-react';

interface Scene3ActorsProps {
  onNext: (triedDirectly: boolean) => void;
  playerName: string;
}

export default function Scene3Actors({ onNext, playerName }: Scene3ActorsProps) {
  const [triedDirect, setTriedDirect] = useState(false);
  const [attemptState, setAttemptState] = useState<'idle' | 'rejected' | 'resolved'>('idle');
  const [visitedActors, setVisitedActors] = useState<string[]>([]);
  const [selectedActor, setSelectedActor] = useState<string | null>(null);
  const detailsRef = React.useRef<HTMLDivElement>(null);

  const actors = [
    {
      id: 'inversionista',
      name: 'El Inversionista (Tú)',
      role: 'Socio o acreedor del mercado',
      emoji: '🧑‍💻',
      description: 'Cualquier persona natural o jurídica en Colombia que tiene un excedente de ahorros y busca rentabilizarlo, asumiendo una porción controlada de riesgo acorde a su perfil.',
      actionFact: 'Aportas el combustible que impulsa a las empresas a expandirse y crear empleos.'
    },
    {
      id: 'emisor',
      name: 'El Emisor',
      role: 'Buscando financiamiento',
      emoji: '🏭',
      description: 'Empresas privadas, mixtas o el propio Gobierno Nacional. En lugar de pedir préstamos caros al banco tradicional, emiten títulos de valor (acciones o bonos de deuda) en la BVC para financiar macroproyectos.',
      actionFact: 'Ecopetrol, Bancolombia, ISA o la República de Colombia actúan como emisores recurrentes.'
    },
    {
      id: 'scb',
      name: 'Sociedad Comisionista de Bolsa',
      role: 'Los únicos intermediarios autorizados',
      emoji: '👔',
      description: 'También llamadas comisionistas o SCB. Son entidades financieras reguladas y vigiladas de cerca por la Superintendencia Financiera de Colombia. Son las únicas acreditadas para comprar y vender en el sistema central de la BVC.',
      actionFact: 'Conectas tu app de inversión digital a su plataforma; ellos ejecutan tu orden de compra en la rueda bursátil.'
    },
    {
      id: 'deceval',
      name: 'DECEVAL (Depósito Centralizado)',
      role: 'El guardián digital',
      emoji: '🛡️',
      description: 'El Depósito Centralizado de Valores de Colombia de administración privada. En lugar de imprimir títulos en papeles físicos vulnerables, DECEVAL registra y custodia digitalmente con seguridad cibernética cada una de tus acciones.',
      actionFact: 'Garantiza con absoluta fidelidad y legalidad electrónica que la acción X te pertenece.'
    }
  ];

  const handleActorClick = (id: string) => {
    setSelectedActor(id);
    if (!visitedActors.includes(id)) {
      setVisitedActors((prev) => [...prev, id]);
    }
    // Smoothly scroll the screen to the details section on mobile devices
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 120);
  };

  const triggerDirectAttempt = () => {
    setTriedDirect(true);
    setAttemptState('rejected');
  };

  const resolveWithSCB = () => {
    setAttemptState('resolved');
  };

  const allVisited = visitedActors.length === 4;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-8"
      >
        <span className="text-xs font-mono px-3 py-1 bg-slate-800 text-slate-400 rounded-full uppercase border border-slate-700/60">
          Escena 3: Los Actores del Mercado
        </span>
        <h2 className="text-3xl font-extrabold font-display text-white mt-3">
          ¿Cómo adquieres una porción de las empresas?
        </h2>
        <p className="text-slate-400 mt-2 max-w-2xl mx-auto text-sm leading-relaxed">
          No puedes golpear la puerta de un emisor y canjear tus billetes directamente. Entiende la red de actores legales que operan detrás de cada clic en la bolsa.
        </p>
      </motion.div>

      {/* STAGE A: DIRECT ATTEMPT DRAMA */}
      <AnimatePresence mode="wait">
        {attemptState === 'idle' && (
          <motion.div
            key="direct-attempt"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="p-8 rounded-2xl glass-panel text-center max-w-2xl mx-auto space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto animate-pulse">
              <Briefcase className="w-8 h-8" />
            </div>
            
            <h3 className="font-display font-bold text-lg text-white">Haz tu primer intento comercial</h3>
            <p className="text-xs text-slate-300 antialiased leading-relaxed">
              Deseas invertir tus $5.000.000 COP iniciales comprando directamente 2.000 acciones de la petrolera estatal de la nación (Ecopetrol). Presiona el botón para canalizar tu compra en este momento.
            </p>

            <button
              onClick={triggerDirectAttempt}
              className="py-3 px-6 bg-slate-100 hover:bg-white text-slate-950 font-bold rounded-xl text-xs uppercase cursor-pointer tracking-wider flex items-center gap-2 mx-auto transition-all"
            >
              Comprar directamente a Ecopetrol
            </button>
          </motion.div>
        )}

        {attemptState === 'rejected' && (
          <motion.div
            key="rejected-attempt"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 rounded-2xl border border-red-500/30 bg-red-950/20 max-w-2xl mx-auto space-y-6"
          >
            <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 max-w-max mx-auto">
              <ShieldAlert className="w-6 h-6 animate-bounce" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">Operación Bloqueada por Regulación</span>
            </div>

            <div className="text-center space-y-2">
              <h4 className="font-display font-black text-white text-xl">¿Qué acaba de ocurrir?</h4>
              <p className="text-xs text-slate-300 leading-relaxed antialiased">
                <strong>No tienes autorización legal para comprar directamente.</strong> Las normas del mercado de valores de Colombia señalan que un inversionista del público común no puede ingresar de manera autónoma en la mesa de contratación bursátil, ni depositar activos físicos manuales.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs text-slate-400">
              <p className="font-semibold text-slate-300 mb-1">💡 La regla de oro colombiana:</p>
              Para negociar debes apoyarte en un intermediario financiero habilitado e inscrito. Descubramos quiénes son los reguladores legales obligatorios.
            </div>

            <button
              onClick={resolveWithSCB}
              className="py-2.5 px-5 bg-red-500 hover:bg-red-400 text-slate-950 font-extrabold rounded-lg text-xs uppercase cursor-pointer tracking-wider flex items-center gap-1.5 mx-auto transition-all shadow-md"
            >
              Habilitar intermediario legal <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </button>
          </motion.div>
        )}

        {attemptState === 'resolved' && (
          <motion.div
            key="terminal-unlocked"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Terminal Top Alert */}
            <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-[11px] text-slate-300 font-sans text-left leading-normal">
                <strong>Terminal del Inversionista Desbloqueada:</strong> Se ha canalizado el tráfico legal a través de la Bolsa. Para comprender la estructura operativa, haz clic y visita las <strong className="text-emerald-400">4 figuras del engranaje financiero colombiano</strong>.
              </p>
              <div className="ml-auto font-mono text-[9px] text-emerald-400 whitespace-nowrap bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                PROGRESO: {visitedActors.length}/4
              </div>
            </div>

            {/* Grid of Actors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {actors.map((item) => {
                const visited = visitedActors.includes(item.id);
                const active = selectedActor === item.id;

                return (
                  <motion.div
                    key={item.id}
                    onClick={() => handleActorClick(item.id)}
                    whileHover={{ scale: 1.02 }}
                    className={`cursor-pointer rounded-xl p-4 transition-all border flex flex-col justify-between h-44 ${
                      active
                        ? 'bg-slate-900 border-emerald-400 shadow-md shadow-emerald-500/5'
                        : visited
                        ? 'bg-slate-900/60 border-slate-700/80 hover:border-slate-600'
                        : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{item.emoji}</span>
                        {visited && (
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.2 rounded font-bold">
                            CONOCIDO
                          </span>
                        )}
                      </div>
                      <h4 className="font-display font-semibold text-xs text-white mt-3 truncate">{item.name}</h4>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{item.role}</p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 font-sans tracking-wide mt-2 block text-left">
                      {active ? 'Leyendo detalles...' : 'Click para examinar'}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Detail Area with Smooth Expansion */}
            <AnimatePresence mode="wait">
              {selectedActor && (
                <motion.div
                  ref={detailsRef}
                  key={selectedActor}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-left scroll-mt-6"
                >
                  {(() => {
                    const actorData = actors.find((a) => a.id === selectedActor);
                    return actorData ? (
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="md:col-span-8 space-y-2">
                          <h4 className="font-display font-bold text-white text-base flex items-center gap-2">
                            <span>{actorData.emoji}</span>
                            <span>{actorData.name}</span>
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {actorData.description}
                          </p>
                        </div>
                        <div className="md:col-span-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                          <span className="text-[9px] uppercase tracking-wider font-mono text-emerald-400 block font-bold mb-1">Efecto en la práctica</span>
                          <p className="text-[10px] text-slate-400 italic font-sans leading-normal">
                            "{actorData.actionFact}"
                          </p>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Advance Prompt */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[11px] text-slate-500">
                {allVisited 
                  ? '✓ ¡Has examinado los 4 pilares financieros del país!' 
                  : '⚠️ Por favor, examina cada una de las 4 pestañas para comprender la intermediación legal antes de emprender tu inversión.'}
              </span>

              <button
                onClick={() => onNext(triedDirect)}
                disabled={!allVisited}
                className={`py-3 px-6 rounded-lg text-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                  allVisited 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 focus:ring-2 focus:ring-emerald-500/40 font-extrabold shadow-md' 
                    : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed'
                }`}
              >
                Ingresar al Parqué de Renta <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
