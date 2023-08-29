import { Component, OnInit } from '@angular/core';
import { TripData } from '../trip.model';
import { TripService } from '../trip-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/users/user.model';
@Component({
  selector: 'app-my-trip',
  templateUrl: './my-trip.component.html',
  
})
//to list trip belong to the current logged in user
export class MyTripComponent implements OnInit {
  tripList: TripData[] = [];
  currentUser: User | undefined;

  constructor (
    private tripService: TripService,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getCurrentUser();
}
//method to get the current user
getCurrentUser(): void {
  this.authService.getUser$().subscribe(
    (user) => {
      this.currentUser = user;
      if (user) {
      //  console.log('Current user:', user.name);

        // If there is a user and user.id is defined, fetch their trips
        if (user.id) {
          this.tripService.getTripsByCurrentUser(user.id).subscribe(
            (trips) => {
              // Update the 'trips' property of the current user
              if (this.currentUser) {
                this.currentUser.trips = trips;
              }
            },
            (error) => {
              console.error('Failed to get user trips:', error);
            }
          );
        }
      } else {
        console.log('No user logged in.');
      }
    },
    (error) => {
      console.error('Failed to get current user:', error);
    }
  );
}
}