import { TripData } from "../trip/trip.model";
export type User = {
    id?: string;
    href ?: string;
    name: string;
    password: string;
    tripsCount ?: number;
    createdAt ?: string;
    updatedAt?: string;
    trips?: TripData[]; 
  };