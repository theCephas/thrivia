import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { JwtAuthGuard } from "src/guards/jwt-auth-guard";
import { CancelLoanDto, CreateLoanDto, UpdateLoanDto } from "./loans.dto";
import { LoanService } from "./loans.service";

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
  fetchLoans(@Req() request: Request) {
    return this.loanService.fetchLoans(request.user as any);
  }
}