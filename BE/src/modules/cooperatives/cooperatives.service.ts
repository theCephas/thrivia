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
import { EntityManager, EntityRepository } from '@mikro-orm/core';
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
  LoanStatus,
  PaymentType,
  Role,
  TransactionType,
} from 'src/types';
import { v4 } from 'uuid';
import { deductAmountFromWallets, generateRandomDigits } from 'src/utils';
import { Transactions, Wallets } from '../wallets/wallets.entity';
import axios from 'axios';
import { MonnifyConfiguration } from 'src/config/configuration';
import { ConfigType } from '@nestjs/config';
import { WalletsService } from '../wallets/wallets.service';
import { nanoid } from 'nanoid';
import PaymentFactory from '../shared/payment-providers/payment-provider.factory';
import { PaymentProvider } from '../shared/payment-providers/payment-provider.contract';
import { Users } from '../users/users.entity';
import { LoanFilter } from '../loans/loans.dto';
import { Loans } from '../loans/loans.entity';
import moment from 'moment-timezone';

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
    @InjectRepository(Loans)
    private readonly loansRepository: EntityRepository<Loans>,
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
      const cooperativeUserModel = this.cooperativeUsersRepository.create({
        uuid: v4(),
        cooperative: this.cooperativesRepository.getReference(cooperativeModel.uuid),
        user: this.usersRepository.getReference(uuid),
        role: Role.MANAGER
      });
      const cooperativeWalletModel = this.walletsRepository.create({
        uuid: v4(),
        title: 'Savings',
        cooperative: this.cooperativesRepository.getReference(cooperativeModel.uuid),
        createdBy: this.usersRepository.getReference(uuid),
      });
      const cooperativeOwnerWalletModel = this.walletsRepository.create({
        uuid: v4(),
        title: 'Savings',
        cooperative: this.cooperativesRepository.getReference(cooperativeModel.uuid),
        user: this.usersRepository.getReference(uuid),
        createdBy: this.usersRepository.getReference(uuid),
      });
      em.persist(cooperativeModel);
      em.persist(cooperativeUserModel);
      em.persist(cooperativeWalletModel);
      em.persist(cooperativeOwnerWalletModel);
      await em.flush();
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

  async fetchMembers(cooperativeUuid: string, { uuid }: IAuthContext) {
    await this.cooperativeGuard(cooperativeUuid, uuid);
    return this.cooperativeUsersRepository.find({
      cooperative: { uuid: cooperativeUuid }
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
      if (applicationExists.status === ApplicationStatus.APPROVED) throw new ConflictException(`Application with ID: '${applicationUuid}' has already been approved on: ${applicationExists.reviewedAt}`)
      applicationExists.reviewedAt = new Date();
      applicationExists.reviewedBy = this.usersRepository.getReference(uuid);
      applicationExists.status = ApplicationStatus.APPROVED;
      const cooperativeUserModel = this.cooperativeUsersRepository.create({
        user: applicationExists.user,
        cooperative: applicationExists.cooperative,
        uuid: v4(),
        role: Role.MEMBER,
      });
      const walletModel = this.walletsRepository.create({
        uuid: v4(),
        title: 'Savings',
        cooperative: applicationExists.cooperative,
        user: applicationExists.user,
        createdBy: this.usersRepository.getReference(uuid),
      });
      em.persist(cooperativeUserModel)
      em.persist(walletModel);
      await em.flush()
    });
  }

  async approveWithdrawalRequest(
    cooperativeUuid: string,
    requestUuid: string,
    { uuid }: IAuthContext,
  ) {
    await this.cooperativeGuard(cooperativeUuid, uuid);
    let paymentModel: Payments;
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
      if (requestExists.status === ApplicationStatus.APPROVED) throw new ConflictException(`Withdrawal request with ID: '${requestUuid}' has already been approved on: ${requestExists.reviewedAt}`)
      requestExists.reviewedAt = new Date();
      requestExists.reviewedBy = this.usersRepository.getReference(uuid);
      requestExists.status = ApplicationStatus.APPROVED;
      const reference = nanoid();
      const response = await this.paymentProvider.payout({
        amount: requestExists.amount,
        bankCode: requestExists.bankCode,
        accountNumber: requestExists.accountNumber,
        accountName: requestExists.accountName,
        reference,
        narration: `Withdrawal from ${requestExists.cooperative.name} to ${requestExists.accountName}`,
      });
      console.log("response", response);
      const walletModel = await this.walletsRepository.findOne({ uuid: requestExists.wallet.uuid });
      const cooperativeWallet = await this.walletsRepository.findOne({
        createdBy: walletModel.cooperative.createdBy,
        cooperative: walletModel.cooperative,
        title: walletModel.title,
        user: null,
        uuid: { $ne: walletModel.uuid }
      });
      let transactionModel: Transactions;
      if (response.status === 'success') {
        walletModel.totalBalance -= requestExists.amount;
        cooperativeWallet.totalBalance -= requestExists.amount;
        const paymentUuid = v4();
        paymentModel = this.paymentRepository.create({
          uuid: paymentUuid,
          transactionId: reference,
          status: 'successful',
          amount: requestExists.amount,
          channel: 'withdrawal',
          metadata: JSON.stringify(response.data),
          type: PaymentType.OUTGOING,
          currencies: Currencies.NGN,
        });
        transactionModel = this.transactionRepository.create({
          uuid: v4(),
          type: TransactionType.DEBIT,
          balanceBefore: requestExists.wallet.totalBalance,
          balanceAfter: requestExists.wallet.totalBalance - requestExists.amount,
          amount: requestExists.amount,
          wallet: this.walletsRepository.getReference(requestExists.wallet.uuid),
          walletSnapshot: JSON.stringify(requestExists.wallet),
          payment: this.paymentRepository.getReference(paymentUuid),
          user: requestExists.user,
          remark: `Withdrawal from ${requestExists.cooperative.name} to ${requestExists.accountName}`,
        });
        const coopTransactionModel = this.transactionRepository.create({
          uuid: v4(),
          type: TransactionType.DEBIT,
          balanceBefore: cooperativeWallet.totalBalance,
          balanceAfter: cooperativeWallet.totalBalance - requestExists.amount,
          amount: requestExists.amount,
          wallet: cooperativeWallet,
          walletSnapshot: JSON.stringify(cooperativeWallet),
          payment: this.paymentRepository.getReference(paymentUuid),
          user: requestExists.user,
          remark: `Withdrawal from ${requestExists.cooperative.name} to ${requestExists.accountName}`
        });
        em.persist(walletModel);
        em.persist(paymentModel);
        em.persist(transactionModel);
        em.persist(coopTransactionModel);
        await em.flush();
      } else {
        paymentModel = this.paymentRepository.create({
          uuid: v4(),
          transactionId: reference,
          status: 'failed',
          amount: requestExists.amount,
          channel: 'withdrawal',
          metadata: JSON.stringify(response.data),
          type: PaymentType.OUTGOING,
          currencies: Currencies.NGN,
        });
        em.persist(paymentModel);
        await em.flush();
        throw new HttpException(
          'Transaction Failed',
          HttpStatus.EXPECTATION_FAILED,
        );
      }
    });
    return paymentModel;
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
      applicationExists.reviewedAt = new Date();
      applicationExists.reviewedBy = this.usersRepository.getReference(uuid);
      applicationExists.rejectionReason = reason;
      applicationExists.status = ApplicationStatus.REJECTED;
      await em.flush();
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
      requestExists.reviewedAt = new Date();
      requestExists.reviewedBy = this.usersRepository.getReference(uuid);
      requestExists.rejectionReason = reason;
      requestExists.status = ApplicationStatus.REJECTED;
      await em.flush();
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
    return paymentModel;
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
    return this.walletService.creditWallet({
      walletUuid,
      amount: paymentExists.amount,
      paymentUuid: paymentExists.uuid,
      userUuid: uuid,
      remark: `Credit for '${walletExists.title}' wallet by cooperative manager`,
    });
  }

  async fetchTransactions(cooperativeUuid: string, walletUuid: string, { uuid }: IAuthContext) {
    await this.cooperativeGuard(cooperativeUuid, uuid);
    return this.transactionRepository.find({
      wallet: { uuid: walletUuid },
    });
  }

  async withdraw(cooperativeUuid: string, walletUuid: string, body: PaymentInfo, { uuid }: IAuthContext) {
    await this.cooperativeGuard(cooperativeUuid, uuid);
    let paymentModel: Payments;
    await this.em.transactional(async (em) => {
      const cooperativeModel = await this.cooperativesRepository.findOne({ uuid: cooperativeUuid });
      const walletExists = await this.walletsRepository.findOne({
        uuid: walletUuid,
      });
      if (!walletExists)
        throw new NotFoundException(
          `Wallet with uuid: '${walletUuid}' does not exist`,
        );
      const amountWithCharge = this.paymentProvider.calculatePayoutAmount(
        body.amount,
      );
      if (amountWithCharge > walletExists.availableBalance) {
        throw new NotAcceptableException('Insufficient balance');
      }
      if (body.amount < 50)
        throw new NotAcceptableException('You cannot withdraw less than 50');
      if (body.amount > 500000)
        throw new NotAcceptableException(
          'You cannot withdraw more than 500,000 at once',
        );
      const reference = nanoid();
      const response = await this.paymentProvider.payout({
        amount: body.amount,
        bankCode: cooperativeModel.bankCode,
        accountNumber: cooperativeModel.accountNo,
        accountName: cooperativeModel.accountName,
        reference,
        narration: `Withdrawal from ${cooperativeModel.name}`,
      });
      console.log("response", response);
      const walletModel = await this.walletsRepository.findOne({ uuid: walletUuid });
      let transactionModel: Transactions;
      if (response.status === 'success') {
        walletModel.totalBalance -= body.amount;
        const paymentUuid = v4();
        paymentModel = this.paymentRepository.create({
          uuid: paymentUuid,
          transactionId: reference,
          status: 'successful',
          amount: body.amount,
          channel: 'withdrawal',
          metadata: JSON.stringify(response.data),
          type: PaymentType.OUTGOING,
          currencies: Currencies.NGN,
        });
        transactionModel = this.transactionRepository.create({
          uuid: v4(),
          type: TransactionType.DEBIT,
          balanceBefore: walletModel.totalBalance,
          balanceAfter: walletModel.totalBalance - body.amount,
          amount: body.amount,
          wallet: this.walletsRepository.getReference(walletModel.uuid),
          walletSnapshot: JSON.stringify(walletModel),
          payment: this.paymentRepository.getReference(paymentUuid),
          user: this.usersRepository.getReference(uuid),
          remark: `Withdrawal from ${cooperativeModel.name}`,
        });
        em.persist(walletModel);
        em.persist(paymentModel);
        em.persist(transactionModel);
        await em.flush();
      } else {
        paymentModel = this.paymentRepository.create({
          uuid: v4(),
          transactionId: reference,
          status: 'failed',
          amount: body.amount,
          channel: 'withdrawal',
          metadata: JSON.stringify(response.data),
          type: PaymentType.OUTGOING,
          currencies: Currencies.NGN,
        });
        em.persist(paymentModel);
        await em.flush();
        throw new HttpException(
          'Transaction Failed',
          HttpStatus.EXPECTATION_FAILED,
        );
      }
    });
    return paymentModel;
  }

  async fetchLoans(cooperativeUuid: string, filter: LoanFilter, { uuid }: IAuthContext) {
    await this.cooperativeGuard(cooperativeUuid, uuid);
    return this.loansRepository.find({
      cooperative: { uuid: cooperativeUuid },
      ...(filter?.status ? { status: filter?.status } : {})
    });
  }

  async fetchPendingLoans(cooperativeUuid: string, { uuid }: IAuthContext) {
    await this.cooperativeGuard(cooperativeUuid, uuid);
    return this.loansRepository.find({
      cooperative: { uuid: cooperativeUuid },
      status: LoanStatus.PENDING
    });
  }

  async approveLoan(cooperativeUuid: string, loanUuid: string, { uuid }: IAuthContext) {
    await this.cooperativeGuard(cooperativeUuid, uuid);
    await this.em.transactional(async (em) => {
      const loanExists = await this.loansRepository.findOne({
        uuid: loanUuid,
        cooperative: { uuid: cooperativeUuid }
      });
      if (!loanExists) throw new NotFoundException('Loan not found');
      if (![LoanStatus.PENDING, LoanStatus.REJECTED].includes(loanExists.status)) throw new ForbiddenException(`Cannot update loan`);
      const cooperativeWallets = await this.walletsRepository.find({
        cooperative: loanExists.cooperative,
        user: null,
      });
      const combinedBalances = cooperativeWallets.reduce((prev, cur) => {
        prev += cur.availableBalance;
        return prev;
      }, 0);
      if (loanExists.requestedAmount > combinedBalances) throw new NotAcceptableException('Insufficient balance');
      const reference = nanoid();
      const response = await this.paymentProvider.payout({
        amount: loanExists.requestedAmount,
        bankCode: loanExists.bankCode,
        accountNumber: loanExists.accountNumber,
        accountName: loanExists.accountName,
        reference,
        narration: `Loan from ${loanExists.cooperative.name} to ${loanExists.user.lastName} (${loanExists.user.phoneNumber})`,
      });
      console.log("response", response);
      if (response.status === 'success') {
        const walletsCharged = deductAmountFromWallets(cooperativeWallets, loanExists.requestedAmount);
        const paymentUuid = v4();
        const paymentModel = this.paymentRepository.create({
          uuid: paymentUuid,
          transactionId: reference,
          status: 'successful',
          amount: loanExists.requestedAmount,
          channel: 'loan',
          metadata: JSON.stringify(response.data),
          type: PaymentType.OUTGOING,
          currencies: Currencies.NGN,
        });
        for (const walletCharged of walletsCharged) {
          const transactionModel = this.transactionRepository.create({
            uuid: v4(),
            type: TransactionType.DEBIT,
            balanceBefore: walletCharged.wallet.totalBalance,
            balanceAfter: walletCharged.wallet.totalBalance - walletCharged.amount,
            amount: walletCharged.amount,
            wallet: this.walletsRepository.getReference(walletCharged.wallet.uuid),
            walletSnapshot: JSON.stringify(walletCharged),
            payment: this.paymentRepository.getReference(paymentUuid),
            user: this.usersRepository.getReference(uuid),
            remark: `Loan from ${loanExists.cooperative.name} to ${loanExists.user.lastName} (${loanExists.user.phoneNumber})`,
          });
          em.persist(transactionModel);
        }
        loanExists.balance = loanExists.requestedAmount;
        loanExists.startDate = moment().format("YYYY-MM-DD") as any;
        loanExists.endDate = moment().add(1, "year").format("YYYY-MM-DD") as any;
        loanExists.status = LoanStatus.ACTIVE;
        loanExists.reviewedBy = this.usersRepository.getReference(uuid);
        loanExists.reviewedAt = new Date();
        loanExists.rejectionReason = null;
        em.persist(paymentModel);
        await em.flush();
      } else {
        const paymentModel = this.paymentRepository.create({
          uuid: v4(),
          transactionId: reference,
          status: 'failed',
          amount: loanExists.requestedAmount,
          channel: 'loan',
          metadata: JSON.stringify(response.data),
          type: PaymentType.OUTGOING,
          currencies: Currencies.NGN,
        });
        em.persist(paymentModel);
        await em.flush();
        throw new HttpException(
          'Transaction Failed',
          HttpStatus.EXPECTATION_FAILED,
        );
      }
    });
  }

  async rejectLoan(cooperativeUuid: string, loanUuid: string, { reason }: RejectApplicationDto, { uuid }: IAuthContext) {
    await this.cooperativeGuard(cooperativeUuid, uuid);
    await this.em.transactional(async (em) => {
      const loanExists = await this.loansRepository.findOne({
        uuid: loanUuid,
        cooperative: { uuid: cooperativeUuid }
      });
      if (!loanExists) throw new NotFoundException('Loan not found');
      if (![LoanStatus.PENDING].includes(loanExists.status)) throw new ForbiddenException(`Cannot update loan`);
      loanExists.status = LoanStatus.REJECTED;
      loanExists.reviewedBy = this.usersRepository.getReference(uuid);
      loanExists.reviewedAt = new Date();
      loanExists.rejectionReason = reason;
      await em.flush();
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
