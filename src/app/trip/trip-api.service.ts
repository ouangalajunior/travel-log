import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map,tap } from 'rxjs';
import { Trip, TripData } from './trip.model';
import { Place, PlaceData } from '../places/place.model';

//import { AuthService } from "src/app/auth/auth.service";

import { environment } from "src/environments/environment";


/*
interface TripDTO {
  id: string;
  title: string;
  description: string;
}
*/
@Injectable({
  providedIn: 'root'
})


export class TripService {
  /*
  private convertToTrip (trip: TripDTO): Trip {
    return {
      id: trip.id,
      title: trip.title,
      description: trip.description

    };
  }
  */
 
  constructor(private http: HttpClient) { }
/*
  getTrips(): Observable<Trip[]> {
    return this.http.get<TripData[]>(`${environment.apiUrl}/trips`).pipe(
      map(trips => trips.map(trip => {
        return this.convertToTrip(trip);
      }))
    );
  }
  */

  getTrips(): Observable<TripData[]> {
    return this.http.get<TripData[]>(`${environment.apiUrl}/trips`).pipe(
      
    );
  }

/*
  getTrip(id: string): Observable<Trip> {
    return this.http.get<TripData>(`${environment.apiUrl}/trips/${id}`).pipe(
      map(trip =>this.convertToTrip(trip))
    );
    
  }

*/

  createTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${environment.apiUrl}/trips`, trip,  );
  }

  updateTrip( trip: Trip): Observable<Trip> {
    return this.http.patch<Trip>(`${environment.apiUrl}/trips/${trip.id}`,trip);
  }

  deleteTrip(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/trips/${id}`);
  }

  retrieveTrip(id: string): Observable<TripData> {
    return this.http.get<TripData>(`${environment.apiUrl}/trips/${id}`, )
    
  }

  getTripsByUser(userId: string): Observable<TripData[]> {
    return this.http.get<TripData[]>(`${environment.apiUrl}/trips?userId=${userId}`);
  }
/*
  getPlacesForTrip(tripId: string): Observable<Place[]> {
    return this.http.get<Place[]>(`${environment.apiUrl}/trips/${tripId}/places`);
  }


}
getPlacesForTrip(tripId: string): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/places?tripId=${tripId}`);

}

getPlacesForTrip(tripId: string): Observable<PlaceData[]> {
  return this.http.get<PlaceData[]>(`${environment.apiUrl}/places?tripId=${tripId}`);
}
*/

getPlacesForTrip(tripId: string): Observable<PlaceData[]> {
  return this.http.get<PlaceData[]>(`${environment.apiUrl}/places?tripId=${tripId}`);
}


getTripsByCurrentUser(userId: string): Observable<TripData[]> {
  return this.http.get<TripData[]>(`${environment.apiUrl}/trips`).pipe(
    map((trips) => trips.filter((trip) => trip.userId === userId))
  );
}

getTripsByAllUser(userId: string): Observable<TripData[]> {
  return this.http.get<TripData[]>(`${environment.apiUrl}/trips`).pipe(
    map((trips) => trips.filter((trip) => trip.userId === userId))
  );
}

}
