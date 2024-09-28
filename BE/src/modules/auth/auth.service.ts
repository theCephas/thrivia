import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@mikro-orm/nestjs';
import { OTP, Users } from '../users/users.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { SharedService } from '../shared/shared.service';
import { JwtAuthConfiguration } from 'src/config/configuration';
import { ConfigType } from '@nestjs/config';
import { IAuthContext, OTPActionType, Role } from 'src/types';
import { nanoid } from 'nanoid';
import { generateOtp } from 'src/utils';
import bcrypt from 'bcrypt';
import {
  ChangePasswordDto,
  NewResetPasswordDto,
  ResetPasswordDto,
  SendOtpDto,
  VerifyOtpDto,
} from './auth.dto';
import { CooperativeUsers } from '../cooperatives/cooperatives.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(Users)
    private readonly usersRepository: EntityRepository<Users>,
    @InjectRepository(OTP)
    private readonly otpRepository: EntityRepository<OTP>,
    @InjectRepository(CooperativeUsers)
    private readonly cooperativeUsersRepository: EntityRepository<CooperativeUsers>,
    private readonly sharedService: SharedService,
    @Inject(JwtAuthConfiguration.KEY)
    private readonly jwtConfig: ConfigType<typeof JwtAuthConfiguration>,
    private readonly em: EntityManager,
  ) {}

  async login(user: any) {
    if (user.pinId) return user;
    const payload: IAuthContext = {
      email: user.email,
      uuid: user.uuid,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
    };
    const userModel = await this.usersRepository.findOne({ uuid: user.uuid })
    userModel.lastLoggedIn = new Date();
    await this.em.flush();
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;
    return {
      accessToken: this.jwtService.sign(payload),
      expiresIn: 1.2e6,
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user,
    };
  }

  async validateUser(
    emailOrPhone: string,
    password: string,
    role: Role,
  ): Promise<any> {
    const user = await this.usersService.findByEmailOrPhone(emailOrPhone);
    if (!user) throw new NotFoundException('User not found');
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      if (user.deletedAt)
        throw new ForbiddenException('This account is disabled');
      // if (!user.phoneVerified) {
      //   const pinId = nanoid();
      //   const otp = generateOtp();
      //   await this.sharedService.sendOtp(otp, user.phoneNumber, {} as any);
      //   const otpModel = this.otpRepository.create({ otp, pinId });
      //   this.em.persistAndFlush(otpModel);
      //   return { pinId, uuid: user.uuid };
      // }
      if (role === Role.MANAGER) {
        const cooperativeExists = await this.cooperativeUsersRepository.findOne(
          {
            user: { uuid: user.uuid },
            role: Role.MANAGER,
          },
        );
        if (!cooperativeExists)
          throw new NotFoundException('No cooperative found for this account');
      }
      return user;
    }
    throw new UnauthorizedException('Invalid details');
  }

  async refresh(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken);
    delete payload.exp;
    return {
      accessToken: this.jwtService.sign(payload),
      expiresIn: 1.2e6,
    };
  }

  async verifyOtp({ otp, pinId, userUuid, otpActionType }: VerifyOtpDto) {
    const otpInDb = await this.otpRepository.findOne({
      pinId,
    });
    if (!otpInDb) throw new NotFoundException('Pin ID does not exist');
    if (otpInDb.otp !== otp) throw new UnauthorizedException('Invalid OTP');
    if (otpInDb.expiredAt !== null)
      throw new UnauthorizedException('OTP has expired');
    const diffMs = new Date().valueOf() - new Date(otpInDb.createdAt).valueOf();
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    let otpModel = await this.otpRepository.findOne({ uuid: otpInDb.uuid });
    if (diffMins >= 10) {
      otpModel.expiredAt = new Date();
      await this.em.flush();
      throw new UnauthorizedException('OTP has expired');
    }
    switch (otpActionType) {
      case OTPActionType.VERIFY_ACCOUNT:
        const user = await this.usersRepository.findOne({ uuid: userUuid });
        user.phoneVerified = true;
        await this.em.flush();
        break;
      case OTPActionType.RESET_PASSWORD:
        const payload = { id: userUuid };
        return this.jwtService.sign(payload, {
          expiresIn: 600,
          secret: this.jwtConfig.resetPwdSecretKey,
        });
    }
    return true;
  }

  async sendOtp({ userUuid, otpActionType }: SendOtpDto) {
    const pinId = nanoid();
    const otp = generateOtp();
    let templateCode: string, subject: string;
    switch (otpActionType) {
      case OTPActionType.RESET_PASSWORD:
        templateCode = 'reset_password_otp';
        subject = 'Reset Password OTP';
        break;
    }
    const user = await this.usersRepository.findOne({ uuid: userUuid });
    if (!user) throw new NotFoundException('User does not exist');
    await this.sharedService.sendOtp(otp, user.phoneNumber, {
      templateCode,
      subject,
      to: otpActionType === OTPActionType.RESET_PASSWORD ? user.email : '',
    });
    const otpModel = this.otpRepository.create({ otp, pinId });
    await this.em.persistAndFlush(otpModel);
    return pinId;
  }

  async initiateResetPassword({ emailOrPhone }: ResetPasswordDto) {
    const user = await this.usersRepository.findOne([
      {
        email: emailOrPhone,
      },
      {
        phoneNumber:
          (!emailOrPhone.includes('@') &&
            this.sharedService
              .validatePhoneNumber(emailOrPhone)
              .substring(1)) ||
          '',
      },
    ]);
    if (!user) throw new NotFoundException('User not found');
    const pinId = nanoid();
    const otp = generateOtp();
    await this.sharedService.sendOtp(otp, user.phoneNumber, {
      templateCode: 'reset_password_otp',
      subject: 'Reset Password OTP',
      to: emailOrPhone.includes('@') ? user.email : '',
    });
    const otpModel = this.otpRepository.create({ otp, pinId });
    await this.em.persistAndFlush(otpModel);
    return { pinId, userUuid: user.uuid };
  }

  async changePassword(
    { oldPassword, newPassword }: ChangePasswordDto,
    { phoneNumber }: IAuthContext,
  ) {
    const user = await this.usersService.findByEmailOrPhone(phoneNumber);
    if (!user) throw new NotFoundException('User not found');
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch)
      throw new BadRequestException('Current password is incorrect');
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    return await this.em.flush();
  }

  async resetPassword({ password }: NewResetPasswordDto, token: string) {
    let response: any;
    try {
      response = this.jwtService.verify(token, {
        secret: this.jwtConfig.resetPwdSecretKey,
      });
    } catch (error) {
      throw new UnauthorizedException(
        'Reset password token has expired. Kindly restart the process.',
      );
    }
    if (!response.id)
      throw new UnauthorizedException(
        'Kindly provide a valid access token to reset your password',
      );
    const { id } = response;
    const user = await this.usersRepository.findOne({ uuid: id });
    if (!user) throw new NotFoundException('User not found');
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    return await this.em.flush();
  }
}
