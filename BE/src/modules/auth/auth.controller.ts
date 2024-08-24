import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  LoginDTO,
  NewResetPasswordDto,
  RefreshTokenDto,
  ResetPasswordDto,
  SendOtpDto,
  VerifyOtpDto,
} from './auth.dto';
import { LocalAuthGuard } from 'src/guards/local-auth-guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { extractTokenFromReq } from 'src/utils';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Body() _body: LoginDTO, @Req() req: any) {
    return this.authService.login(req.user);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  refresh(@Body() { refreshToken }: RefreshTokenDto) {
    return this.authService.refresh(refreshToken);
  }

  @Post('verity-otp')
  verifyOtp(@Body() body: VerifyOtpDto) {
    return this.authService.verifyOtp(body);
  }

  @Post('send-otp')
  sendOtp(@Body() body: SendOtpDto) {
    return this.authService.sendOtp(body);
  }

  @Post('initiate-reset-password')
  initiateResetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.initiateResetPassword(body);
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  changePassword(@Body() body: ChangePasswordDto, @Req() req: any) {
    return this.authService.changePassword(body, req.user);
  }

  @Post('reset-password')
  resetPassword(@Body() body: NewResetPasswordDto, @Req() req: Request) {
    const token = extractTokenFromReq(
      req,
      'Kindly provide a valid access token to reset your password',
    );
    return this.authService.resetPassword(body, token);
  }
}
