import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, username: user.username };
    return {
      login: true,
      data: {
        userName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        accessToken: await this.jwtService.signAsync(payload),
      },
    };
  }

  async forgetPassword(
    email: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    await this.usersService.updatePassword(email, newPassword);
    return null;
  }
}
