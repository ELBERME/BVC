/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SceneId =
  | 'INTRO'
  | 'SCENE_1_ORIGIN'
  | 'SCENE_2_FUSION'
  | 'SCENE_3_ACTORS'
  | 'SCENE_4_INVESTMENT'
  | 'SCENE_5_HISTORIC'
  | 'SCENE_6_RISK_PERFIL'
  | 'SCENE_7_DIVERSIFICATION'
  | 'SCENE_8_DERIVATIVES'
  | 'SCENE_9_FINAL_PORTFOLIO'
  | 'SCENE_10_SUMMARY';

export interface PlayerState {
  cash: number;
  initialCash: number;
  // Portfolio holdings for Scene 4
  portfolioScene4: {
    cdt: number;      // Amount allocated
    tes: number;      // Amount allocated
    acciones: number; // Amount allocated
  };
  // Player choices & metrics
  decisions: {
    moneyChoice: 'gastar' | 'banco' | 'invertir' | null;
    actedDirectly: boolean; // Did they try to buy directly inside Scene 3?
    riskAction: 'vender' | 'mantener' | 'comprar' | null;
    hedgeDerivados: boolean | null; // true = bought hedge, false = didn't do hedge
  };
  riskProfile: 'conservador' | 'moderado' | 'agresivo' | null;
  name: string;
}

export interface StockTicker {
  symbol: string;
  name: string;
  price: number;
  prevPrice: number;
  history: number[];
  color: string;
}

export interface MarketEvent {
  id: string;
  title: string;
  description: string;
  impactType: 'positive' | 'negative' | 'neutral';
  impactText: string;
  affectedSymbols: string[]; // e.g., ["ECOPETROL", "BCOLOMBIA"]
  impactPct: number; // range -0.30 to +0.30
}

export interface HistoricalAsset {
  id: string;
  name: string;
  symbol: string;
  description: string;
  price2001: number;
  priceCurrent: number;
  ratioMultiplier: number;
  fact: string;
}
