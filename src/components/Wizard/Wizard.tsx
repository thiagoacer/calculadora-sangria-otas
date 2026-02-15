import React from 'react';
import { WizardProvider, useWizard } from './WizardContext';
import Step1Diagnosis from '@/components/Steps/Step1Diagnosis';
import Step2Adjustments from '@/components/Steps/Step2Adjustments';
import Step3Results from '@/components/Steps/Step3Results';
import Step4Simulator from '@/components/Steps/Step4Simulator';
import Step5CallToAction from '@/components/Steps/Step5CallToAction';

const WizardContent = () => {
  const { step } = useWizard();

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Diagnosis />;
      case 2:
        return <Step2Adjustments />;
      case 3:
        return <Step3Results />;
      case 4:
        return <Step4Simulator />;
      case 5:
        return <Step5CallToAction />;
      default:
        return <Step1Diagnosis />;
    }
  };

  return <div>{renderStep()}</div>;
};

const Wizard = () => {
  return (
    <WizardProvider>
      <div className="min-h-screen flex flex-col justify-center max-w-2xl mx-auto px-4 py-8">
        <WizardContent />
      </div>
    </WizardProvider>
  );
};

export default Wizard;
