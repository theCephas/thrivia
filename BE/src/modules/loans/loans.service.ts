import { InjectRepository } from "@mikro-orm/nestjs";
import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Cooperatives, CooperativeUsers, Payments } from "../cooperatives/cooperatives.entity";
import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { LoanHistory, Loans } from "./loans.entity";
import { CancelLoanDto, CreateLoanDto, LoanFilter, UpdateLoanDto } from "./loans.dto";
import { IAuthContext, LoanStatus } from "src/types";
import { v4 } from "uuid";
import { Users } from "../users/users.entity";
import { DepositMoneyDto } from "../cooperatives/cooperatives.dto";
import { Transactions, Wallets } from "../wallets/wallets.entity";
import { WalletsService } from "../wallets/wallets.service";

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Cooperatives)
    private readonly cooperativesRepository: EntityRepository<Cooperatives>,
    @InjectRepository(CooperativeUsers)
    private readonly cooperativesUsersRepository: EntityRepository<CooperativeUsers>,
    @InjectRepository(Users)
    private readonly usersRepository: EntityRepository<Users>,
    @InjectRepository(Loans)
    private readonly loansRepository: EntityRepository<Loans>,
    @InjectRepository(LoanHistory)
    private readonly loanHistoryRepository: EntityRepository<LoanHistory>,
    @InjectRepository(Payments)
    private readonly paymentRepository: EntityRepository<Payments>,
    @InjectRepository(Transactions)
    private readonly transactionRepository: EntityRepository<Transactions>,
    @InjectRepository(Wallets)
    private readonly walletsRepository: EntityRepository<Wallets>,
    private readonly em: EntityManager,
    private readonly walletService: WalletsService
  ) { }
  
  async createLoanApplication(loan: CreateLoanDto, { uuid }: IAuthContext) {
    let loanModel: Loans;
    await this.em.transactional(async (em) => {
      const userExistsInCooperative = await this.cooperativesUsersRepository.findOne({
        user: { uuid },
        cooperative: loan.cooperativeUuid,
      });
      if (!userExistsInCooperative) throw new ForbiddenException(`Not a member of provided cooperative`);
      const userHasActiveOrPendingLoan = await this.loansRepository.findOne([
        { status: LoanStatus.PENDING, user: { uuid }, cooperative: { uuid: loan.cooperativeUuid } },
        { status: LoanStatus.ACTIVE, user: { uuid }, cooperative: { uuid: loan.cooperativeUuid } },
        { status: LoanStatus.REJECTED, user: { uuid }, cooperative: { uuid: loan.cooperativeUuid } }
      ]);
      if (userHasActiveOrPendingLoan) throw new ConflictException(`Can only have one active or pending loan at a time`);
      // TODO: Ideally we are suppose to calculate user's loan eligibility based on certain factors
      // here but we will skip that for now 
      loanModel = this.loansRepository.create({
        uuid: v4(),
        requestedAmount: loan.amount,
        cooperative: this.cooperativesRepository.getReference(loan.cooperativeUuid),
        user: this.usersRepository.getReference(uuid),
        bankCode: loan.bankCode,
        bankName: loan.bankName,
        accountNumber: loan.accountNumber,
        accountName: loan.accountName,
        purpose: loan.purpose,
        status: LoanStatus.PENDING
      });
      const loanHistoryModel = this.loanHistoryRepository.create({
        uuid: v4(),
        loan: this.loansRepository.getReference(loanModel.uuid),
        action: `Applied for Loan`
      });
      em.persist(loanModel);
      em.persist(loanHistoryModel);
      await em.flush();
    });
    return loanModel;
  }

  async updateLoanApplication(loanUuid: string, loan: UpdateLoanDto, { uuid }: IAuthContext) {
    await this.em.transactional(async (em) => {
      const loanExists = await this.loansRepository.findOne({
        uuid: loanUuid,
        user: { uuid }
      })
      if (!loanExists) throw new NotFoundException('Loan not found');
      if (![LoanStatus.PENDING, LoanStatus.REJECTED].includes(loanExists.status)) throw new ForbiddenException(`Cannot update loan`);
      if (loan.amount) loanExists.requestedAmount = loan.amount;
      if (loan.bankCode) loanExists.bankCode = loan.bankCode;
      if (loan.bankName) loanExists.bankName = loan.bankName;
      if (loan.accountNumber) loanExists.accountNumber = loan.accountNumber;
      if (loan.accountName) loanExists.accountName = loan.accountName;
      if (loan.purpose) loanExists.purpose = loan.purpose;
      loanExists.status = LoanStatus.PENDING;
      await em.flush();
    })
  }  

  async repayLoan(loanUuid: string, { paymentUuid }: DepositMoneyDto, { uuid }: IAuthContext) {
    await this.em.transactional(async (em) => {
      const loanExists = await this.loansRepository.findOne({
        uuid: loanUuid,
        user: { uuid }
      });
      if (!loanExists) throw new NotFoundException('Loan not found');
      if (![LoanStatus.OVERDUE, LoanStatus.ACTIVE].includes(loanExists.status)) throw new ForbiddenException('Cannot update loan');
      const paymentExists = await this.paymentRepository.findOne({ uuid: paymentUuid });
      if (!paymentExists) throw new NotFoundException('Payment not found');
      const transactionExists = await this.transactionRepository.findOne({
        payment: { uuid: paymentUuid },
      });
      if (transactionExists) throw new ConflictException('Duplicate payment');
      const cooperativeWallet = await this.walletsRepository.findOne({
        createdBy: loanExists.cooperative.createdBy,
        cooperative: loanExists.cooperative,
        user: null,
      });
      await this.walletService.creditWallet({
        walletUuid: cooperativeWallet.uuid,
        amount: paymentExists.amount,
        paymentUuid: paymentExists.uuid,
        userUuid: uuid,
        remark: `Loan repayment for: ${loanUuid}`,
      });
      loanExists.balance -= paymentExists.amount;
      if (loanExists.balance <= 0) {
        loanExists.endDate = new Date();
        loanExists.status = LoanStatus.CLOSED;
      }
      await em.flush();
    });
  }

  async cancelLoanApplication(loanUuid: string, { reason }: CancelLoanDto, { uuid }: IAuthContext) {
    await this.em.transactional(async (em) => {
      const loanExists = await this.loansRepository.findOne({
        uuid: loanUuid,
        user: { uuid }
      });
      if (!loanExists) throw new NotFoundException('Loan not found');
      if (![LoanStatus.PENDING, LoanStatus.REJECTED].includes(loanExists.status)) throw new ForbiddenException(`Cannot update loan`);
      loanExists.cancellationReason = reason;
      loanExists.status = LoanStatus.CANCELLED;
      await em.flush();
    })
  }

  async getLoanApplication(loanUuid: string, { uuid }: IAuthContext) {
    const loanExists = await this.loansRepository.findOne({
      uuid: loanUuid,
      user: { uuid }
    });
    if (!loanExists) throw new NotFoundException(`Loan not found`);
    const loanHistory = await this.loanHistoryRepository.find({ loan: { uuid: loanUuid } })
    return { ...loanExists, history: loanHistory } as any;
  }

  async fetchLoans(filter: LoanFilter, { uuid }: IAuthContext) {
    return this.loansRepository.find({
      user: { uuid },
      ...(filter?.status ? { status: { $in: filter?.status.split(',') as any } } : {})
    })
  }

  async fetchActiveLoan({ uuid }: IAuthContext) {
    return this.loansRepository.find({ 
      user: { uuid },
      status: { $in: [LoanStatus.ACTIVE, LoanStatus.OVERDUE] }
     });
  }

  async fetchPendingLoans({ uuid }: IAuthContext) {
    return this.loansRepository.find({
      user: { uuid },
      status: LoanStatus.PENDING
    });
  }
}