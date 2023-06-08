import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}
@Schema({
  autoCreate: true,
  collection: 'users',
  minimize: true,
})
export class User {
  @Prop({
    type: String,
    required: true,
  })
  fname: string;
  @Prop({
    type: String,
    required: true,
  })
  lname: string;
  @Prop({
    type: String,
    required: true,
  })
  username: string;
  @Prop({
    type: String,
    required: true,
  })
  password: string;
  @Prop({
    type: String,
    required: true,
  })
  email: string;
  @Prop({
    type: String,
    required: true,
  })
  address: string;
  @Prop({
    type: String,
    default: Role.User,
    enum: Role,
  })
  role: string;
  @Prop({
    type: Number,
    required: true,
  })
  phone: number;
  @Prop({
    type: String,
    default: Date.now,
  })
  created_at: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
