import React, { useEffect } from 'react';
import { useWizard } from '@/components/Wizard/WizardContext';
import Button from '@/components/UI/Button';
import { formatCurrency } from '@/utils/formatting';

const Step3Results = () => {
  const { results, nextStep, calculate } = useWizard();

  // If results are missing (e.g. dev reload), try to recalculate
  useEffect(() => {
    if (!results) {
      calculate();
    }
  }, [results, calculate]);

  if (!results) return <div>Calculando...</div>;

  const {
    monthlyCommission,
    annualCommission,
    lostDailyRates,
    dependencyScore,
  } = results;

  const scoreColor =
    {
      Baixa: 'var(--color-accent)',
      Média: '#F59E0B', // Amber
      Alta: 'var(--color-alert)',
    }[dependencyScore] || 'var(--color-text)';

  return (
    <div className="bg-white rounded-2xl p-10 shadow-xl border border-slate-200 animate-fadeIn transition-transform">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">
        O Custo da Sua Dependência
      </h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-8">
        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-alert">
          <p className="text-sm text-text-light font-medium">Comissão Mensal Paga</p>
          <p className="text-2xl font-bold text-alert">
            {formatCurrency(monthlyCommission)}
          </p>
        </div>

        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-alert/60">
          <p className="text-sm text-text-light font-medium">Comissão Anual (Projeção)</p>
          <p className="text-2xl font-bold text-alert/80">
            {formatCurrency(annualCommission)}
          </p>
        </div>
      </div>

      {lostDailyRates > 0 && (
        <div className="mb-8 text-center p-6 bg-secondary/10 rounded-xl border border-secondary/20">
          <span className="text-4xl block mb-2">📉</span>
          <p className="font-medium text-text">
            Você perde o equivalente a{' '}
            <span className="text-alert font-bold">{lostDailyRates} diárias</span>{' '}
            todo mês só para pagar comissão.
          </p>
        </div>
      )}

      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-wider text-text-light font-bold mb-1">
          Score de Dependência OTA
        </p>
        <div className="inline-block px-4 py-1 rounded-full text-white font-bold text-xl" style={{ backgroundColor: scoreColor }}>
          {dependencyScore}
        </div>
      </div>

      <Button onClick={nextStep} variant="accent">Simular Economia</Button>
    </div>
  );
};

export default Step3Results;
