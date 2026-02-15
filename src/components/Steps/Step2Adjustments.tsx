import React, { ChangeEvent } from 'react';
import { useWizard } from '@/components/Wizard/WizardContext';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';

const Step2Adjustments = () => {
  const { data, updateData, nextStep, calculate } = useWizard();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  const handleCalculate = () => {
    calculate(); // Run calculations before moving to results
    nextStep();
  };

  return (
    <div className="bg-white rounded-2xl p-10 shadow-xl border border-slate-200 animate-fadeIn transition-transform">
      <h2 className="text-2xl font-bold text-primary mb-2 text-center">Ajustes Estratégicos</h2>
      <p className="text-text-light mb-8 text-center bg-secondary/20 p-2 rounded-md font-medium text-sm inline-block mx-auto w-full">
        (Opcional) Refine os dados para um resultado mais preciso.
      </p>

      <Input
        label="Valor Médio da Diária (ADR)"
        name="adr"
        value={data.adr}
        onChange={handleChange}
        placeholder="0,00"
        prefix="R$"
        type="number"
      />

      <Input
        label="Custo Estimado de Aquisição Direta"
        name="directCac"
        value={data.directCac}
        onChange={handleChange}
        placeholder="8"
        suffix="%"
        type="number"
      />
      <p className="text-xs text-text-light -mt-4 mb-6 italic">
        *Média de mercado para venda direta (marketing + motor + taxas) gira em
        torno de 5-8%.
      </p>

      <Button onClick={handleCalculate} variant="primary">Gerar Diagnóstico</Button>

      <button
        onClick={handleCalculate}
        className="mt-4 w-full bg-transparent border-none text-text-light underline cursor-pointer hover:text-primary transition-colors text-sm"
      >
        Pular etapa (Usar padrão de mercado)
      </button>
    </div>
  );
};

export default Step2Adjustments;
