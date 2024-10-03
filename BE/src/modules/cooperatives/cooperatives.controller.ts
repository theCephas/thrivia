import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateCooperativeDto,
  DepositMoneyDto,
  PaymentInfo,
  RejectApplicationDto,
} from './cooperatives.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { Request } from 'express';
import { CooperativesService } from './cooperatives.service';
import { ExpiredJwtAuthGuard } from 'src/guards/expired-jwt-auth-guard';
import { LoanQuery } from '../loans/loans.dto';

@Controller('cooperatives')
@ApiTags('cooperatives')
@ApiBearerAuth()
export class CooperativesController {
  constructor(private readonly cooperativesService: CooperativesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  register(@Body() body: CreateCooperativeDto, @Req() request: Request) {
    return this.cooperativesService.createCooperative(
      body,
      request.user as any,
    );
  }

  @Get(':uuid/wallets')
  @UseGuards(JwtAuthGuard)
  fetchWallets(@Param('uuid') uuid: string, @Req() request: Request) {
    return this.cooperativesService.fetchWallets(uuid, request.user as any);
  }

  @Get(':uuid/applications')
  @UseGuards(JwtAuthGuard)
  fetchApplications(@Param('uuid') uuid: string, @Req() request: Request) {
    return this.cooperativesService.fetchApplications(
      uuid,
      request.user as any,
    );
  }

  @Get(':uuid/members')
  @UseGuards(JwtAuthGuard)
  fetchMembers(@Param('uuid') uuid: string, @Req() request: Request) {
    return this.cooperativesService.fetchMembers(uuid, request.user as any);
  }

  @Get(':uuid/withdrawal-requests')
  @UseGuards(JwtAuthGuard)
  fetchWithdrawalRequests(
    @Param('uuid') uuid: string,
    @Req() request: Request,
  ) {
    return this.cooperativesService.fetchWithdrawalRequests(
      uuid,
      request.user as any,
    );
  }

  @Post(':uuid/application/:applicationUuid/approve')
  @UseGuards(JwtAuthGuard)
  approveApplication(
    @Param('uuid') uuid: string,
    @Param('applicationUuid') applicationUuid: string,
    @Req() request: Request,
  ) {
    return this.cooperativesService.approveApplication(
      uuid,
      applicationUuid,
      request.user as any,
    );
  }

  @Post(':uuid/withdrawal-request/:requestUuid/approve')
  @UseGuards(JwtAuthGuard)
  approveWithdrawalRequest(
    @Param('uuid') uuid: string,
    @Param('requestUuid') requestUuid: string,
    @Req() request: Request,
  ) {
    return this.cooperativesService.approveWithdrawalRequest(
      uuid,
      requestUuid,
      request.user as any,
    );
  }

  @Post(':uuid/application/:applicationUuid/reject')
  @UseGuards(JwtAuthGuard)
  rejectApplication(
    @Param('uuid') uuid: string,
    @Param('applicationUuid') applicationUuid: string,
    @Body() body: RejectApplicationDto,
    @Req() request: Request,
  ) {
    return this.cooperativesService.rejectApplication(
      uuid,
      applicationUuid,
      body,
      request.user as any,
    );
  }

  @Post(':uuid/withdrawal-request/:requestUuid/reject')
  @UseGuards(JwtAuthGuard)
  rejectWithdrawalRequest(
    @Param('uuid') uuid: string,
    @Param('requestUuid') requestUuid: string,
    @Body() body: RejectApplicationDto,
    @Req() request: Request,
  ) {
    return this.cooperativesService.rejectWithdrawalRequest(
      uuid,
      requestUuid,
      body,
      request.user as any,
    );
  }

  @Get(':uuid/application/:applicationUuid')
  @UseGuards(JwtAuthGuard)
  getApplicationDetails(
    @Param('uuid') uuid: string,
    @Param('applicationUuid') applicationUuid: string,
    @Req() request: Request,
  ) {
    return this.cooperativesService.getApplicationDetails(
      uuid,
      applicationUuid,
      request.user as any,
    );
  }

  @Get(':uuid/withdrawal-request/:requestUuid')
  @UseGuards(JwtAuthGuard)
  getWithdrawalRequestDetails(
    @Param('uuid') uuid: string,
    @Param('requestUuid') requestUuid: string,
    @Req() request: Request,
  ) {
    return this.cooperativesService.getWithdrawalRequestDetails(
      uuid,
      requestUuid,
      request.user as any,
    );
  }

  @Post('verify-transaction/:transactionId')
  @UseGuards(ExpiredJwtAuthGuard)
  verifyPayment(
    @Param('transactionId') transactionId: string,
    @Body() paymentInfo: PaymentInfo,
  ) {
    return this.cooperativesService.verifyTransaction(
      transactionId,
      paymentInfo,
    );
  }

  @Post(':uuid/wallets/:walletUuid/deposit')
  @UseGuards(JwtAuthGuard)
  depositMoney(
    @Param('uuid') uuid: string,
    @Param('walletUuid') walletUuid: string,
    @Body() body: DepositMoneyDto,
    @Req() request: Request,
  ) {
    return this.cooperativesService.depositMoney(
      uuid,
      walletUuid,
      body,
      request.user as any,
    );
  }

  @Get(':uuid/wallets/:walletUuid/transactions')
  @UseGuards(JwtAuthGuard)
  fetchTransactions(@Param('uuid') uuid: string, @Param('walletUuid') walletUuid: string, @Req() request: Request) {
    return this.cooperativesService.fetchTransactions(uuid, walletUuid, request.user as any);
  }

  @Post(':uuid/wallets/:walletUuid/withdraw')
  @UseGuards(JwtAuthGuard)
  withdraw(@Param('uuid') uuid: string, @Param('walletUuid') walletUuid: string, @Body() body: PaymentInfo, @Req() request: Request) {
    return this.cooperativesService.withdraw(uuid, walletUuid, body, request.user as any);
  }

  @Get(':uuid/loans')
  @UseGuards(JwtAuthGuard)
  fetchLoans(@Param('uuid') uuid: string, @Query() query: LoanQuery, @Req() request: Request) {
    return this.cooperativesService.fetchLoans(uuid, query.filter, request.user as any);
  }

  @Get(':uuid/pending-loans')
  @UseGuards(JwtAuthGuard)
  fetchPendingLoans(@Param('uuid') uuid: string, @Req() request: Request) {
    return this.cooperativesService.fetchPendingLoans(uuid, request.user as any);
  }

  @Post(':uuid/loans/:loanUuid/approve')
  @UseGuards(JwtAuthGuard)
  approveLoan(@Param('uuid') uuid: string, @Param('loanUuid') loanUuid: string, @Req() request: Request) {
    return this.cooperativesService.approveLoan(uuid, loanUuid, request.user as any);
  }

  @Post(':uuid/loans/:loanUuid/reject')
  @UseGuards(JwtAuthGuard)
  rejectLoan(@Param('uuid') uuid: string, @Param('loanUuid') loanUuid: string, @Body() body: RejectApplicationDto, @Req() request: Request) {
    return this.cooperativesService.rejectLoan(uuid, loanUuid, body, request.user as any);
  }
}
