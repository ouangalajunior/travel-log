import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map} from 'rxjs';
import { environment } from "src/environments/environment";
import { Place, PlaceData } from './place.model';


@Injectable({
  providedIn: 'root'
})
export class PlaceApiService {

  constructor(private http: HttpClient) { }
  createPlace(place: Place): Observable<Place> {
    return this.http.post<Place>(`${environment.apiUrl}/places`, place,  );
  }

  getPlacesForTrip(tripId: string): Observable<Place[]> {
    return this.http.get<Place[]>(`${environment.apiUrl}/places?tripId=${tripId}`);
  }

  getPlaces(): Observable<PlaceData[]> {
    return this.http.get<PlaceData[]>(`${environment.apiUrl}/places`).pipe(
      
    );
  }

  retrievePlace(id: string): Observable<PlaceData> {
    return this.http.get<PlaceData>(`${environment.apiUrl}/places/${id}`, )
    
  }

  updatePlace( place: Place): Observable<Place> {
    return this.http.patch<Place>(`${environment.apiUrl}/places/${place.id}`,place);
  }
  
  getPlaceByTrip(tripId: string): Observable<PlaceData[]> {
    return this.http.get<PlaceData[]>(`${environment.apiUrl}/places`).pipe(
      map((places) => places.filter((place) => place.tripId === tripId))
    );
  }
}
