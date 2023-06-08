import { Module } from '@nestjs/common';
import { PaymentsController } from '../controllers/payments.controller';
import { PaymentsService } from '../services/payments.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/shared/database/database.module';
import { GuardsModule } from '@app/shared';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/payments/.env',
    }),
    GuardsModule,
    DatabaseModule,
  ],
  controllers: [PaymentsController],
  providers: [JwtService, PaymentsService],
})
export class PaymentsModule {}
