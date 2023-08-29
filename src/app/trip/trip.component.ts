import { Component, Input, OnInit  } from '@angular/core';
import { TripData } from 'src/app/trip/trip.model';
import { TripService } from './trip-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceApiService } from '../places/place-api.service';
import { PlaceData } from '../places/place.model';
// Import user data for tripv2 list test
import { User } from '../users/user.model';
import { UserApiService } from '../users/user-api.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit  {
  @Input() tripData!: TripData;
  placesList: PlaceData[] = []; // List of places associated with the trip
  user: User| undefined;
 
  
  constructor(
    private userService: UserApiService,
    private placeService: PlaceApiService,
    private route: ActivatedRoute,
    private router: Router,
    
    
  ) {}
  ngOnInit(): void {
    this.retrieveUser();
      }

  
//Methode to retrieve user and associate it to trip
  retrieveUser(): void {
    if (this.tripData.userId) {
      this.userService.retrieveUser(this.tripData.userId).subscribe(
        (user) => {
          this.user = user;
        },
        (error) => {
          console.error('Failed to retrieve user:', error);
        }
      );
    }

   
  }

 
  
}
