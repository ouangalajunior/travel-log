import { PlaceData } from "../places/place.model";

export interface Trip {
  id?: string;
  title: string;
  description: string;
  places?: PlaceData[]; // Add the places property
}


  export interface TripData {
    id?: string;
    href?: string;
    title: string;
    description: string;
    placesCount?: number;
    userId?: string;
    userHref?: string;
    createdAt?: string;
    updatedAt?: string;
    places?: PlaceData[];
  }
  
  export interface TripWithPlaces extends TripData {
   places?: any[]; // Replace 'any[]' with the actual type of the places array if possible
  }