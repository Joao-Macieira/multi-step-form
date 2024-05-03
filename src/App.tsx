import { Stepper } from './components/Stepper';
import { AccountStep } from './components/steps/AccountStep';
import { AddressStep } from './components/steps/AddressStep';
import { PersonalDataStep } from './components/steps/PersonalDataStep';

export function App() {
  return (
    <div className="flex min-h-screen justify-center pt-40">
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
    </div>
  );
}
