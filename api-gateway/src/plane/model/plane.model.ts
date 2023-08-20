import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class Plane {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  modelo: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  matricula: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  aerolinea: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  capacidad: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  estado: boolean;
}