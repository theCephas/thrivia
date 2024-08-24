import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Users } from "./users.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SharedModule } from "../shared/shared.module";

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [Users],
    }),
    SharedModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}