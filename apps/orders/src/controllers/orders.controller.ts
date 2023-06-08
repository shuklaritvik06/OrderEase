import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateDTO, UpdateDTO } from '../dto/order.dto';
import { OrdersService } from '../services/order.service';
import { AuthGuard } from '@app/shared/guards/jwt.guard';
import { RolesGuard } from '@app/shared/guards/role.guard';

@Controller('api/v1/orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Post('create')
  async createOrder(@Body() request: CreateDTO) {
    return this.ordersService.createOrder(request);
  }
  @Get('getall')
  async getOrders() {
    return this.ordersService.getOrders();
  }
  @Get('get/:id')
  async getOrder(@Param('id') id: string) {
    return this.ordersService.getOrder(id);
  }
  @Put('update/:id')
  @UseGuards(RolesGuard)
  async updateOrder(@Param('id') id: string, @Body() request: UpdateDTO) {
    const result = await this.ordersService.update(id, request);
    if (result.acknowledged === true) {
      return {
        product_id: request.product_id,
        product: request.product,
        price: request.price,
        address: request.address,
        phone: request.phone,
        acknowledged: true,
      };
    }
    return {
      message: 'Error Occured!',
    };
  }
  @Delete('delete/:id')
  async deleteOrder(@Param('id') id: string) {
    return this.ordersService.delete(id);
  }
}
