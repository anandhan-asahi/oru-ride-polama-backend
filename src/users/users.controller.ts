import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const createdUser = await this.usersService.create(createUserDto);
      if (createdUser) {
        return res
          .status(HttpStatus.CREATED)
          .json({ message: 'User created successfully' });
      }
    } catch (error) {
      return res.status(HttpStatus.CONFLICT).json({ message: error.message });
    }
  }
}
