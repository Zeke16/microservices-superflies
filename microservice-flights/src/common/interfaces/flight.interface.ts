import { IPassenger } from "./passenger.interface";
import { IPlane } from "./plane.interface";
import { IWeather } from "./weather.interface";

export interface IFlight extends Document{
  _id?: string;
  pilot: string;
  airplane: IPlane;
  destinationCity: string;
  flightDate: Date;
  passengers: IPassenger[];
  weather: IWeather[];
}
