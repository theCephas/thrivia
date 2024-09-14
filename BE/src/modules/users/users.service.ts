import { InjectRepository } from '@mikro-orm/nestjs';
import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Users } from './users.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import {
  CreateCooperativeApplicationDto,
  CreateUserDto,
  WithdrawalRequestDto,
} from './users.dto';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { SharedService } from '../shared/shared.service';
import { AuthService } from '../auth/auth.service';
import { ApplicationStatus, IAuthContext, Role } from 'src/types';
import {
  CooperativeApplications,
  Cooperatives,
  CooperativeUsers,
  Payments,
  WithdrawalRequests,
} from '../cooperatives/cooperatives.entity';
import { Transactions, Wallets } from '../wallets/wallets.entity';
import { DepositMoneyDto } from '../cooperatives/cooperatives.dto';
import { WalletsService } from '../wallets/wallets.service';
import PaymentFactory from '../shared/payment-providers/payment-provider.factory';
import { PaymentProvider } from '../shared/payment-providers/payment-provider.contract';

@Injectable()
export class UsersService {
  private paymentProvider: PaymentProvider;

  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: EntityRepository<Users>,
    @InjectRepository(CooperativeUsers)
    private readonly cooperativeUsersRepository: EntityRepository<CooperativeUsers>,
    @InjectRepository(Cooperatives)
    private readonly cooperativeRepository: EntityRepository<Cooperatives>,
    @InjectRepository(CooperativeApplications)
    private readonly cooperativeApplicationsRepository: EntityRepository<CooperativeApplications>,
    @InjectRepository(Wallets)
    private readonly walletsRepository: EntityRepository<Wallets>,
    @InjectRepository(Payments)
    private readonly paymentRepository: EntityRepository<Payments>,
    @InjectRepository(Transactions)
    private readonly transactionRepository: EntityRepository<Transactions>,
    @InjectRepository(WithdrawalRequests)
    private readonly withdrawalRequestRepository: EntityRepository<WithdrawalRequests>,
    private readonly em: EntityManager,
    private readonly sharedService: SharedService,
    private readonly walletService: WalletsService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly paymentFactory: PaymentFactory,
  ) {
    this.paymentProvider = this.paymentFactory.getProvider();
  }

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

  async fetchCooperatives({ uuid }: IAuthContext) {
    return this.cooperativeUsersRepository.find({
      user: { uuid }
    });
  }

  async submitCooperativeApplication(
    application: CreateCooperativeApplicationDto,
    { uuid }: IAuthContext,
  ) {
    let cooperativeApplicationModel: CooperativeApplications;
    await this.em.transactional(async (em) => {
      const cooperativeExists = await this.cooperativeRepository.findOne({
        uniqueId: application.uniqueId,
      });
      if (!cooperativeExists)
        throw new NotFoundException(
          `Cooperative with unique id: ${application.uniqueId} does not exist`,
        );
      const userExistsInCooperative =
        await this.cooperativeUsersRepository.findOne({
          user: { uuid },
          cooperative: { uuid: cooperativeExists.uuid },
        });
      if (userExistsInCooperative)
        throw new ConflictException(`User already exists in cooperative`);
      const applicationExists =
        await this.cooperativeApplicationsRepository.findOne({
          user: { uuid },
          cooperative: { uuid: cooperativeExists.uuid },
        });
      if (applicationExists)
        throw new ConflictException(`Application already exists`);
      const phoneNumber = this.sharedService.validatePhoneNumber(
        application.phoneNumber,
      );
      application.phoneNumber = phoneNumber.substring(1);
      cooperativeApplicationModel =
        this.cooperativeApplicationsRepository.create({
          uuid: v4(),
          uniqueId: application.uniqueId,
          membershipNo: application.membershipNo,
          fullName: application.fullName,
          dateOfBirth: application.dateOfBirth,
          phoneNumber: application.phoneNumber,
          email: application.email,
          address: application.address,
          user: this.usersRepository.getReference(uuid),
          cooperative: this.cooperativeRepository.getReference(cooperativeExists.uuid),
          status: ApplicationStatus.PENDING,
        });
      await em.persistAndFlush(cooperativeApplicationModel);
    });
    return cooperativeApplicationModel;
  }

  async fetchCooperativeApplication(
    cooperativeUuid: string,
    { uuid }: IAuthContext,
  ) {
    return this.cooperativeApplicationsRepository.find({
      user: { uuid },
      cooperative: { uuid: cooperativeUuid },
    });
  }

  async fetchCooperativeApplications({ uuid }: IAuthContext) {
    return this.cooperativeApplicationsRepository.find({
      user: { uuid },
    });
  }

  async fetchWallets(cooperativeUuid: string, { uuid }: IAuthContext) {
    return this.walletsRepository.find({
      user: { uuid },
      cooperative: { uuid: cooperativeUuid },
    });
  }

  async depositMoney(
    walletUuid: string,
    { paymentUuid }: DepositMoneyDto,
    { uuid }: IAuthContext,
  ) {
    const walletExists = await this.walletsRepository.findOne({
      uuid: walletUuid,
    });
    if (!walletExists)
      throw new NotFoundException(
        `Wallet with uuid: "${walletUuid}" not found`,
      );
    const cooperativeWallet = await this.walletsRepository.findOne({
      createdBy: walletExists.cooperative.createdBy,
      cooperative: walletExists.cooperative,
      title: walletExists.title,
      user: null,
      uuid: { $ne: walletUuid }
    });
    const paymentExists = await this.paymentRepository.findOne({
      uuid: paymentUuid,
    });
    if (!paymentExists)
      throw new NotFoundException(
        `Payment with uuid: "${paymentUuid}" not found`,
      );
    const transactionExists = await this.transactionRepository.findOne({
      payment: { uuid: paymentUuid },
    });
    if (transactionExists) throw new ConflictException('Payment has been used');
    return this.walletService.creditWallet({
      walletUuid,
      cooperativeWallet,
      amount: paymentExists.amount,
      paymentUuid: paymentExists.uuid,
      userUuid: uuid,
      remark: `Credit for '${walletExists.title}' wallet by user`,
    });
  }

  async submitWithdrawalRequest(
    walletUuid: string,
    request: WithdrawalRequestDto,
    { uuid }: IAuthContext,
  ) {
    const walletExists = await this.walletsRepository.findOne({
      uuid: walletUuid,
    });
    if (!walletExists)
      throw new NotFoundException(
        `Wallet with uuid: '${walletUuid}' does not exist`,
      );
    const amountWithCharge = this.paymentProvider.calculatePayoutAmount(
      request.amount,
    );
    if (amountWithCharge > walletExists.availableBalance) {
      throw new NotAcceptableException('Insufficient balance');
    }
    if (request.amount < 50)
      throw new NotAcceptableException('You cannot withdraw less than 50');
    if (request.amount > 500000)
      throw new NotAcceptableException(
        'You cannot withdraw more than 500,000 at once',
      );
    const withdrawalRequestModel = this.withdrawalRequestRepository.create({
      uuid: v4(),
      status: ApplicationStatus.PENDING,
      user: this.usersRepository.getReference(uuid),
      cooperative: walletExists.cooperative,
      wallet: this.walletsRepository.getReference(walletUuid),
      bankName: request.bankName,
      bankCode: request.bankCode,
      accountNumber: request.accountNumber,
      accountName: request.accountName,
      ...(request.purpose ? { purpose: request.purpose } : {}),
      amount: amountWithCharge,
    });
    await this.em.persistAndFlush(withdrawalRequestModel);
  }

  async fetchWithdrawalRequests(walletUuid: string, { uuid }: IAuthContext) {
    return this.withdrawalRequestRepository.find({
      wallet: { uuid: walletUuid },
      user: { uuid },
    });
  }

  async fetchTransactions(walletUuid: string, { uuid }: IAuthContext) {
    return this.transactionRepository.find({
      wallet: { uuid: walletUuid },
      user: { uuid }
    });
  }

  async setActiveCooperative(coopUuid: string, { uuid }: IAuthContext) {
    const user = await this.usersRepository.findOne({ uuid });
    if (!user) throw new NotFoundException(`User with uuid: '${uuid}' not found`);
    user.activeCooperative = this.cooperativeRepository.getReference(coopUuid);
    await this.em.flush();
  }
}
