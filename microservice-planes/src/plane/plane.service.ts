import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPlane } from 'src/common/interfaces/plane.interface';
import { PLANE } from 'src/common/models/models';
import { Plane } from './model/plane.model';

@Injectable()
export class PlaneService {
    constructor(
        @InjectModel(PLANE.name) private readonly model: Model<IPlane>,
    ) { }
    async createPlane(plane: Plane): Promise<IPlane> {
        const newPassenger = new this.model(plane);
        return await newPassenger.save();
    }

    async getAllPlane(): Promise<IPlane[]> {
        return await this.model.find();
    }

    async getOnePlane(id: string): Promise<IPlane> {
        return await this.model.findById(id);
    }

    async updatePlane(id: string, plane: Plane): Promise<IPlane> {
        return await this.model.findByIdAndUpdate(id, plane, { new: true });
    }

    async deletePlane(id: string) {
        await this.model.findByIdAndDelete(id);
        return { 'status': HttpStatus.OK, 'msg': 'Deleted' }
    }
}

