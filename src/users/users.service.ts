import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './interfaces/users.interface';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_MODEL')
    private usersModel: Model<Users>,
  ) {}

  async hashPassword(password: string): Promise<string | undefined> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  }

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const existingUser = await this.findOne(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const createdUser = new this.usersModel({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: hashedPassword,
    });
    const newUser = await createdUser.save();
    return newUser;
  }

  async updatePassword(email: string, password: string) {
    const hashedPassword = await this.hashPassword(password);
    await this.usersModel
      .updateOne({ email }, { password: hashedPassword })
      .exec();
    return null;
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.usersModel.findOne({ email }).exec();
  }
}
