import { Inject, Injectable } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { Model } from 'mongoose';
import { Rides } from './interfaces/rides.interface';

@Injectable()
export class RidesService {
  constructor(
    @Inject('RIDES_MODEL')
    private ridesModel: Model<Rides>,
  ) {}

  async create(createRideDto: CreateRideDto): Promise<Rides> {
    const createdRide = new this.ridesModel(createRideDto);
    return createdRide.save();
  }

  async findAll(): Promise<Rides[]> {
    return this.ridesModel.find().exec();
  }

  async findOne(id: string): Promise<Rides> {
    const filteredRide = this.ridesModel.findOne({ _id: id }).exec();
    return filteredRide;
  }

  async update(id: string, updateRideDto: UpdateRideDto): Promise<Rides> {
    this.ridesModel.updateOne({ _id: id }, updateRideDto).exec();
    return null;
  }

  async remove(id: string) {
    this.ridesModel.deleteOne({ _id: id }).exec();
    return null;
  }
}
