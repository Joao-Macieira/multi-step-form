import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { safeSessionStorageGetItem } from '@/lib/utils';

import { Input } from '../Input';
import { Label } from '../Label';
import { StepHeader } from '../StepHeader';
import { StepperFooter, StepperNextButton } from '../Stepper';
import { useStepper } from '../Stepper/useStepper';

const schema = z.object({
  email: z.string().email('Informe um email válido'),
  password: z.string().min(1, 'Informe a senha'),
});

type FormData = z.infer<typeof schema>;

export function AccountStep() {
  const { nextStep } = useStepper();

  const intialValue = safeSessionStorageGetItem<FormData>('account-step');

  const form = useForm<FormData>({
    disabled: !!intialValue,
    resolver: zodResolver(schema),
    defaultValues: {
      email: intialValue?.email ?? '',
      password: intialValue?.password ?? '',
    },
  });

  useEffect(() => {
    if (form.formState.isDirty) {
      window.onbeforeunload = () => 'ahsuhasuahsuahs';
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [form.formState.isDirty]);

  const handleSubmit = form.handleSubmit(async (data) => {
    if (!intialValue) {
      sessionStorage.setItem(
        'account-step',
        JSON.stringify({
          ...data,
          password: '*'.repeat(data.password.length),
        }),
      );
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    }
    nextStep();
  });

  return (
    <form onSubmit={handleSubmit}>
      <StepHeader
        title="Conta"
        description="Seus dados de acesso à plataforma"
      />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" {...form.register('email')} />
          {form.formState.errors.email?.message && (
            <small className="text-destructive">
              {form.formState.errors.email?.message}
            </small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" {...form.register('password')} />
          {form.formState.errors.password?.message && (
            <small className="text-destructive">
              {form.formState.errors.password?.message}
            </small>
          )}
        </div>
      </div>

      <StepperFooter>
        <StepperNextButton
          type="submit"
          preventDefault
          disabled={form.formState.isSubmitting}
        />
      </StepperFooter>
    </form>
  );
}
