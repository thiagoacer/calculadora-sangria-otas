import { describe, it, expect } from 'vitest';
import { calculateBleed, simulateConversion } from './calculations';

describe('Calculations Logic', () => {
  describe('calculateBleed', () => {
    it('should calculate OTA revenue and commissions correctly', () => {
      const inputs = {
        monthlyRevenue: 100000,
        otaPercentage: 50,
        commissionRate: 20,
        adr: 500,
      };

      const result = calculateBleed(inputs);

      expect(result.monthlyRevenue).toBe(100000);
      expect(result.otaRevenue).toBe(50000); // 50% of 100k
      expect(result.monthlyCommission).toBe(10000); // 20% of 50k
      expect(result.annualCommission).toBe(120000); // 10k * 12
      expect(result.dependencyScore).toBe('Média'); // 40-70%
      expect(result.lostDailyRates).toBe(20); // 10000 / 500
    });

    it('should handle zero values gracefully', () => {
      const inputs = {
        monthlyRevenue: 0,
        otaPercentage: 0,
        commissionRate: 0,
        adr: 0,
      };

      const result = calculateBleed(inputs);

      expect(result.otaRevenue).toBe(0);
      expect(result.monthlyCommission).toBe(0);
      expect(result.lostDailyRates).toBe(0);
    });
  });

  describe('simulateConversion', () => {
    it('should calculate net gain correctly', () => {
      const currentStats = {
        otaRevenue: 50000,
        commissionRate: 20,
      };
      // Converting 10% of 50k = 5k revenue
      // Commission saved: 20% of 5k = 1000
      // Direct Cost: 8% of 5k = 400
      // Net Gain: 1000 - 400 = 600

      const result = simulateConversion(currentStats, 10, 8);

      expect(result.convertedRevenue).toBe(5000);
      expect(result.commissionSaved).toBe(1000);
      expect(result.directCost).toBe(400);
      expect(result.netGain).toBe(600);
    });
  });
});
