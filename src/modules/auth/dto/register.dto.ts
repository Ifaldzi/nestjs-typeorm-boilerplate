import { AutoMap } from '@automapper/classes';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDTO {
  @AutoMap()
  @IsNotEmpty()
  name: string;

  @AutoMap()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @AutoMap()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
