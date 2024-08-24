import { Body, Controller, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./users.dto";
import { UsersService } from "./users.service";

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Post()
  register(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }
}