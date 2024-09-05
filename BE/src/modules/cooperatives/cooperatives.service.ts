import { InjectRepository } from '@mikro-orm/nestjs';
import {
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CooperativeApplications,
  Cooperatives,
  CooperativeUsers,
  Payments,
  WithdrawalRequests,
} from './cooperatives.entity';
import { EntityManager, EntityRepository, Reference } from '@mikro-orm/core';
import {
  CreateCooperativeDto,
  DepositMoneyDto,
  PaymentInfo,
  RejectApplicationDto,
} from './cooperatives.dto';
import {
  ApplicationStatus,
  Currencies,
  IAuthContext,
  PaymentType,
  Role,
  TransactionType,
} from 'src/types';
import { v4 } from 'uuid';
import { generateRandomDigits } from 'src/utils';
import { Transactions, Wallets } from '../wallets/wallets.entity';
import axios from 'axios';
import { MonnifyConfiguration } from 'src/config/configuration';
import { ConfigType } from '@nestjs/config';
import { WalletsService } from '../wallets/wallets.service';
import { nanoid } from 'nanoid';
import PaymentFactory from '../shared/payment-providers/payment-provider.factory';
import { PaymentProvider } from '../shared/payment-providers/payment-provider.contract';
import { Users } from '../users/users.entity';

@Injectable()
export class CooperativesService {
  private paymentProvider: PaymentProvider;

  constructor(
    @InjectRepository(Cooperatives)
    private readonly cooperativesRepository: EntityRepository<Cooperatives>,
    @InjectRepository(CooperativeUsers)
    private readonly cooperativeUsersRepository: EntityRepository<CooperativeUsers>,
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
    @InjectRepository(Users)
    private readonly usersRepository: EntityRepository<Users>,
    @Inject(MonnifyConfiguration.KEY)
    private readonly monnifyConfig: ConfigType<typeof MonnifyConfiguration>,
    private readonly em: EntityManager,
    private readonly walletService: WalletsService,
    private readonly paymentFactory: PaymentFactory,
  ) {
    this.paymentProvider = this.paymentFactory.getProvider();
  }

  async createCooperative(
    cooperative: CreateCooperativeDto,
    { uuid }: IAuthContext,
  ) {
    let cooperativeModel: Cooperatives;
    await this.em.transactional(async (em) => {
      const existingCooperative = await this.cooperativesRepository.findOne([
        { name: cooperative.name },
        { regNo: cooperative.regNo },
      ]);
      if (existingCooperative) {
        if (existingCooperative.name === cooperative.name) {
          throw new ConflictException(
            `Cooperative with name: ${existingCooperative.name} already exist`,
          );
        }
        if (existingCooperative.regNo === cooperative.regNo) {
          throw new ConflictException(
            `Cooperative with registration no: ${existingCooperative.regNo} already exist`,
          );
        }
      }
      cooperativeModel = this.cooperativesRepository.create({
        uuid: v4(),
        name: cooperative.name,
        regNo: cooperative.regNo,
        address: cooperative.address,
        contactEmail: cooperative.contactEmail,
        contactPhone: cooperative.contactPhone,
        bankName: cooperative.bankName,
        accountNo: cooperative.accountNo,
        accountName: cooperative.accountName,
        uniqueId: `COOP-${generateRandomDigits()}`,
        slug: `${cooperative.name.toLowerCase().replace(/ /g, '-')}.thrivia.com`,
        createdBy: this.usersRepository.getReference(uuid),
      });
      await em.persistAndFlush(cooperativeModel);
      const cooperativeUserModel = this.cooperativeUsersRepository.create({
        uuid: v4(),
        cooperative: this.cooperativesRepository.getReference(cooperativeModel.uuid),
        user: this.usersRepository.getReference(uuid),
      });
      await em.persistAndFlush(cooperativeUserModel);
      const cooperativeWalletModel = this.walletsRepository.create({
        uuid: v4(),
        title: 'Savings',
        cooperative: this.cooperativesRepository.getReference(cooperativeModel.uuid),
        createdBy: this.usersRepository.getReference(uuid),
      });
      await em.persistAndFlush(cooperativeWalletModel);
      const cooperativeOwnerWalletModel = this.walletsRepository.create({
        uuid: v4(),
        title: 'Savings',
        cooperative: this.cooperativesRepository.getReference(cooperativeModel.uuid),
        user: this.usersRepository.getReference(uuid),
        createdBy: this.usersRepository.getReference(uuid),
      });
      await em.persistAndFlush(cooperativeOwnerWalletModel);
    });
    return cooperativeModel;
  }

  async fetchWallets(cooperativeUuid: string, { uuid }: IAuthContext) {
    await this.cooperativeGuard(cooperativeUuid, uuid);
    return this.walletsRepository.find({
      cooperative: { uuid: cooperativeUuid },
      user: null,
    });
  }

  async fetchApplications(cooperativeUuid: string, { uuid }: IAuthContext) {
    await this.cooperativeGuard(cooperativeUuid, uuid);
    return this.cooperativeApplicationsRepository.find({
      cooperative: { uuid: cooperativeUuid },
    });
  }

