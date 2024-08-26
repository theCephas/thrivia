import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { BankDetailsDto } from './wallets.dto';
import { WalletsService } from './wallets.service';

@Controller('wallets')
@ApiTags('wallets')
@ApiBearerAuth()
export class WalletController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get('banks')
  @UseGuards(JwtAuthGuard)
  getAllBanks() {
    return this.walletsService.getAllBanks();
  }

  @Post('verify-bank-details')
  @UseGuards(JwtAuthGuard)
  verifyBankDetails(@Body() body: BankDetailsDto) {
    return this.walletsService.verifyBankDetails(body);
  }
}
