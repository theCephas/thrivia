import { registerAs } from '@nestjs/config';
import { TermiiConfig } from './types/termii.config';
import { MonnifyConfig } from './types/monnify.config';
import { PaymentProviderConfig } from './types/payments.config';
import { PaymentProviderType } from 'src/types';
import { SmtpConfig } from './types/smtp.config';
import { JwtAuthConfig } from './types/jwt-auth.config';

export const TermiiConfiguration = registerAs(
  'termiiConfig',
  (): TermiiConfig => ({
    baseUrl: process.env.TERMII_BASE_URL,
    apiKey: process.env.TERMII_API_KEY,
  }),
);

export const MonnifyConfiguration = registerAs(
  'monnifyConfig',
  (): MonnifyConfig => ({
    secretKey: process.env.MONNIFY_SECRET_KEY,
    baseUrl: process.env.MONNIFY_BASE_URL,
    apiKey: process.env.MONNIFY_API_KEY,
    accountNumber: process.env.MONNIFY_ACCOUNT_NUMBER,
  }),
);

export const PaymentProviderConfiguration = registerAs(
  'paymentProviderConfig',
  (): PaymentProviderConfig => ({
    providerId: process.env.PAYMENT_PROVIDER as PaymentProviderType,
  }),
);

export const SmtpConfiguration = registerAs(
  'smtpConfig',
  (): SmtpConfig => ({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
  }),
);

export const JwtAuthConfiguration = registerAs(
  'jwtAuthConfig',
  (): JwtAuthConfig => ({
    secretKey: process.env.JWT_SECRET_KEY || 'secret',
    adminSecretKey: process.env.ADMIN_JWT_SECRET_KEY || 'admin-secret',
    resetPwdSecretKey:
      process.env.RESET_PWD_JWT_SECRET_KEY || 'reset-pwd-secret',
  }),
);