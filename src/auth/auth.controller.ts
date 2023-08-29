import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Put('forget-password')
  async forgetPassword(
    @Body() signInDto: Record<string, any>,
    @Res() res: Response,
  ) {
    try {
      await this.authService.forgetPassword(
        signInDto.email,
        signInDto.oldPassword,
        signInDto.newPassword,
      );
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Password changed successfully' });
    } catch (error) {
      return res.status(HttpStatus.CONFLICT).json({ message: error.message });
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
