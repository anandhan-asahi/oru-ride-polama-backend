import { PartialType } from '@nestjs/mapped-types';
import { CreateRideDto } from './create-ride.dto';

export class UpdateRideDto extends PartialType(CreateRideDto) {
  name?: string;
  date: Date;
  price: string;
  imageUrl: string;
}
