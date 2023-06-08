import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly uploaderService: AppService) {}
  @Get()
  getStatus() {
    return this.uploaderService.getStatus();
  }
}
