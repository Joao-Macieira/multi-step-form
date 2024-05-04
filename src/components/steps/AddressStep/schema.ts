import { z } from 'zod';

export const addressStepSchema = z.object({
  state: z.string().min(1, 'Informe seu Estado'),
  city: z.string().min(1, 'Informe o sua cidade'),
  street: z.string().min(1, 'Informe o seu endereço'),
});
