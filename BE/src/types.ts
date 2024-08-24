export enum OrderDir {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum PaymentProviderType {
  MONNIFY = 'MONNIFY',
  PAYSTACK = 'PAYSTACK',
}

export interface IEmailDto {
  templateCode: string;
  to?: string;
  subject: string;
  from?: string;
  bcc?: string;
  html?: string;
  data?: any;
}

export interface IAuthContext {
  email: string;
  uuid: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export enum OTPActionType {
  VERIFY_ACCOUNT = 'VERIFY_ACCOUNT',
  RESET_PASSWORD = 'RESET_PASSWORD',
}
