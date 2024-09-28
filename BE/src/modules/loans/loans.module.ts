import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Cooperatives, CooperativeUsers } from "../cooperatives/cooperatives.entity";
import { LoanHistory, Loans } from "./loans.entity";
import { LoansController } from "./loans.controller";
import { LoanService } from "./loans.service";

@Module({
  imports: [MikroOrmModule.forFeature({
    entities: [
      Cooperatives,
      CooperativeUsers,
      Loans,
      LoanHistory
    ],
  })
  ],
  controllers: [LoansController],
  providers: [LoanService],
  exports: [LoanService]
})
export class LoansModule {}