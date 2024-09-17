import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { CreateUserDtoIn } from './dto/user.dto';
import { BaseDto } from 'src/common/dto/base.dto';
import { AuthGuard, IAuthRequest } from '../auth/auth.guard';

@Controller('user')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('find')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async findUser(@Req() request: IAuthRequest) {
    const users = await this.userService.findUser(request.user.id);

    return new BaseDto('Success find user', users);
  }

  @Post('signin')
  @HttpCode(201)
  async createUser(@Body() payload: CreateUserDtoIn) {
    const createUser = await this.userService.createUser(payload);

    return new BaseDto('Sucess create new user', createUser);
  }
}
