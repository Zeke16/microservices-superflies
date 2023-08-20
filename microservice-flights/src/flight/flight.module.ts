import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FLIGHT, PASSENGER, PLANE } from 'src/common/models/models';
import { FlightSchema } from './schema/flight.schema';
import { PassengerSchema } from './schema/passenger.schema';
import { PlaneSchema } from './schema/plane.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: FLIGHT.name,
        useFactory: () => FlightSchema.plugin(require('mongoose-autopopulate')),
      },
      {
        name: PLANE.name,
        useFactory: () => PlaneSchema,
      },
      {
        name: PASSENGER.name,
        useFactory: () => PassengerSchema,
      }
    ]),
  ],
  controllers: [FlightController],
  providers: [FlightService],
})
export class FlightModule {}
