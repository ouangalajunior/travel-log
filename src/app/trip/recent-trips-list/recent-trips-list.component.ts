import { Component, OnInit } from '@angular/core';
import { TripData } from '../trip.model';
import { TripService } from '../trip-api.service';
import { PlaceData } from 'src/app/places/place.model';
import { PlaceApiService } from 'src/app/places/place-api.service';

@Component({
  selector: 'app-recent-trips-list',
  templateUrl: './recent-trips-list.component.html',
  styleUrls: ['./recent-trips-list.component.css']
})
export class RecentTripsListComponent implements OnInit{
  recentTrips: TripData[] = [];

  constructor(private tripService: TripService,
    private placeService: PlaceApiService
    ) {}

  ngOnInit() {
    this.tripService.getRecentTrips().subscribe((trips) => {
      this.recentTrips = trips.map((trip) => {
        const lastPlace = trip.places?.[0]; // Get the last place associated with the trip
        const lastPlacePicture = lastPlace?.pictureUrl || ''; // Get the last place's picture URL
        const lastPlaceName = lastPlace?.name || ''; 
        return { ...trip, lastPlacePicture, lastPlaceName }; // Create a new object with the added property
      });
    });
  }
}
