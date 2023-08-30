import { Component } from '@angular/core';
import { PlaceData } from '../place.model';
import { PlaceApiService } from '../place-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/users/user.model';
import { TripData } from 'src/app/trip/trip.model';
import { TripService } from 'src/app/trip/trip-api.service';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent {
  placeData: PlaceData | undefined;
  user: User | undefined;
  trip: TripData | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private placeService: PlaceApiService,
    private authService: AuthService,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    const placeId = this.route.snapshot.params['id'];
    this.retrievePlace(placeId);
    this.getCurrentUser();
  }

  // retieve place
  private retrievePlace(id: string) {
    this.placeService.retrievePlace(id).subscribe(
      (response) => {
        this.placeData = response;
        this.retrieveTrip(response.tripId); // Retrieve the associated trip
      },
      (error) => {
        console.error('Failed to retrieve place details:', error);
        // Handle error scenario, such as displaying an error message
      }
    );
  }

  //retrieve trip related to the place
  private retrieveTrip(tripId: string) {
    this.tripService.retrieveTrip(tripId).subscribe(
      (trip) => {
        this.trip = trip;
      },
      (error) => {
        console.error('Failed to retrieve trip details:', error);
      }
    );
  }

  //edit place
  editPlace(): void {
    this.router.navigate(['/edit-place', this.placeData?.id]);
  }

  //delete place
  deletePlace(placeData: PlaceData,): void {
    if (confirm(`Are you sure you want to delete the place '${placeData.name}'?`)) {
      if (placeData.id) {
        this.placeService.deletePlace(placeData.id)
          .subscribe(() => {
            console.log(`Place '${placeData.name}' deleted successfully.`);
            this.router.navigateByUrl('/place-list');

          });
      } else {
        console.error('Trip ID is missing.');
      }
    }
  }

  

  // Get current user in order to display or not edit, delete, and add place buttons
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


}
