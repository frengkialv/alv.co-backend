import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDtoIn {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginUserDtoIn {
  username: string | null;

  email: string | null;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginUserDtoOut {
  @IsString()
  id: string;

  username: string | null;

  email: string | null;

  @IsNotEmpty()
  @IsString()
  password: string;
}
