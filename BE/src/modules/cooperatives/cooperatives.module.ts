import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import {
  CooperativeApplications,
  Cooperatives,
  CooperativeUsers,
} from './cooperatives.entity';
import { CooperativesController } from './cooperatives.controller';
import { CooperativesService } from './cooperatives.service';
import { Wallets } from '../wallets/wallets.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [
        Cooperatives,
        CooperativeUsers,
        Wallets,
        CooperativeApplications,
      ],
    }),
  ],
  controllers: [CooperativesController],
  providers: [CooperativesService],
  exports: [CooperativesService],
})
export class CooperativesModule {}
