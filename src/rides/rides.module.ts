import { Module } from '@nestjs/common';
import { RidesService } from './rides.service';
import { RidesController } from './rides.controller';
import { DatabaseModule } from '../database/database.module';
import { ridesProviders } from './rides.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [RidesController],
  providers: [RidesService, ...ridesProviders],
})
export class RidesModule {}
