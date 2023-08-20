import { Module } from '@nestjs/common';
import { PlaneController } from './plane.controller';
import { PlaneService } from './plane.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PLANE } from 'src/common/models/models';
import { PlaneSchema } from './schema/plane.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PLANE.name,
        useFactory: () => PlaneSchema,
      }
    ])
  ],
  controllers: [PlaneController],
  providers: [PlaneService]
})
export class PlaneModule { }
