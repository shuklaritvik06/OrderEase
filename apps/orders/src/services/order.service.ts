import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PAYMENTS_SERVICE } from '../constants/services';
import { CreateDTO, UpdateDTO } from '../dto/order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../models/order.model';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @Inject(PAYMENTS_SERVICE) private billingClient: ClientProxy,
  ) {}

  async createOrder(request: CreateDTO) {
    try {
      const order = await this.orderModel.create({
        product_id: request.product_id,
        product: request.product,
        price: request.price,
        address: request.address,
        phone: request.phone,
        created_at: Date.now(),
      });
      this.billingClient.emit('order_created', {
        request,
      });
      return order;
    } catch (err) {
      throw err;
    }
  }

  async getOrders() {
    return this.orderModel.find({});
  }

  async getOrder(id: string) {
    const object = await this.orderModel.findOne({ product_id: id });
    return {
      product_id: object.product_id,
      product: object.product,
      price: object.price,
      address: object.address,
      phone: object.phone,
    };
  }
  async update(id: string, request: UpdateDTO) {
    return this.orderModel.updateOne(
      { product_id: id },
      {
        $set: request,
      },
    );
  }
  async delete(id: string) {
    return this.orderModel.deleteMany({ product_id: id });
  }
}
