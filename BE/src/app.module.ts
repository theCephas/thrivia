import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AddCorrelationIdInterceptor } from './lib/add-correlation-id-interceptor';
import { TimeoutInterceptor } from './lib/timeout.interceptor';
import { RequestLoggerMiddleware } from './middleware/request-logger-middleware';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validator';
import { DatabaseModule } from './database.module';
import { SharedModule } from './modules/shared/shared.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CooperativesModule } from './modules/cooperatives/cooperatives.module';
import { CacheModule } from '@nestjs/cache-manager';
import { WalletsModule } from './modules/wallets/wallets.module';
import { ScheduleModule } from '@nestjs/schedule';
import CronModule from './modules/cron/cron.module';
import { LoansModule } from './modules/loans/loans.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: '.env',
    }),
    DatabaseModule.forRoot(),
    CacheModule.register({ isGlobal: true }),
    ScheduleModule.forRoot(),
    SharedModule,
    UsersModule,
    AuthModule,
    CooperativesModule,
    WalletsModule,
    CronModule,
    LoansModule
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: AddCorrelationIdInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
