import { Component, OnInit } from '@angular/core';
import { TripData } from '../trip.model';
import { TripService } from '../trip-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlaceData } from 'src/app/places/place.model';


@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css']
})
export class TripDetailComponent implements OnInit {
  tripData: TripData | undefined;
  places: PlaceData[] = [];
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripService,

  )
  {}
  ngOnInit(): void {
    this.retrieveTrip();
      
  }

  retrieveTrip(): void {
    const tripId = this.route.snapshot.paramMap.get('id');
    if (tripId) {
      this.tripService.retrieveTrip(tripId).subscribe(
        (tripData) => {
          this.tripData = tripData;
          this.getPlacesForTrip(tripId); // Call the function to get places for the trip
        },
        (error) => {
          console.error('Failed to retrieve trip details:', error);
          // Handle error scenario, such as displaying an error message
        }
      );
    }
  }
  deleteTrip(tripData: TripData, ): void {
      if (confirm(`Are you sure you want to delete the trip '${tripData.title}'?`)) {
        if (tripData.id) {
          this.tripService.deleteTrip(tripData.id)
            .subscribe(() => {
              console.log(`Trip '${tripData.title}' deleted successfully.`);
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
      queryParams: { tripId: this.tripData.id ,tripHref: this.tripData.href }
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

