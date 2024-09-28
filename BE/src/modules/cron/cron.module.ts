import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Transactions, Wallets } from "../wallets/wallets.entity";
import { CronTasksService } from "./cron-tasks.service";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [UsersModule, MikroOrmModule.forFeature({ entities: [Wallets, Transactions] })],
  providers: [CronTasksService]
})
export default class CronModule {}