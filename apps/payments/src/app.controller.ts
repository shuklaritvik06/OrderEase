import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly paymentService: AppService) {}
  @Get()
  getStatus() {
    return this.paymentService.getStatus();
  }
}
