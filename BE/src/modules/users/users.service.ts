import { InjectRepository } from '@mikro-orm/nestjs';
import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Users } from './users.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { CreateCooperativeApplicationDto, CreateUserDto } from './users.dto';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { SharedService } from '../shared/shared.service';
import { AuthService } from '../auth/auth.service';
import { ApplicationStatus, IAuthContext, Role } from 'src/types';
import {
  CooperativeApplications,
  Cooperatives,
  CooperativeUsers,
} from '../cooperatives/cooperatives.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: EntityRepository<Users>,
    @InjectRepository(CooperativeUsers)
    private readonly cooperativeUsersRepository: EntityRepository<CooperativeUsers>,
    @InjectRepository(Cooperatives)
    private readonly cooperativeRepository: EntityRepository<Cooperatives>,
    @InjectRepository(CooperativeApplications)
    private readonly cooperativeApplicationsRepository: EntityRepository<CooperativeApplications>,
    private readonly em: EntityManager,
    private readonly sharedService: SharedService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
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
    return this.authService.login(userModel);
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

  async fetchCooperatives(role: Role, { uuid }: IAuthContext) {
    return this.cooperativeUsersRepository.find({
      user: { uuid },
      role,
    });
  }

  async submitCooperativeApplication(
    application: CreateCooperativeApplicationDto,
    { uuid }: IAuthContext,
  ) {
    const cooperativeExists = await this.cooperativeRepository.findOne({
      uniqueId: application.uniqueId,
    });
    if (!cooperativeExists)
      throw new NotFoundException(
        `Cooperative with unique id: ${application.uniqueId} does not exist`,
      );
    const phoneNumber = this.sharedService.validatePhoneNumber(
      application.phoneNumber,
    );
    application.phoneNumber = phoneNumber.substring(1);
    const cooperativeApplicationModel =
      this.cooperativeApplicationsRepository.create({
        uuid: v4(),
        uniqueId: application.uniqueId,
        membershipNo: application.membershipNo,
        fullName: application.fullName,
        dateOfBirth: application.dateOfBirth,
        phoneNumber: application.phoneNumber,
        email: application.email,
        address: application.address,
        user: { uuid },
        cooperative: { uuid: cooperativeExists.uuid },
        status: ApplicationStatus.PENDING,
      });
    await this.em.persistAndFlush(cooperativeApplicationModel);
  }
}
