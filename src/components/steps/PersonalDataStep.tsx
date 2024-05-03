import { StepperNextButton, StepperPreviousButton } from '../Stepper';

export function PersonalDataStep() {
  return (
    <div>
      <h1>Personal data step</h1>

      <StepperPreviousButton />
      <StepperNextButton />
    </div>
  );
}
