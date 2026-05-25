/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HistoricalAsset, StockTicker, MarketEvent } from './types';

export const HISTORICAL_ASSETS: HistoricalAsset[] = [
  {
    id: 'bogota',
    name: 'Banco de Bogotá',
    symbol: 'BOGOTA',
    description: 'Acciones de una de las instituciones financieras líderes del país.',
    price2001: 1732,
    priceCurrent: 35940,
    ratioMultiplier: 20.75,
    fact: '¡Un crecimiento espectacular de más del 1,970%! Mientras el país pasaba por grandes cambios, la solidez del Banco de Bogotá recompensó fuertemente a sus accionistas de largo plazo.'
  },
  {
    id: 'ecopetrol',
    name: 'Ecopetrol S.A.',
    symbol: 'ECOPETROL',
    description: 'La gran joya de energía del Estado colombiano.',
    price2001: 1700,
    priceCurrent: 2800,
    ratioMultiplier: 1.65,
    fact: 'Ecopetrol S.A. cotiza de forma robusta. Ajustado al precio base de $1.700 en su emisión a hoy a $2.800 COP, representa la acción más líquida y democrática del mercado colombiano.'
  },
  {
    id: 'tes',
    name: 'TES (Bonos de la Nación)',
    symbol: 'TES_COLOMBIA',
    description: 'Títulos de Deuda Pública emitidos por el Ministerio de Hacienda.',
    price2001: 1000000,
    priceCurrent: 4920000,
    ratioMultiplier: 4.92,
    fact: 'Rendimiento moderado, seguro e inmune a las quiebras corporativas. Respaldado por el pago de impuestos de todos los colombianos.'
  },
  {
    id: 'efectivo',
    name: 'Dinero bajo el colchón (Efectivo)',
    symbol: 'COP_CASH',
    description: 'Guardar billetes de pesos físicos en una caja fuerte o colchón.',
    price2001: 1000000,
    priceCurrent: 280000, // Implied purchasing power
    ratioMultiplier: 0.28,
    fact: '¡La temible INFLACIÓN! Un millón de pesos de 2001 hoy equivale apenas a $280.000 de poder de compra. El dinero estático se derrite por la constante pérdida de valor adquisitivo.'
  }
];

export const INITIAL_STOCKS: StockTicker[] = [
  {
    symbol: 'ECOPETROL',
    name: 'Ecopetrol (Petróleo y Energía)',
    price: 2250,
    prevPrice: 2250,
    history: [2210, 2230, 2220, 2240, 2250],
    color: '#10b981' // Green
  },
  {
    symbol: 'BCOLOMBIA',
    name: 'Bancolombia (Sector Financiero)',
    price: 34800,
    prevPrice: 34800,
    history: [35100, 34900, 34600, 34700, 34800],
    color: '#eab308' // Yellow/Gold
  },
  {
    symbol: 'PF_AVAL',
    name: 'Grupo Aval Preferencial',
    price: 490,
    prevPrice: 490,
    history: [495, 492, 488, 489, 490],
    color: '#06b6d4' // Cyan
  },
  {
    symbol: 'GEB',
    name: 'Grupo Energía Bogotá (Servicios)',
    price: 2420,
    prevPrice: 2420,
    history: [2380, 2400, 2410, 2400, 2420],
    color: '#a855f7' // Purple
  },
  {
    symbol: 'NUTRESA',
    name: 'Grupo Nutresa (Consumo Masivo)',
    price: 46500,
    prevPrice: 46500,
    history: [46200, 46300, 46400, 46450, 46500],
    color: '#f97316' // Orange
  },
  {
    symbol: 'CEMARGOS',
    name: 'Cementos Argos (Construcción)',
    price: 6300,
    prevPrice: 6300,
    history: [6210, 6250, 6280, 6290, 6300],
    color: '#3b82f6' // Blue
  }
];

export const MARKET_EVENTS: MarketEvent[] = [
  {
    id: 'oil_boom',
    title: '¡Superciclo del Petróleo disparado!',
    description: 'Grandes recortes de producción global disparan el barril de Brent a $105 USD.',
    impactType: 'positive',
    impactText: 'ECOPETROL se dispara debido al aumento dramático en sus márgenes de utilidad.',
    affectedSymbols: ['ECOPETROL'],
    impactPct: 0.25
  },
  {
    id: 'banana_rate',
    title: 'Recorte de tasas del Banco de la República',
    description: 'La junta directiva reduce los tipos de interés en 100 puntos básicos para dinamizar la economía local.',
    impactType: 'positive',
    impactText: 'El sector financiero e hipotecario se acelera. Bancolombia y Grupo Aval suben.',
    affectedSymbols: ['BCOLOMBIA', 'PF_AVAL'],
    impactPct: 0.15
  },
  {
    id: 'global_panic',
    title: 'Pánico Financiero Global por Recesión',
    description: 'Las bolsas de Nueva York y Asia caen con fuerza ante temores de una contracción industrial.',
    impactType: 'negative',
    impactText: 'Efecto dominó: el índice COLCAP cae arrastrando la mayoría de las acciones de la BVC.',
    affectedSymbols: ['ECOPETROL', 'BCOLOMBIA', 'GEB', 'NUTRESA', 'CEMARGOS'],
    impactPct: -0.22
  },
  {
    id: 'infrastructure_push',
    title: 'Megaplan de Vías de Cuarta Generación (4G)',
    description: 'Gobierno colombiano acelera la adjudicación de billonarias concesiones viales en todo el territorio nacional.',
    impactType: 'positive',
    impactText: 'Cementos Argos reporta pedidos récord de concreto. La acción se dispara.',
    affectedSymbols: ['CEMARGOS'],
    impactPct: 0.30
  },
  {
    id: 'inflation_shock',
    title: 'Choque Inflacionario Global',
    description: 'El fenómeno del Niño perjudica las cosechas agrarias colombianas y dispara el precio de los alimentos.',
    impactType: 'negative',
    impactText: 'Aumento de tasas para controlar la inflación presiona acciones como Nutresa.',
    affectedSymbols: ['NUTRESA', 'BCOLOMBIA'],
    impactPct: -0.12
  }
];
