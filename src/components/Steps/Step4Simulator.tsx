import React, { useState, useEffect, ChangeEvent } from 'react';
import { useWizard } from '@/components/Wizard/WizardContext';
import Button from '@/components/UI/Button';
import { formatCurrency } from '@/utils/formatting';
import { simulateConversion, SimulationResult } from '@/utils/calculations';

const Step4Simulator = () => {
  const { results, nextStep, data } = useWizard();
  const [conversionRate, setConversionRate] = useState<number>(20);
  const [simulation, setSimulation] = useState<SimulationResult | null>(null);

  useEffect(() => {
    if (results) {
      const sim = simulateConversion(
        results,
        conversionRate,
        data.directCac
      );
      setSimulation(sim);
    }
  }, [results, conversionRate]);

  if (!results || !simulation) return <div>Carregando simulação...</div>;

  return (
    <div className="bg-white rounded-2xl p-10 shadow-xl border border-slate-200 animate-fadeIn transition-transform">
      <h2 className="text-2xl font-bold text-primary mb-2 text-center">Simulador de Conversão</h2>
      <p className="text-text-light mb-8 text-center text-sm">
        Veja o impacto no seu caixa se você trouxesse parte dessas reservas para o direto.
      </p>

      <div className="mb-8 p-6 bg-secondary/10 rounded-xl border border-secondary/20">
        <label className="block font-semibold mb-4 text-text text-center text-lg">
          Cenário: Converter <span className="text-primary text-2xl">{conversionRate}%</span> das vendas OTA
        </label>
        <input
          type="range"
          min="10"
          max="30"
          step="10"
          value={conversionRate}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setConversionRate(parseInt(e.target.value))
          }
          className="w-full cursor-pointer accent-primary mb-2"
        />
        <div className="flex justify-between text-xs text-text-light font-medium uppercase tracking-wider">
          <span>Conservador (10%)</span>
          <span>Moderado (20%)</span>
          <span>Otimista (30%)</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-md mb-8 ring-1 ring-green-500/10">
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-green-800/10">
            <span className="text-green-800 font-medium">Ganho Bruto (Comissão Evitada)</span>
            <span className="font-bold text-green-700 text-lg">
              +{formatCurrency(simulation.commissionSaved)}
            </span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-green-800/10">
            <span className="text-green-800/70 text-sm">(-) Custo Est. Aquisição Direta</span>
            <span className="text-green-800/70 text-sm">
              -{formatCurrency(simulation.directCost)}
            </span>
          </div>

          <div className="pt-2">
            <p className="text-center text-xs font-bold text-green-800 uppercase tracking-widest mb-1">
              PROJEÇÃO DE GANHO LÍQUIDO REAL
            </p>
            <p className="text-center text-4xl font-extrabold text-green-600 mb-1">
              {formatCurrency(simulation.netGain)}
              <span className="text-base font-normal text-green-800 ml-1">/mês</span>
            </p>
            <div className="text-center mt-2 inline-block bg-white/50 px-3 py-1 rounded-full text-green-800 text-sm font-medium border border-green-800/10 mx-auto w-full">
              💰 {formatCurrency(simulation.netGain * 12)} a mais no seu caixa em 1 ano
            </div>
          </div>
        </div>
      </div>

      <Button onClick={nextStep} variant="accent">
        Quero um plano para recuperar isso
      </Button>
    </div>
  );
};

export default Step4Simulator;
