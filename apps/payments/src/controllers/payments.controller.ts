import { Controller, UseGuards } from '@nestjs/common';
import { PaymentsService } from '../services/payments.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AuthGuard } from '@app/shared';

@Controller()
@UseGuards(AuthGuard)
export class PaymentsController {
  constructor(private readonly productsService: PaymentsService) {}

  @EventPattern('order_created')
  async handleOrderCreated(@Payload() data: any) {
    this.productsService.bill(data);
  }
}
