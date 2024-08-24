import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PaymentProvider } from './payment-provider.contract';
import { PaymentProviderType } from 'src/types';
import { MonnifyProvider } from './providers';
import {
  MonnifyConfiguration,
  PaymentProviderConfiguration,
} from 'src/config/configuration';

@Injectable()
export default class PaymentFactory {
  constructor(
    @Inject(PaymentProviderConfiguration.KEY)
    private readonly paymentProviderConfig: ConfigType<
      typeof PaymentProviderConfiguration
    >,
    @Inject(MonnifyConfiguration.KEY)
    private readonly monnifyConfig: ConfigType<typeof MonnifyConfiguration>,
  ) {}

  public getProvider(): PaymentProvider {
    let provider: PaymentProvider;
    switch (this.paymentProviderConfig.providerId) {
      case PaymentProviderType.MONNIFY:
        provider = new MonnifyProvider(this.monnifyConfig);
        break;
    }
    return provider;
  }
}
