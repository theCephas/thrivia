import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Length } from 'class-validator';
import { OTPActionType } from 'src/types';

export class LoginDTO {
  @IsString()
  emailOrPhone: string;

  @IsString()
  password: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}

export class VerifyOtpDto {
  @IsString()
  pinId: string;

  @IsString()
  otp: string;

  @IsString()
  userUuid: string;

  @IsEnum(OTPActionType)
  @ApiProperty({ type: 'enum', enum: OTPActionType })
  otpActionType: OTPActionType;
}

export class SendOtpDto {
  @IsString()
  userUuid: string;

  @IsEnum(OTPActionType)
  otpActionType: OTPActionType;
}

export class ResetPasswordDto {
  @IsString()
  emailOrPhone: string;
}

export class ChangePasswordDto {
  @IsString()
  @Length(1, 50)
  newPassword: string;

  @IsString()
  @Length(1, 50)
  oldPassword: string;
}

export class NewResetPasswordDto {
  @IsString()
  @Length(1, 50)
  password: string;
}