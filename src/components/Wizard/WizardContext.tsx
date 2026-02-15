import React, { createContext, useState, useContext, ReactNode } from 'react';
import { calculateBleed, BleedResult } from '@/utils/calculations';

export interface WizardData {
  monthlyRevenue: string | number;
  otaPercentage: string | number;
  commissionRate: string | number;
  adr: string | number;
  directCac: string | number;
  email: string;
  name: string;
  whatsapp: string;
  hotelName: string;
}

interface WizardContextType {
  step: number;
  data: WizardData;
  results: BleedResult | null;
  updateData: (newData: Partial<WizardData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  calculate: () => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<WizardData>({
    monthlyRevenue: '',
    otaPercentage: 50,
    commissionRate: 18,
    adr: '',
    directCac: 8,
    email: '',
    name: '',
    whatsapp: '',
    hotelName: '',
  });

  const [results, setResults] = useState<BleedResult | null>(null);

  const updateData = (newData: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const goToStep = (s: number) => setStep(s);

  const calculate = () => {
    const res = calculateBleed(data);
    setResults(res);
  };

  return (
    <WizardContext.Provider
      value={{
        step,
        data,
        results,
        updateData,
        nextStep,
        prevStep,
        goToStep,
        calculate,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = (): WizardContextType => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};
