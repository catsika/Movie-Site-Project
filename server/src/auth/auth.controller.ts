import {
  Body,
  Post,
  Controller,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDto } from 'src/user/dto/newUser.dto';
import { UserInterface } from 'src/user/interfaces/user.interface';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() user: NewUserDto): Promise<UserInterface | null> {
    return await this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: LoginUserDto): Promise<{ token: string }> {
    return await this.authService.login(user);
  }

  @Post('verify-jwt')
  @HttpCode(HttpStatus.OK)
  async authenticate(
    @Body() payload: { jwt: string },
  ): Promise<{ exp: string; role: string }> {
    return await this.authService.verifyJwt(payload.jwt);
  }

  @Delete('cancel/:id')
  async cancel(@Param('id') id: string) {
    return await this.authService.delete(id);
  }
}
