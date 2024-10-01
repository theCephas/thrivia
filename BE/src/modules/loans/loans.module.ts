import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Cooperatives, CooperativeUsers, Payments } from "../cooperatives/cooperatives.entity";
import { LoanHistory, Loans } from "./loans.entity";
import { LoansController } from "./loans.controller";
import { LoanService } from "./loans.service";
import { Users } from "../users/users.entity";
import { Transactions, Wallets } from "../wallets/wallets.entity";
import { WalletsModule } from "../wallets/wallets.module";

@Module({
  imports: [MikroOrmModule.forFeature({
    entities: [
      Cooperatives,
      CooperativeUsers,
      Users,
      Loans,
      LoanHistory,
      Payments,
      Transactions,
      Wallets
    ],
  }),
    WalletsModule
  ],
  controllers: [LoansController],
  providers: [LoanService],
  exports: [LoanService]
})
export class LoansModule {}