import { Component, OnInit } from '@angular/core';
import { TripData } from '../trip.model';
import { TripService } from '../trip-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TripWithPlaces } from '../trip.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit{

  tripList: TripData[] = [];
  filteredTripList: TripData [] = [];

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //const tripId = this.route.snapshot.params['id'];
   // const tripId = this.route.snapshot.paramMap.get('id');
   // if(tripId){
    this.getTrips();
    
 // }
}

  getTrips(): void {
    this.tripService.getTrips().subscribe(
      (trips) => {
        this.tripList = trips;
        this.filteredTripList = this.tripList;
        
      },
      (error) => {
        console.error('Failed to retrieve trip list:', error);
        // Handle error scenario, such as displaying an error message
      }
    );
  }

 searchTripResults(text: string ) {
    if (!text.trim()) {
      this.filteredTripList = this.tripList;
    } else {
      this.filteredTripList = this.tripList.filter(
        (tripData) =>
          tripData?.title.toLowerCase().includes(text.toLowerCase()) ||
          tripData?.description.toLowerCase().includes(text.toLowerCase())
      );
    }
  }
  

  
}
