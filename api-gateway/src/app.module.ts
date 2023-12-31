import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PassengerModule } from './passenger/passenger.module';
import { FlightModule } from './flight/flight.module';
import { ProxyModule } from './common/proxy/proxy.module';
import { AuthModule } from './auth/auth.module';
import { PlaneModule } from './plane/plane.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    UserModule,
    PassengerModule,
    FlightModule,
    ProxyModule,
    AuthModule,
    PlaneModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
