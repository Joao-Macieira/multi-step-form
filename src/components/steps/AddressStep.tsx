import { Button } from '../Button';
import { StepperPreviousButton } from '../Stepper';

export function AddressStep() {
  return (
    <div>
      <h1>Address step</h1>

      <StepperPreviousButton />

      <Button type="submit" size="sm">
        Finalizar
      </Button>
    </div>
  );
}
