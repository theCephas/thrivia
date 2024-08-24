import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

export enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
  Local = 'local',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;
  @IsString()
  DATABASE_HOST: string;
  @IsNumber()
  DATABASE_PORT: number;
  @IsString()
  DATABASE_PASSWORD: string;
  @IsString()
  DATABASE_NAME: string;
  @IsString()
  DATABASE_USER: string;
  @IsString()
  TERMII_BASE_URL: string;
  @IsString()
  TERMII_API_KEY: string;
  @IsString()
  MONNIFY_SECRET_KEY: string;
  @IsString()
  MONNIFY_BASE_URL: string;
  @IsString()
  MONNIFY_API_KEY: string;
  @IsString()
  MONNIFY_ACCOUNT_NUMBER: string;
  @IsString()
  PAYMENT_PROVIDER: string;
  @IsString()
  SMTP_HOST: string;
  @IsString()
  SMTP_PORT: string;
  @IsString()
  SMTP_USERNAME: string;
  @IsString()
  SMTP_PASSWORD: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
