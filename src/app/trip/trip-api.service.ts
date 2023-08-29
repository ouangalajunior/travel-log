import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {  TripData } from './trip.model';
import { PlaceData } from '../places/place.model';
import { environment } from "src/environments/environment";



@Injectable({
  providedIn: 'root'
})


export class TripService {


  constructor(private http: HttpClient) { }
  
//Method to get all trips
/*
  getTrips(): Observable<TripData[]> {
    return this.http.get<TripData[]>(`${environment.apiUrl}/trips`).pipe(

    );
  }
*/
 
//Method for trip creation
  createTrip(trip: TripData): Observable<TripData> {
    return this.http.post<TripData>(`${environment.apiUrl}/trips`, trip,);
  }

  // Method for trip update

  updateTrip(trip: TripData): Observable<TripData> {
    return this.http.patch<TripData>(`${environment.apiUrl}/trips/${trip.id}`, trip);
  }
// Method for trip deletino

  deleteTrip(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/trips/${id}`);
  }
//Method to retrive trip

  retrieveTrip(id: string): Observable<TripData> {
    return this.http.get<TripData>(`${environment.apiUrl}/trips/${id}`,)

  }

//get places associated to trip
  getPlacesForTrip(tripId: string): Observable<PlaceData[]> {
    return this.http.get<PlaceData[]>(`${environment.apiUrl}/places?tripId=${tripId}`);
  }


// get trip by current user and make my trip menu
  getTripsByCurrentUser(userId: string): Observable<TripData[]> {
    return this.http.get<TripData[]>(`${environment.apiUrl}/trips`).pipe(
      map((trips) => trips.filter((trip) => trip.userId === userId))
    );
  }
//get trip by users id
  getTripsByAllUser(userId: string): Observable<TripData[]> {
    return this.http.get<TripData[]>(`${environment.apiUrl}/trips`).pipe(
      map((trips) => trips.filter((trip) => trip.userId === userId))
    );
  }

  

//get request method for   search, sort and pagination

getTripSearch(sort: string, page: number, pageSize: number, search?:string, 
  ): Observable<HttpResponse<TripData[]>> {
  let url = `${environment.apiUrl}/trips?page=${page}&pageSize=${pageSize}`;
  if (sort) {
    url += `&sort=${sort}`;
  }
  if (search) {
    url += `&search=${search}`;
  }
  return this.http.get<TripData[]>(url, { observe: 'response' });
}

//methog to call 6 recent trips in homepage
getRecentTrips(): Observable<TripData[]> {
  return this.http.get<TripData[]>(`${environment.apiUrl}/trips`, {
    params: {
    sort: 'createdAt',
     page: '1',  
     pageSize:'6'
    }
  });
}
}



