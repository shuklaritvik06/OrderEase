import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({
  autoCreate: true,
  collection: 'orders',
  minimize: true,
})
export class Order {
  @Prop({
    type: String,
    required: true,
  })
  product_id: string;
  @Prop({
    type: String,
    required: true,
  })
  product: string;
  @Prop({
    type: Number,
    required: true,
  })
  price: number;
  @Prop({
    type: String,
    required: true,
  })
  address: string;
  @Prop({
    type: String,
    required: true,
  })
  phone: string;
  @Prop({
    type: String,
    default: Date.now,
  })
  created_at: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
