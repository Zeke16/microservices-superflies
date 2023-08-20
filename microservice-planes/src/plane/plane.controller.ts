import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PlaneMSG } from 'src/common/constants';
import { Plane } from './model/plane.model';
import { PlaneService } from './plane.service';

@Controller('plane')
export class PlaneController {
    constructor(private readonly passengerService: PlaneService) {}
  @MessagePattern(PlaneMSG.CREATE)
  createPassenger(@Payload() plane: Plane) {
    return this.passengerService.createPlane(plane);
  }

  @MessagePattern(PlaneMSG.FIND_ALL)
  getAllPassengers() {
    return this.passengerService.getAllPlane();
  }

  @MessagePattern(PlaneMSG.FIND_ONE)
  getOnePassenger(@Payload() id: string) {
    return this.passengerService.getOnePlane(id);
  }

  @MessagePattern(PlaneMSG.UPDATE)
  updatePassenger(@Payload() payload: any) {
    return this.passengerService.updatePlane(payload.id, payload.passenger);
  }

  @MessagePattern(PlaneMSG.DELETE)
  deletePassenger(@Payload() id: string) {
    return this.passengerService.deletePlane(id);
  }
}

