import {
  Body,
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCooperativeApplicationDto, CreateUserDto } from './users.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { Role } from 'src/types';
import { Request } from 'express';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  register(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Get('cooperatives/:role')
  @UseGuards(JwtAuthGuard)
  fetchCooperatives(
    @Param('role', new ParseEnumPipe(Role)) role: Role,
    @Req() request: Request,
  ) {
    return this.usersService.fetchCooperatives(role, request.user as any);
  }

  @Post('cooperative-application/:uuid')
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
}
