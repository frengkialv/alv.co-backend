import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDtoIn } from '../user/dto/user.dto';
import { BaseDto } from 'src/common/dto/base.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() payload: LoginUserDtoIn) {
    const result = await this.authService.login(payload);

    return new BaseDto('Successfully login', result);
  }
}
