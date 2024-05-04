/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/require-default-props */
import React, { createContext, useCallback, useContext, useState } from 'react';

import { cn } from '@/lib/utils';

import { Button } from './Button';

interface IStepperContextValue {
  previousStep: () => void;
  nextStep: () => void;
}

const StepperContext = createContext<IStepperContextValue>(
  {} as IStepperContextValue,
);

interface IStepperProps {
  initialStep?: number;
  steps: {
    label: string;
    content: React.ReactNode;
  }[];
}

export function Stepper({ steps, initialStep = 0 }: IStepperProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const previousStep = useCallback(() => {
    setCurrentStep((prevState) => Math.max(0, prevState - 1));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prevState) => Math.min(steps.length - 1, prevState + 1));
  }, [steps]);

  return (
    <StepperContext.Provider
      value={{
        previousStep,
        nextStep,
      }}
    >
      <div>
        <ul className="space-x-6">
          {steps.map((step, index) => (
            <li
              key={step.label}
              className={cn(
                'inline-block rounded-md px-2 py-1 text-xs',
                index === currentStep && 'bg-primary text-primary-foreground',
              )}
            >
              {String(index + 1).padStart(2, '0')}. {step.label}
            </li>
          ))}
        </ul>

        <div className="mt-10">{steps[currentStep].content}</div>
      </div>
    </StepperContext.Provider>
  );
}

export function StepperFooter({ children }: { children: React.ReactNode }) {
  return <footer className="mt-6 flex justify-end gap-2">{children}</footer>;
}

export function StepperPreviousButton() {
  const { previousStep } = useContext(StepperContext);
  return (
    <Button type="button" variant="secondary" size="sm" onClick={previousStep}>
      Anterior
    </Button>
  );
}

export function StepperNextButton() {
  const { nextStep } = useContext(StepperContext);
  return (
    <Button type="button" size="sm" onClick={nextStep}>
      Próximo
    </Button>
  );
}
