import { IsNotEmpty, IsString } from 'class-validator';

export class BrandDtoIn {
  @IsNotEmpty()
  @IsString()
  name: string;
}
