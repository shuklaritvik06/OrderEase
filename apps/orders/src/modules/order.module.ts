import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from '../controllers/orders.controller';
import { OrdersService } from '../services/order.service';
import { Order, OrderSchema } from '../models/order.model';
import { DatabaseModule } from '@app/shared/database/database.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PAYMENTS_SERVICE } from '../constants/services';
import { GuardsModule } from '@app/shared';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/orders/.env',
    }),
    GuardsModule,
    ClientsModule.register([
      {
        name: PAYMENTS_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'payment_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrdersController],
  providers: [JwtService, OrdersService],
})
export class OrdersModule {}
