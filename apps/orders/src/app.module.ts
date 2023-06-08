import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './modules/order.module';

@Module({
  imports: [OrdersModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
