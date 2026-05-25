/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Coins, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

interface IntroScreenProps {
  onStart: (name: string) => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, dinos tu nombre para personalizar tu simulación.');
      return;
    }
    onStart(name.trim());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl p-8 rounded-2xl glass-panel relative overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>

        <div className="flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center justify-center p-3 rounded-xl bg-emerald-500/10 text-emerald-400 gap-2 border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
            <Coins className="w-8 h-8 animate-bounce" />
            <span className="font-display font-semibold tracking-wider text-xs">EXPERIENCIA INMERSIVA</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            SIMULADOR FINANCIERO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Bolsa de Valores de Colombia
            </span>
          </h1>

          <p className="text-slate-300 antialiased text-base max-w-xl leading-relaxed">
            Bienvenido al centro financiero interactivo de Colombia. Vive el rol de un inversionista,
            gestionando capital, reaccionando a noticias reales, sorteando crisis y dominando el mercado bursátil inteligente.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-md mt-6 space-y-4">
            <div className="text-left">
              <label htmlFor="playerName" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                ¿Cómo te llamarás en el parqué de negociación?
              </label>
              <input
                id="playerName"
                type="text"
                placeholder="Escribe tu nombre de inversionista..."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all font-sans"
              />
              {error && <p className="text-red-400 text-xs mt-2 font-medium">{error}</p>}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-wide uppercase shadow-lg shadow-blue-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Iniciar mi carrera <Sparkles className="w-4 h-4" />
            </motion.button>
          </form>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-4 w-full pt-8 border-t border-white/10">
            <div className="flex flex-col items-center">
              <span className="font-mono text-emerald-400 text-lg font-bold">5M COP</span>
              <span className="text-xs text-slate-500">Capital Inicial</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-mono text-teal-400 text-lg font-bold">8 Escenas</span>
              <span className="text-xs text-slate-500">Desafíos Narrativos</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-mono text-blue-400 text-lg font-bold">10 Años</span>
              <span className="text-xs text-slate-500">Simulación Histórica</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
