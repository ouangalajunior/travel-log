import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { User } from "./user.model";
import { environment } from "src/environments/environment";

// TODO: Insert here your personnal api URL
//const apiUrl = "https://my-travel-log-t0l5.onrender.com/api";

@Injectable({
  providedIn: "root",
})

export class UserApiService {

  constructor(private http: HttpClient) { }

  loadAllUsers$(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/users`, user);
  }

  retrieveUser(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`,)

  }


  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/users/${id}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${environment.apiUrl}/users/${user.id}`, user);
  }

  getUserForTrip(tripId: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users?tripId=${tripId}`);

  }

//service get method for user search and sort
  getUserSearch(sort: string, page: number, pageSize: number, search?: string,): Observable<HttpResponse<User[]>> {
    let url = `${environment.apiUrl}/users?page=${page}&pageSize=${pageSize}`;

    if (sort) {
      url += `&sort=${sort}`;
    }

    if (search) {
      url += `&search=${search}`;
    }

    return this.http.get<User[]>(url, { observe: 'response' });
  }


}

  
  

