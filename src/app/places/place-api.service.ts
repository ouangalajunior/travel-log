import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map} from 'rxjs';
import { environment } from "src/environments/environment";
import { PlaceData } from './place.model';


@Injectable({
  providedIn: 'root'
})
export class PlaceApiService {

  constructor(private http: HttpClient) { }

  //Method for place creation
  createPlace(place: PlaceData): Observable<PlaceData> {
    return this.http.post<PlaceData>(`${environment.apiUrl}/places`, place,  );
  }
/*
  getPlacesForTrip(tripId: string): Observable<PlaceData[]> {
    return this.http.get<PlaceData[]>(`${environment.apiUrl}/places?tripId=${tripId}`);
  }
/*
  getPlaces(): Observable<PlaceData[]> {
    return this.http.get<PlaceData[]>(`${environment.apiUrl}/places`).pipe(
      
    );
  }
*/
//method to retrieve place
  retrievePlace(id: string): Observable<PlaceData> {
    return this.http.get<PlaceData>(`${environment.apiUrl}/places/${id}`, )
    
  }
  //method to deleteplace

  deletePlace(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/places/${id}`);
  }
 // Method for place update
  updatePlace( place: PlaceData): Observable<PlaceData> {
    return this.http.patch<PlaceData>(`${environment.apiUrl}/places/${place.id}`,place);
  }
  //method to get places related to a trip
  getPlaceByTrip(tripId: string): Observable<PlaceData[]> {
    return this.http.get<PlaceData[]>(`${environment.apiUrl}/places`).pipe(
      map((places) => places.filter((place) => place.tripId === tripId))
    );
  }
  

//service get method for place search and sort
  getPlaceSearch(sort: string, page: number, pageSize: number, search?: string,): Observable<HttpResponse<PlaceData[]>> {
    let url = `${environment.apiUrl}/places?page=${page}&pageSize=${pageSize}`;

    if (sort) {
      url += `&sort=${sort}`;
    }

    if (search) {
      url += `&search=${search}`;
    }

    return this.http.get<PlaceData[]>(url, { observe: 'response' });
  }

  //get recent places for caroussel

  getRecentPlaces(): Observable<PlaceData[]> {
    return this.http.get<PlaceData[]>(`${environment.apiUrl}/places`, {
      params: {
        sort: 'createdAt',
        page: '1',  
      pageSize:'5'
      }
    });
  }
  

}
