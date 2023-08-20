import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { FlightMSG, PassengerMSG, PlaneMSG } from 'src/common/constants';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { ClientProxySuperFlies } from 'src/common/proxy/client-proxy';
import { Flight } from './model/flight.model';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt_auth.guard';

@ApiTags('flight')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/flight')
export class FlightController {
  constructor(private readonly clienProxy: ClientProxySuperFlies) { }
  private _clientProxyPassenger = this.clienProxy.clientProxyPassengers();
  private _clientProxyFlights = this.clienProxy.clientProxyFlights();
  private _clientProxyPlane = this.clienProxy.clientProxyPlanes();
  @Post()
  create(@Body() flight: Flight): Observable<IFlight> {
    return this._clientProxyFlights.send(FlightMSG.CREATE, flight);
  }

  @Get()
  findAll(): Observable<IFlight[]> {
    return this._clientProxyFlights.send(FlightMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IFlight[]> {
    return this._clientProxyFlights.send(FlightMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() flight: Flight): Observable<IFlight> {
    return this._clientProxyFlights.send(FlightMSG.UPDATE, { id, flight });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyFlights.send(FlightMSG.DELETE, id);
  }

  @Post(':flightId/passenger/:passengerId')
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await this._clientProxyPassenger
      .send(PassengerMSG.FIND_ONE, passengerId)
      .toPromise();
    console.log(passenger)
    if (!passenger)
      throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);
    return this._clientProxyFlights.send(FlightMSG.ADD_PASSENGER, {
      flightId,
      passengerId,
    });
  }

  @Post('addPlane/:flightId/plane/:planeId')
  async addPlane(
    @Param('flightId') flightId: string,
    @Param('planeId') planeId: string,
  ) {
    const plane = await this._clientProxyPlane
      .send(PlaneMSG.FIND_ONE, planeId)
      .toPromise();
    console.log(planeId)
    if (!plane)
      throw new HttpException('Plane not found', HttpStatus.NOT_FOUND);
    return this._clientProxyFlights.send(FlightMSG.ADD_PLANE, {
      flightId,
      planeId,
    });
  }
}
