import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateCooperativeApplicationDto,
  CreateUserDto,
  WithdrawalRequestDto,
} from './users.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { Request } from 'express';
import { DepositMoneyDto } from '../cooperatives/cooperatives.dto';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  register(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Get('cooperatives')
  @UseGuards(JwtAuthGuard)
  fetchCooperatives(
    @Req() request: Request,
  ) {
    return this.usersService.fetchCooperatives(request.user as any);
  }

  @Post('cooperative-application')
  @UseGuards(JwtAuthGuard)
  submitCooperativeApplication(
    @Body() body: CreateCooperativeApplicationDto,
    @Req() request: Request,
  ) {
    return this.usersService.submitCooperativeApplication(
      body,
      request.user as any,
    );
  }

  @Get('cooperative/:uuid/application')
  @UseGuards(JwtAuthGuard)
  fetchCooperativeApplication(
    @Param('uuid') uuid: string,
    @Req() request: Request,
  ) {
    return this.usersService.fetchCooperativeApplication(
      uuid,
      request.user as any,
    );
  }

  @Get('cooperative-applications')
  @UseGuards(JwtAuthGuard)
  fetchCooperativeApplications(@Req() request: Request) {
    return this.usersService.fetchCooperativeApplications(request.user as any);
  }

  @Get('cooperative/:uuid/wallets')
  @UseGuards(JwtAuthGuard)
  fetchWallets(@Param('uuid') uuid: string, @Req() request: Request) {
    return this.usersService.fetchWallets(uuid, request.user as any);
  }

  @Post('wallets/:uuid/deposit')
  @UseGuards(JwtAuthGuard)
  depositMoney(
    @Param('uuid') uuid: string,
    @Body() body: DepositMoneyDto,
    @Req() request: Request,
  ) {
    return this.usersService.depositMoney(uuid, body, request.user as any);
  }

  @Post('wallets/:uuid/withdrawal-request')
  @UseGuards(JwtAuthGuard)
  submitWithdrawalRequest(
    @Param('uuid') uuid: string,
    @Body() body: WithdrawalRequestDto,
    @Req() request: Request,
  ) {
    return this.usersService.submitWithdrawalRequest(
      uuid,
      body,
      request.user as any,
    );
  }

  @Get('wallets/:uuid/withdrawal-requests')
  @UseGuards(JwtAuthGuard)
  fetchWithdrawalRequests(
    @Param('uuid') uuid: string,
    @Req() request: Request,
  ) {
    return this.usersService.fetchWithdrawalRequests(uuid, request.user as any);
  }

  @Get('wallets/:uuid/transactions')
  @UseGuards(JwtAuthGuard)
  fetchTransactions(@Param('uuid') uuid: string, @Req() request: Request) {
    return this.usersService.fetchTransactions(uuid, request.user as any);
  }

  @Post('set-active-cooperative')
  @UseGuards(JwtAuthGuard)
  setActiveCooperative(@Req() request: Request, @Body('coopUuid') coopUuid: string) {
    return this.usersService.setActiveCooperative(coopUuid, request.user as any);
  }
}
