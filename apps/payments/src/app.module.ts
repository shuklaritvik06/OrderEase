import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsModule } from './modules/payments.module';

@Module({
  imports: [PaymentsModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
