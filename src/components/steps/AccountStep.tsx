import { StepHeader } from '../StepHeader';
import { StepperFooter, StepperNextButton } from '../Stepper';

export function AccountStep() {
  return (
    <div>
      <StepHeader
        title="Conta"
        description="Seus dados de acesso à plataforma"
      />

      <StepperFooter>
        <StepperNextButton />
      </StepperFooter>
    </div>
  );
}
