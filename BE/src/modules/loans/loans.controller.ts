import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { JwtAuthGuard } from "src/guards/jwt-auth-guard";
import { CancelLoanDto, CreateLoanDto, LoanQuery, UpdateLoanDto } from "./loans.dto";
import { LoanService } from "./loans.service";
import { DepositMoneyDto } from "../cooperatives/cooperatives.dto";

@Controller('loans')
@ApiTags('loans')
@ApiBearerAuth()
export class LoansController {
  constructor(private readonly loanService: LoanService) { }
  
  @Post()
  @UseGuards(JwtAuthGuard)
  createLoanApplication(@Body() body: CreateLoanDto, @Req() request: Request) {
    return this.loanService.createLoanApplication(body, request.user as any);
  }

  @Put('cancel/:uuid')
  @UseGuards(JwtAuthGuard)
  cancelLoanApplication(@Param('uuid') uuid: string, @Body() body: CancelLoanDto, @Req() request: Request) {
    return this.loanService.cancelLoanApplication(uuid, body, request.user as any);
  }

  @Put('repay/:uuid')
  @UseGuards(JwtAuthGuard)
  repayLoan(@Param('uuid') uuid: string, @Body() body: DepositMoneyDto, @Req() request: Request) {
    return this.loanService.repayLoan(uuid, body, request.user as any);
  }

  @Put(':uuid')
  @UseGuards(JwtAuthGuard)
  updateLoanApplication(@Param('uuid') uuid: string, @Body() body: UpdateLoanDto, @Req() request: Request) {
    return this.loanService.updateLoanApplication(uuid, body, request.user as any);
  }

  @Get(':uuid')
  @UseGuards(JwtAuthGuard)
  getLoanApplication(@Param('uuid') uuid: string, @Req() request: Request) {
    return this.loanService.getLoanApplication(uuid, request.user as any);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  fetchLoans(@Query() query: LoanQuery, @Req() request: Request) {
    return this.loanService.fetchLoans(query.filter, request.user as any);
  }

  @Get('active-loan')
  @UseGuards(JwtAuthGuard)
  fetchActiveLoan(@Req() request: Request) {
    return this.loanService.fetchActiveLoan(request.user as any);
  }

  @Get('pending-loans')
  @UseGuards(JwtAuthGuard)
  fetchPendingLoans(@Req() request: Request) {
    return this.loanService.fetchPendingLoans(request.user as any);
  }
}