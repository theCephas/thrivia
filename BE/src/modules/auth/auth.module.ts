import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { JwtAuthConfiguration } from 'src/config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthConfig } from 'src/config/types/jwt-auth.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OTP, Users } from '../users/users.entity';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { ExpiredJwtStrategy } from 'src/strategies/expired-jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule.forFeature(JwtAuthConfiguration),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(JwtAuthConfiguration)],
      useFactory: (jwtAuthConfig: ConfigType<typeof JwtAuthConfiguration>) => ({
        secret: jwtAuthConfig.secretKey,
        signOptions: { expiresIn: '1h' },
      }),
      inject: [JwtAuthConfiguration.KEY],
    }),
    MikroOrmModule.forFeature({ entities: [Users, OTP] }),
    SharedModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, ExpiredJwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
