import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginUserDtoIn } from '../user/dto/user.dto';
import { PasswordHash } from '../security/password-hash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordHash: PasswordHash,
    private jwtService: JwtService,
  ) {}

  async login(payload: LoginUserDtoIn) {
    const user = await this.userService.login(payload);
    const validationPassword = await this.passwordHash.compare(
      payload.password,
      user.password,
    );

    if (!validationPassword) {
      throw new HttpException(
        'Incorect username or pasword',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const userPayload = { id: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(userPayload),
    };
  }
}
