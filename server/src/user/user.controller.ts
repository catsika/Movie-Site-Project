import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDocument } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
}
