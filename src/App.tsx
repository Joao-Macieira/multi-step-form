import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Stepper } from './components/Stepper';
import { AccountStep } from './components/steps/AccountStep';
import { accountStepSchema } from './components/steps/AccountStep/schema';
import { AddressStep } from './components/steps/AddressStep';
import { addressStepSchema } from './components/steps/AddressStep/schema';
import { PersonalDataStep } from './components/steps/PersonalDataStep';
import { personalDataStepSchema } from './components/steps/PersonalDataStep/schema';

const schema = z.object({
  accountStep: accountStepSchema,
  personalDataStep: personalDataStepSchema,
  addressStep: addressStepSchema,
});

export type FormData = z.infer<typeof schema>;

export function App() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      accountStep: {
        email: '',
        password: '',
      },
      personalDataStep: {
        firstName: '',
        lastName: '',
        document: '',
      },
      addressStep: {
        state: '',
        city: '',
        street: '',
      },
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    // eslint-disable-next-line no-console
    console.log('Enviando para a API ', data);
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    // API call
  });

  return (
    <div className="flex min-h-screen justify-center pt-40">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit}>
          <Stepper
            steps={[
              {
                label: 'Conta',
                content: <AccountStep />,
              },
              {
                label: 'Dados pessoais',
                content: <PersonalDataStep />,
              },
              {
                label: 'Endereço',
                content: <AddressStep />,
              },
            ]}
          />
        </form>
      </FormProvider>
    </div>
  );
}
