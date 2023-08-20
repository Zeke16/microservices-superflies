import { Module } from '@nestjs/common';
import { PlaneController } from './plane.controller';
import { PlaneService } from './plane.service';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [PlaneController],
  providers: [PlaneService]
})
export class PlaneModule {}
