import { Component, OnInit } from '@angular/core';
import { TripData } from '../trip.model';
import { TripService } from '../trip-api.service';


@Component({
  selector: 'app-recent-trips-list',
  templateUrl: './recent-trips-list.component.html',
  
})
export class RecentTripsListComponent implements OnInit{
  recentTrips: TripData[] = [];

  constructor(private tripService: TripService,
   
    ) {}
//getting 6 last trips for home page
  ngOnInit() {
    this.tripService.getRecentTrips().subscribe((trips) => {
      this.recentTrips = trips.map((trip) => {
       
        return  trip  ; // 
      });
    });
  }
}
