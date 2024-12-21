import { z } from 'zod';

const envSchema = z.object({
  MODE: z.enum(['development', 'production']).default('development'),
});

const env = envSchema.parse(import.meta.env);

export const isDevelopment = env.MODE === 'development';
export const isProduction = env.MODE === 'production';

export const config = {
  useRealApi: isProduction,
} as const;