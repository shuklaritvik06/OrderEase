import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return {
      message: 'Uploader API is up!',
      version: '1.0.0',
      author: 'Ritvik Shukla',
    };
  }
}
