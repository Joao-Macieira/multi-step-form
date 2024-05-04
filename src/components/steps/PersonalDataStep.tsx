import { StepHeader } from '../StepHeader';
import {
  StepperFooter,
  StepperNextButton,
  StepperPreviousButton,
} from '../Stepper';

export function PersonalDataStep() {
  return (
    <div>
      <StepHeader
        title="Dados pessoais"
        description="Conte-nos mais sobre você"
      />

      <StepperFooter>
        <StepperPreviousButton />
        <StepperNextButton />
      </StepperFooter>
    </div>
  );
}
