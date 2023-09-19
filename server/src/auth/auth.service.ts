import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ExistingUserDto } from 'src/user/dto/existingUser.dto';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { NewUserDto } from 'src/user/dto/newUser.dto';
import { UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<ExistingUserDto | null> {
    const user = await this.userService.findByEmail(email);
    const doesUserExist = !!user;
    if (!doesUserExist) return null;

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );

    if (!doesPasswordMatch) return null;
    return this.userService._getUserdetails(user);
  }

  async verifyJwt(jwt: string): Promise<{ exp: string; role: string }> {
    try {
      const { exp, user } = await this.jwtService.verifyAsync(jwt);
      return { exp: exp, role: user.role };
    } catch (error) {
      throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
    }
  }

  async delete(id: string) {
    return await this.userService.deleteUser(id);
  }

  async login(
    existingUser: Readonly<LoginUserDto>,
  ): Promise<{ token: string }> {
    const { email, password, type } = existingUser;
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new HttpException(
        'Credentials are invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (type === 'admin' && user.role.toLowerCase() !== 'admin') {
      throw new HttpException(
        'Unable to authorize user',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt };
  }

  async register(user: Readonly<NewUserDto>): Promise<ExistingUserDto | any> {
    const { username, email, password } = user;
    const existingEmail = await this.userService.findByEmail(email);
    const existingUser = await this.userService.findByUsername(username);

    if (!username || !email || !password) {
      throw new HttpException(
        'Insufficient credentials',
        HttpStatus.PARTIAL_CONTENT,
      );
    }

    if (existingEmail) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    if (existingUser) {
      throw new HttpException('Username already taken', HttpStatus.CONFLICT);
    }

    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userService.register(
      username,
      email,
      hashedPassword,
    );
    return await this.userService._getUserdetails(newUser);
  }
}
