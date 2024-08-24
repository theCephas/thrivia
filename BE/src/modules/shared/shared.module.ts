import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  MonnifyConfiguration,
  PaymentProviderConfiguration,
  SmtpConfiguration,
  TermiiConfiguration,
} from 'src/config/configuration';
import PaymentFactory from './payment-providers/payment-provider.factory';
import { SharedService } from './shared.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { NotificationTemplates } from 'src/entities/notification-templates.entity';

@Module({
  imports: [
    ConfigModule.forFeature(TermiiConfiguration),
    ConfigModule.forFeature(MonnifyConfiguration),
    ConfigModule.forFeature(PaymentProviderConfiguration),
    ConfigModule.forFeature(SmtpConfiguration),
    MikroOrmModule.forFeature({
      entities: [NotificationTemplates],
    }),
  ],
  providers: [SharedService, PaymentFactory],
  exports: [SharedService, PaymentFactory],
})
export class SharedModule {}
