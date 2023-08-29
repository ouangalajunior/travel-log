import { PlaceData } from "../places/place.model";
import { User } from '../users/user.model';

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
    user?: User[];
    lastPlacePicture?: string;
  }
  
  