import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Wallets } from "./wallets.entity";
import { WalletController } from "./wallets.controller";
import { WalletsService } from "./wallets.service";
import { SharedModule } from "../shared/shared.module";

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Wallets] }), SharedModule],
  controllers: [WalletController],
  providers: [WalletsService],
  exports: [WalletsService]
})
export class WalletsModule {}