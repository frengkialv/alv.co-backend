import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import {
  CreateUserDtoIn,
  LoginUserDtoIn,
  LoginUserDtoOut,
} from './dto/user.dto';
import { PasswordHash } from '../security/password-hash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    private passwordHash: PasswordHash,
  ) {}

  async createUser(payload: CreateUserDtoIn) {
    const MINIMUM_USERNAME_LENGTH = 5;
    const MINIMUM_PASSWOED_LENGTH = 5;

    if (payload.username.length < 5) {
      throw new HttpException(
        `Minimum username length should be ${MINIMUM_USERNAME_LENGTH} character`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (payload.password.length < 5) {
      throw new HttpException(
        `Minimum password length should be ${MINIMUM_PASSWOED_LENGTH} character`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const findDuplicateUser = await this.userRepository.findOne({
      where: [{ username: payload.username }, { email: payload.email }],
    });

    if (findDuplicateUser) {
      throw new HttpException(
        'Username or email already used',
        HttpStatus.CONFLICT,
      );
    }

    const hashPassword = await this.passwordHash.hash(payload.password);

    const createUser = this.userRepository.create({
      username: payload.username,
      email: payload.email,
      password: hashPassword,
      name: payload.name,
    });

    await this.userRepository.save(createUser);

    return createUser;
  }

  async login(payload: LoginUserDtoIn): Promise<LoginUserDtoOut | null> {
    const findUser = await this.userRepository.findOne({
      where: [{ email: payload.email }, { username: payload.username }],
    });

    return findUser;
  }
}
