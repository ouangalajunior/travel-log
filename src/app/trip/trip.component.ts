import { Component, Input,  } from '@angular/core';
import { TripData } from 'src/app/trip/trip.model';
import { TripService } from './trip-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceApiService } from '../places/place-api.service';
import { PlaceData } from '../places/place.model';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent  {
  @Input() tripData!: TripData;
  placesList: PlaceData[] = []; // List of places associated with the trip

  constructor(
    private tripService: TripService,
    private placeService: PlaceApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /*
  ngOnInit(): void {
    const tripId = this.route.snapshot.params['id'];
    this.tripService.retrieveTrip(tripId).subscribe(
      (trip) => {
        this.tripData = trip;
        
      },
      (error) => {
        console.error('Failed to retrieve trip details:', error);
        // Handle error scenario, such as displaying an error message
      }
    );
  }

  addPlaceToTrip(): void {
    if (this.tripData) {
      this.router.navigate(['/create-place'], {
        queryParams: { tripId: this.tripData.id, tripHref: this.tripData.href }
      });
    }
  }
  */

  
}
