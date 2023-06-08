import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return {
      message: 'Auth API is up!',
      version: '1.0.0',
      author: 'Ritvik Shukla',
    };
  }
}
