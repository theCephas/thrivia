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

export enum Role {
  MANAGER = 'MANAGER',
  MEMBER = 'MEMBER',
}

export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export enum CacheKeys {
  BANKS_DATA = 'banksData',
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum LoanStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  CLOSED = 'CLOSED',
  OVERDUE = 'OVERDUE'
}

export enum PaymentType {
  INCOMING = 'incoming',
  OUTGOING = 'outgoing',
}

export enum Currencies {
  NGN = 'NGN',
}