  async fetchWithdrawalRequests(
    cooperativeUuid: string,
    { uuid }: IAuthContext,
  ) {
    await this.cooperativeGuard(cooperativeUuid, uuid);
    return this.withdrawalRequestRepository.find({
      cooperative: { uuid: cooperativeUuid },
    });
  }

  async approveApplication(
    cooperativeUuid: string,
    applicationUuid: string,
    { uuid }: IAuthContext,
  ) {
    await this.cooperativeGuard(cooperativeUuid, uuid);
    await this.em.transactional(async (em) => {
      const applicationExists =
        await this.cooperativeApplicationsRepository.findOne({
          uuid: applicationUuid,
        });
      if (!applicationExists)
        throw new NotFoundException(
          `Cooperative application with id: ${applicationUuid} does not exist`,
        );
      const cooperativeApplicationModel =
        this.cooperativeApplicationsRepository.create({
          uuid: applicationExists.uuid,
          reviewedAt: new Date(),
          reviewedBy: this.usersRepository.getReference(uuid),
          status: ApplicationStatus.APPROVED,
        });
      await em.persistAndFlush(cooperativeApplicationModel);
      const cooperativeUserModel = this.cooperativeUsersRepository.create({
        user: applicationExists.user,
        cooperative: applicationExists.cooperative,
        uuid: v4(),
        role: Role.MEMBER,
      });
      await em.persistAndFlush(cooperativeUserModel);
      const walletModel = this.walletsRepository.create({
        uuid: v4(),
        title: 'Savings',
        cooperative: applicationExists.cooperative,
        user: applicationExists.user,
        createdBy: this.usersRepository.getReference(uuid),
      });
      await em.persistAndFlush(walletModel);
    });
  }

  async approveWithdrawalRequest(
    cooperativeUuid: string,
    requestUuid: string,
    { uuid }: IAuthContext,
  ) {
    await this.cooperativeGuard(cooperativeUuid, uuid);
    await this.em.transactional(async (em) => {
      const requestExists = await this.withdrawalRequestRepository.findOne(
        {
          uuid: requestUuid,
        },
        {},
      );
      if (!requestExists)
        throw new NotFoundException(
          `Withdrawal request with id: ${requestUuid} does not exist`,
        );
      const withdrawalRequestModel = this.withdrawalRequestRepository.create({
        uuid: requestExists.uuid,
        reviewedAt: new Date(),
        reviewedBy: this.usersRepository.getReference(uuid),
        status: ApplicationStatus.APPROVED,
      });
      await em.persistAndFlush(withdrawalRequestModel);
      const reference = nanoid();
      const response = await this.paymentProvider.payout({
        amount: requestExists.amount,
        bankCode: requestExists.bankCode,
        accountNumber: requestExists.accountNumber,
        accountName: requestExists.accountName,
        reference,
        narration: `Withdrawal from ${requestExists.cooperative.name} to ${requestExists.accountName}`,
      });
      if (response.status === 'success') {
        const walletModel = this.walletsRepository.create({
          uuid: requestExists.wallet.uuid,
          balance: requestExists.wallet.balance - requestExists.amount,
        });
        await em.persistAndFlush(walletModel);
        const paymentUuid = v4();
        const paymentModel = this.paymentRepository.create({
          uuid: paymentUuid,
          transactionId: reference,
          status: 'successful',
          amount: requestExists.amount,
          channel: 'withdrawal',
          metadata: JSON.stringify(response.data),
          type: PaymentType.OUTGOING,
          currencies: Currencies.NGN,
        });
        await em.persistAndFlush(paymentModel);
        const transactionModel = this.transactionRepository.create({
          type: TransactionType.DEBIT,
          balanceBefore: requestExists.wallet.balance,
          balanceAfter: requestExists.wallet.balance - requestExists.amount,
          amount: requestExists.amount,
          wallet: this.walletsRepository.getReference(requestExists.wallet.uuid),
          walletSnapshot: JSON.stringify(requestExists.wallet),
          payment: this.paymentRepository.getReference(paymentUuid),
          user: requestExists.user,
          remark: `Withdrawal from ${requestExists.cooperative.name} to ${requestExists.accountName}`,
        });
        await em.persistAndFlush(transactionModel);
      } else {
        const paymentModel = this.paymentRepository.create({
          transactionId: reference,
          status: 'failed',
          amount: requestExists.amount,
          channel: 'withdrawal',
          metadata: JSON.stringify(response.data),
          type: PaymentType.OUTGOING,
          currencies: Currencies.NGN,
        });
        await em.persistAndFlush(paymentModel);
        throw new HttpException(
          'Transaction Failed',
          HttpStatus.EXPECTATION_FAILED,
        );
      }
    });
  }

