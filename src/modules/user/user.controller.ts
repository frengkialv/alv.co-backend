import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { CreateUserDtoIn } from './dto/user.dto';
import { BaseDto } from 'src/common/dto/base.dto';

@Controller('user')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signin')
  @HttpCode(201)
  async createUser(@Body() payload: CreateUserDtoIn) {
    const createUser = await this.userService.createUser(payload);

    return new BaseDto('Sucess create new user', createUser);
  }
}
