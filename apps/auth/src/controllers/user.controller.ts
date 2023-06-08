import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { LoginDTO } from '../dto/login.dto';
import { RegisterDTO } from '../dto/user.dto';

@Controller('api/v1/auth')
export class UserController {
  constructor(private readonly authService: UserService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() user: LoginDTO) {
    return await this.authService.login(user);
  }
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() user: RegisterDTO) {
    return await this.authService.register(user);
  }
}
