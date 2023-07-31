import { Component, OnInit } from "@angular/core";
import { UserApiService } from "../users/user-api.service";
//import { AuthService } from "../auth.service";

import { Trip } from 'src/app/trip/trip.model';
import { TripService } from 'src/app/trip/trip-api.service';

@Component({
  selector: "app-dummy-page",
  templateUrl: "./dummy-page.component.html",
  styleUrls: ["./dummy-page.component.css"],
})
export class DummyPageComponent implements OnInit {
  constructor(private readonly userApi: UserApiService,
    private tripService: TripService,
    
    ) {}

  ngOnInit(): void {
    // Ask the service to make an API call on component initialisation
    this.userApi.loadAllUsers$().subscribe({
      next: (users) => console.log("Users", users),
      error: (error) => console.warn("Error", error),
    });
  }

  newTrip: Trip = {
          title: '',
     description: '',
     
    };

 

    createTrip(): void {
      this.tripService.createTrip(this.newTrip).subscribe(createdTrip => {
        console.log('Trip created successfully!');
       this.newTrip = {
           title: '',
          description: '',
         
        };
     });
    }
}