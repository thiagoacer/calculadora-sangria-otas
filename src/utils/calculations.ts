/**
 * Calculates the OTA commission costs and current situation.
 */
export interface BleedInput {
  monthlyRevenue: string | number;
  otaPercentage: string | number;
  commissionRate: string | number;
  adr?: string | number;
}

export interface BleedResult {
  monthlyRevenue: number;
  otaRevenue: number;
  monthlyCommission: number;
  annualCommission: number;
  dependencyScore: string;
  lostDailyRates: number;
  commissionRate: number;
  otaPercentage: number;
}

export const calculateBleed = ({
  monthlyRevenue,
  otaPercentage,
  commissionRate,
  adr = 0,
}: BleedInput): BleedResult => {
  // Parsing inputs to ensure they are numbers
  const rev = parseFloat(String(monthlyRevenue)) || 0;
  const otaPwd = parseFloat(String(otaPercentage)) || 0;
  const commRate = parseFloat(String(commissionRate)) || 0;
  const avgDailyRate = parseFloat(String(adr)) || 0;

  // 1. Receita OTA = Faturamento × % OTA
  const otaRevenue = rev * (otaPwd / 100);

  // 2. Comissão paga = Receita OTA × % Comissão
  const monthlyCommission = otaRevenue * (commRate / 100);
  const annualCommission = monthlyCommission * 12;

  // Dependency Score
  let dependencyScore = 'Baixa';
  if (otaPwd >= 40 && otaPwd <= 70) dependencyScore = 'Média';
  if (otaPwd > 70) dependencyScore = 'Alta';

  // Lost Daily Rates Equivalent
  let lostDailyRates = 0;
  if (avgDailyRate > 0) {
    lostDailyRates = Math.round(monthlyCommission / avgDailyRate);
  }

  return {
    monthlyRevenue: rev,
    otaRevenue,
    monthlyCommission,
    annualCommission,
    dependencyScore,
    lostDailyRates,
    commissionRate: commRate, // Returned for simulation use
    otaPercentage: otaPwd,
  };
};

/**
 * Simulates savings based on converting a percentage of OTA bookings to direct bookings.
 *
 * @param {Object} currentStats - The result from calculateBleed (must include otaRevenue and commissionRate).
 * @param {number} conversionRate - Percentage of OTA revenue to convert (e.g., 10, 20, 30).
 * @param {number} directCac - Estimated Cost of Acquisition for direct bookings (default 8%).
 * @returns {Object} Simulation results.
 */
export interface SimulationResult {
  convertedRevenue: number;
  commissionSaved: number;
  directCost: number;
  netGain: number;
  conversionRate: number;
}

export const simulateConversion = (
  currentStats: { otaRevenue: number; commissionRate: number },
  conversionRate: string | number,
  directCac: string | number = 8
): SimulationResult => {
  const { otaRevenue, commissionRate } = currentStats;
  const convRate = parseFloat(String(conversionRate)) || 0;
  const cac = parseFloat(String(directCac)) || 8;

  // 3. Receita potencial convertida = Receita OTA × % conversão simulada
  const convertedRevenue = otaRevenue * (convRate / 100);

  // Commission that would have been paid on this revenue
  const commissionSaved = convertedRevenue * (commissionRate / 100);

  // 4. Custo direto = Receita convertida × CAC direto
  const directCost = convertedRevenue * (cac / 100);

  // 5. Ganho líquido = Comissão evitada − Custo direto
  const netGain = commissionSaved - directCost;

  return {
    convertedRevenue,
    commissionSaved,
    directCost,
    netGain,
    conversionRate: convRate,
  };
};
