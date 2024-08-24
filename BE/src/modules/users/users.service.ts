import { InjectRepository } from '@mikro-orm/nestjs';
import { ConflictException, Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { CreateUserDto } from './users.dto';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: EntityRepository<Users>,
    private readonly em: EntityManager,
    private readonly sharedService: SharedService,
  ) {}

  async createUser(user: CreateUserDto) {
    const phoneNumber = this.sharedService.validatePhoneNumber(
      user.phoneNumber,
    );
    user.phoneNumber = phoneNumber.substring(1);
    const existingUser = await this.usersRepository.findOne([
      { email: user.email },
      { phoneNumber: user.phoneNumber },
    ]);
    if (existingUser) {
      if (existingUser.email === user.email) {
        throw new ConflictException(
          `User with email: ${user.email} already exist`,
        );
      }
      if (existingUser.phoneNumber === user.phoneNumber) {
        throw new ConflictException(
          `User with phone: ${user.phoneNumber.substring(3)} already exist`,
        );
      }
    }
    const hashedPassword = await bcrypt.hash(user.password, 12);
    // TODO: WILL COME IN LATER
    // const pinId = nanoid();
    // const otp = generateOtp();
    // await this.sharedService.sendOtp(otp, user.phoneNumber, {} as any);
    // const otpModel = this.otpRepository.create({ otp, pinId });
    // this.em.persistAndFlush(otpModel);
    const userModel = this.usersRepository.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: hashedPassword,
      phoneNumber: user.phoneNumber,
      lastLoggedIn: new Date(),
      uuid: v4(),
    });
    await this.em.persistAndFlush(userModel);
    // TODO: Call Login
  }

  async findByEmailOrPhone(emailOrPhone: string) {
    let username: string;
    try {
      username = this.sharedService
        .validatePhoneNumber(emailOrPhone)
        .substring(1);
    } catch (error) {
      username = emailOrPhone;
    } finally {
      return this.usersRepository.findOne([
        { email: username },
        { phoneNumber: username },
      ]);
    }
  }
}
