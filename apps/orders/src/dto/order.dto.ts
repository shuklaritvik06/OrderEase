import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDTO {
  @IsString()
  @IsNotEmpty()
  product_id: string;
  @IsString()
  @IsNotEmpty()
  product: string;
  @IsNumber()
  @IsNotEmpty()
  price: string;
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsString()
  @IsNotEmpty()
  phone: string;
}

export class UpdateDTO extends CreateDTO {}
