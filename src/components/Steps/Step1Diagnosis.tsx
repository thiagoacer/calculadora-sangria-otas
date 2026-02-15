import React, { ChangeEvent } from 'react';
import { useWizard } from '@/components/Wizard/WizardContext';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';

const Step1Diagnosis = () => {
  const { data, updateData, nextStep } = useWizard();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Allow empty string or numbers
    if (value === '' || !isNaN(Number(value))) {
      updateData({ [name]: value });
    }
  };

  const isValid =
    data.monthlyRevenue && data.otaPercentage && data.commissionRate;

  const handleNext = () => {
    if (isValid) nextStep();
  };

  return (
    <div className="bg-white rounded-2xl p-10 shadow-xl border border-slate-200 animate-fadeIn transition-transform">
      <h2 className="text-2xl font-bold text-primary mb-4">Diagnóstico Rápido</h2>
      <p className="text-text-light mb-8">
        Vamos entender o tamanho da sua dependência atual.
      </p>

      <Input
        label="Faturamento Mensal Bruto"
        name="monthlyRevenue"
        value={data.monthlyRevenue}
        onChange={handleChange}
        placeholder="0,00"
        prefix="R$"
        type="number"
      />

      <Input
        label="% do Faturamento via OTAs"
        name="otaPercentage"
        value={data.otaPercentage}
        onChange={handleChange}
        placeholder="0"
        suffix="%"
        type="number"
      />

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-text">
          Comissão Média das OTAs: {data.commissionRate}%
        </label>
        <input
          type="range"
          min="10"
          max="30"
          step="0.5"
          name="commissionRate"
          value={data.commissionRate}
          onChange={(e) => updateData({ commissionRate: e.target.value })}
          className="w-full cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-text-light mt-1">
          <span>10%</span>
          <span>20%</span>
          <span>30%</span>
        </div>
      </div>

      <Button
        onClick={handleNext}
        disabled={!isValid}
        className={!isValid ? 'opacity-50' : ''}
      >
        Calcular minha sangria
      </Button>
    </div>
  );
};

export default Step1Diagnosis;
