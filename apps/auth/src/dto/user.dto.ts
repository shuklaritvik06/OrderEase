import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  fname: string;
  @IsString()
  @IsNotEmpty()
  lname: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsNumber()
  @IsNotEmpty()
  @MaxLength(10)
  phone: number;
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  username: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
