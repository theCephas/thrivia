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
import { CreateCooperativeDto, RejectApplicationDto } from './cooperatives.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { Request } from 'express';
import { CooperativesService } from './cooperatives.service';

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
}
