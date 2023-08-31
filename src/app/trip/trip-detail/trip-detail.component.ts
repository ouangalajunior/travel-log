import { Component, OnInit, Input } from '@angular/core';
import { TripData } from '../trip.model';
import { TripService } from '../trip-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlaceData } from 'src/app/places/place.model';
import { PlaceApiService } from 'src/app/places/place-api.service';
import { User } from 'src/app/users/user.model';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css']
})
export class TripDetailComponent implements OnInit {

  tripData: TripData | undefined;
  places: PlaceData[] = [];
  //user: User[] = [];
  user: User | undefined;
  


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripService,
    private placeService: PlaceApiService,
    private authService: AuthService


  ) { }

  ngOnInit(): void {
    const tripId = this.route.snapshot.paramMap.get('id');
    if (tripId) {
      this.retrieveTrip();
      //get current user logged in for edit delete buttons logic
      this.getCurrentUser();

    }

  }

  // retrieve trip details method
  retrieveTrip(): void {
    const tripId = this.route.snapshot.paramMap.get('id');
    if (tripId) {
      this.tripService.retrieveTrip(tripId).subscribe(
        (tripData) => {
          this.tripData = tripData;
          // Call the function to get places for the trip
          if (tripData.id) {
            this.placeService.getPlaceByTrip(tripData.id).subscribe(
              (places) => {
                if (this.tripData) {
                  this.tripData.places = places;
                  // Call the function to set map coordinates
           
                }
              }
            );
          }
        },
        (error) => {
          console.error('Failed to retrieve trip details:', error);
          // Handle error scenario, such as displaying an error message
        }
      );
    }
  }

  //Get current user in order to display or not edit, delete and add place buttons
  getCurrentUser(): void {
    this.authService.getUser$().subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error('Failed to get current user:', error);
      }
    );
  }

  //delete trip method 

  deleteTrip(tripData: TripData,): void {
    if (confirm(`Are you sure you want to delete the trip '${tripData.title}'?`)) {
      if (tripData.id) {
        this.tripService.deleteTrip(tripData.id)
          .subscribe(() => {
            alert(`Trip '${tripData.title}' deleted successfully.`);
            this.router.navigateByUrl('/trip-list');

          });
      } else {
        console.error('Trip ID is missing.');
      }
    }





  }

  addPlaceToTrip(): void {
    if (this.tripData) {
      this.router.navigate(['/create-place'], {
        queryParams: { tripId: this.tripData.id, tripHref: this.tripData.href }
      });
    }
  }

  getPlacesForTrip(tripId: string): void {
    this.tripService.getPlacesForTrip(tripId).subscribe(
      (places) => {
        this.places = places;
      },
      (error) => {
        console.error('Failed to retrieve places for trip:', error);
        // Handle error scenario, such as displaying an error message
      }
    );
  }




}

