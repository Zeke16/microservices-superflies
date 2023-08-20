import {
    Body,
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Param,
    UseGuards,
  } from '@nestjs/common';import { ClientProxySuperFlies } from 'src/common/proxy/client-proxy';
import { Plane } from './model/plane.model';
import { Observable } from 'rxjs';
import { IPlane } from 'src/common/interfaces/plane.interface';
import { PlaneMSG } from 'src/common/constants';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt_auth.guard';

@ApiTags('planes')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/plane')
export class PlaneController {
    constructor(private readonly planeProxy: ClientProxySuperFlies) {}
  private _clienProxyPlane = this.planeProxy.clientProxyPlanes();

  @Post()
  create(@Body() plane: Plane): Observable<IPlane> {
    return this._clienProxyPlane.send(PlaneMSG.CREATE, plane);
  }

  @Get()
  findAll(): Observable<IPlane[]> {
    return this._clienProxyPlane.send(PlaneMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IPlane> {
    return this._clienProxyPlane.send(PlaneMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() plane: Plane): Observable<IPlane> {
    return this._clienProxyPlane.send(PlaneMSG.UPDATE, { id, plane });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clienProxyPlane.send(PlaneMSG.DELETE, id);
  }
}

