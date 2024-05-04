import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../Button';
import { Input } from '../Input';
import { Label } from '../Label';
import { StepHeader } from '../StepHeader';
import { StepperFooter, StepperPreviousButton } from '../Stepper';

const schema = z.object({
  state: z.string().min(1, 'Informe seu Estado'),
  city: z.string().min(1, 'Informe o sua cidade'),
  street: z.string().min(1, 'Informe o seu endereço'),
});

type FormData = z.infer<typeof schema>;

export function AddressStep() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log(data);
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  });
  return (
    <form onSubmit={handleSubmit}>
      <StepHeader title="Endereço" description="De onde você é" />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="state">Estado</Label>
          <Input id="state" {...form.register('state')} />
          {form.formState.errors.state?.message && (
            <small className="text-destructive">
              {form.formState.errors.state?.message}
            </small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input id="city" {...form.register('city')} />
          {form.formState.errors.city?.message && (
            <small className="text-destructive">
              {form.formState.errors.city?.message}
            </small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="street">Endereço</Label>
          <Input id="street" {...form.register('street')} />
          {form.formState.errors.street?.message && (
            <small className="text-destructive">
              {form.formState.errors.street?.message}
            </small>
          )}
        </div>
      </div>

      <StepperFooter>
        <StepperPreviousButton disabled={form.formState.isSubmitting} />
        <Button type="submit" size="sm" disabled={form.formState.isSubmitting}>
          Finalizar
        </Button>
      </StepperFooter>
    </form>
  );
}
