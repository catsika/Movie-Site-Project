import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UserInterface } from './interfaces/user.interface';
import { ExistingUserDto } from './dto/existingUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async _getUserdetails(user: UserDocument): Promise<ExistingUserDto> {
    return {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      dateJoined: user.dateJoined,
    };
  }

  async deleteUser(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email: email });
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ username: username });
  }

  async register(
    username: string,
    email: string,
    hashedPassword: string,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
    });
    return await newUser.save();
  }
}
