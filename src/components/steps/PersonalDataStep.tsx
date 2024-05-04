import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Input } from '../Input';
import { Label } from '../Label';
import { StepHeader } from '../StepHeader';
import {
  StepperFooter,
  StepperNextButton,
  StepperPreviousButton,
} from '../Stepper';
import { useStepper } from '../Stepper/useStepper';

const schema = z.object({
  firstName: z.string().min(1, 'Informe seu primeiro nome'),
  lastName: z.string().min(1, 'Informe o seu sobrenome'),
  document: z.string().min(1, 'Informe o seu CPF'),
});

type FormData = z.infer<typeof schema>;

export function PersonalDataStep() {
  const { nextStep } = useStepper();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log(data);
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    nextStep();
  });

  return (
    <form onSubmit={handleSubmit}>
      <StepHeader
        title="Dados pessoais"
        description="Conte-nos mais sobre você"
      />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Primeiro nome</Label>
          <Input id="firstName" {...form.register('firstName')} />
          {form.formState.errors.firstName?.message && (
            <small className="text-destructive">
              {form.formState.errors.firstName?.message}
            </small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Sobrenome</Label>
          <Input id="lastName" {...form.register('lastName')} />
          {form.formState.errors.lastName?.message && (
            <small className="text-destructive">
              {form.formState.errors.lastName?.message}
            </small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="document">CPF</Label>
          <Input id="document" {...form.register('document')} />
          {form.formState.errors.document?.message && (
            <small className="text-destructive">
              {form.formState.errors.document?.message}
            </small>
          )}
        </div>
      </div>

      <StepperFooter>
        <StepperPreviousButton disabled={form.formState.isSubmitting} />
        <StepperNextButton
          type="submit"
          preventDefault
          disabled={form.formState.isSubmitting}
        />
      </StepperFooter>
    </form>
  );
}
