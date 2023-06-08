import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  username: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
