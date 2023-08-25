import { GeoJsonPoint } from "./geojson.model";


export interface Place {
    id?: string;
    name: string;
    description: string;
    location: GeoJsonPoint;
    tripId?: string;
    tripHref?: string;
    pictureUrl: string;
  }
  

  export interface PlaceData {
    id?: string;
    href?: string;
    name: string;
    description: string;
    location: {
      type: "Point";
      coordinates: [number, number];
    };
    pictureUrl: string;
    tripId: string;
    tripHref: string;
    createdAt?: string;
    updatedAt?: string;
  }

