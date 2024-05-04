import { Button } from '../Button';
import { StepHeader } from '../StepHeader';
import { StepperFooter, StepperPreviousButton } from '../Stepper';

export function AddressStep() {
  return (
    <div>
      <StepHeader title="Endereço" description="De onde você é" />

      <StepperFooter>
        <StepperPreviousButton />
        <Button type="submit" size="sm">
          Finalizar
        </Button>
      </StepperFooter>
    </div>
  );
}