  async rejectApplication(
    cooperativeUuid: string,
    applicationUuid: string,
    { reason }: RejectApplicationDto,
    { uuid }: IAuthContext,
  ) {
    await this.cooperativeGuard(cooperativeUuid, uuid);
    await this.em.transactional(async (em) => {
      const applicationExists =
        await this.cooperativeApplicationsRepository.findOne({
          uuid: applicationUuid,
        });
      if (!applicationExists)
        throw new NotFoundException(
          `Cooperative application with uuid: ${applicationUuid} does not exist`,
        );
      const cooperativeApplicationModel =
        this.cooperativeApplicationsRepository.create({
          uuid: applicationExists.uuid,
          reviewedAt: new Date(),
          reviewedBy: this.usersRepository.getReference(uuid),
          rejectionReason: reason,
          status: ApplicationStatus.REJECTED,
        });
      await em.persistAndFlush(cooperativeApplicationModel);
    });
  }

  async rejectWithdrawalRequest(
    cooperativeUuid: string,
    requestUuid: string,
    { reason }: RejectApplicationDto,
    { uuid }: IAuthContext,
  ) {
    await this.cooperativeGuard(cooperativeUuid, uuid);
    await this.em.transactional(async (em) => {
      const requestExists = await this.withdrawalRequestRepository.findOne({
        uuid: requestUuid,
      });
      if (!requestExists)
        throw new NotFoundException(
          `Withdrawal request with uuid: ${requestUuid} does not exist`,
        );
      const withdrawalRequestModel = this.withdrawalRequestRepository.create({
        uuid: requestExists.uuid,
        reviewedAt: new Date(),
        reviewedBy: this.usersRepository.getReference(uuid),
        rejectionReason: reason,
        status: ApplicationStatus.REJECTED,
      });
      await em.persistAndFlush(withdrawalRequestModel);
    });
  }

  async getApplicationDetails(
    cooperativeUuid: string,
    applicationUuid: string,
    { uuid }: IAuthContext,
  ) {
    await this.cooperativeGuard(cooperativeUuid, uuid);
    return this.cooperativeApplicationsRepository.findOne({
      uuid: applicationUuid,
    });
  }

  async getWithdrawalRequestDetails(
    cooperativeUuid: string,
    requestUuid: string,
    { uuid }: IAuthContext,
  ) {
    await this.cooperativeGuard(cooperativeUuid, uuid);
    return this.withdrawalRequestRepository.findOne({
      uuid: requestUuid,
    });
  }

  async verifyTransaction(transactionId: string, { amount }: PaymentInfo) {
    const paymentExists = await this.paymentRepository.findOne({
      transactionId: transactionId.toString(),
    });
    if (paymentExists) throw new ConflictException('Duplicate payment');
    const response = await axios
      .post(
        `${this.monnifyConfig.baseUrl}/api/v1/auth/login`,
        {},
        {
          auth: {
            username: this.monnifyConfig.apiKey,
            password: this.monnifyConfig.secretKey,
          },
        },
      )
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
    const accessToken = response.data.responseBody.accessToken;
    const transResponse = await axios
      .get(
        `${this.monnifyConfig.baseUrl}/api/v2/transactions/${encodeURIComponent(transactionId)}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
    const data = transResponse.data.responseBody;
    if (
      data.paymentStatus.toLowerCase() !== 'paid' ||
      +data.amountPaid !== amount
    ) {
      const paymentModel = this.paymentRepository.create({
        uuid: v4(),
        transactionId: transactionId.toString(),
        metadata: JSON.stringify(data),
        type: PaymentType.INCOMING,
        amount,
        channel: data.paymentMethod,
        status: 'failed',
        currencies: Currencies.NGN,
      });
      await this.em.persistAndFlush(paymentModel);
      throw new NotAcceptableException('Transaction is not valid');
    }
    const paymentModel = this.paymentRepository.create({
      uuid: v4(),
      transactionId: transactionId.toString(),
      metadata: JSON.stringify(data),
      type: PaymentType.INCOMING,
      amount,
      channel: data.paymentMethod,
      status: 'success',
      currencies: Currencies.NGN,
    });
    await this.em.persistAndFlush(paymentModel);
  }

  async depositMoney(
    cooperativeUuid: string,
    walletUuid: string,
    { paymentUuid }: DepositMoneyDto,
    { uuid }: IAuthContext,
  ) {
    await this.cooperativeGuard(cooperativeUuid, uuid);
    const walletExists = await this.walletsRepository.findOne({
      uuid: walletUuid,
    });
    if (!walletExists)
      throw new NotFoundException(
        `Wallet with uuid: "${walletUuid}" not found`,
      );
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
    await this.walletService.creditWallet({
      walletUuid,
      amount: paymentExists.amount,
      paymentUuid: paymentExists.uuid,
      userUuid: uuid,
      remark: `Credit for '${walletExists.title}' wallet by cooperative manager`,
    });
  }

  private async cooperativeGuard(cooperativeUuid: string, userUuid: string) {
    const cooperativeUser = await this.cooperativeUsersRepository.findOne({
      cooperative: { uuid: cooperativeUuid },
      user: { uuid: userUuid },
    });
    if (!cooperativeUser)
      throw new UnauthorizedException(
        'User not found in specified cooperative',
      );
    if (cooperativeUser.role !== Role.MANAGER)
      throw new ForbiddenException(
        'User is not a manager in specified cooperative',
      );
  }
}
