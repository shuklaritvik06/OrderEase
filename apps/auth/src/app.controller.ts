import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AppService) {}
  @Get()
  getStatus() {
    return this.authService.getStatus();
  }
}
