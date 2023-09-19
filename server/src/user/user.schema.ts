import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'User' }) // Remove the required option
  role: string;

  @Prop({ required: true, default: Date.now })
  dateJoined: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
