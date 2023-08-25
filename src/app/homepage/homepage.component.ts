import { Component, OnInit } from "@angular/core";
import { UserApiService } from "../users/user-api.service";
import { PlaceApiService } from "../places/place-api.service";
import { PlaceData } from "../places/place.model";
//import { AuthService } from "../auth.service";


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  recentPlaces: PlaceData[] = [];
  constructor(private readonly userApi: UserApiService,
    private placeService: PlaceApiService
    
    
    ) {}

  ngOnInit(): void {
    // Ask the service to make an API call on component initialisation
    /*
    this.userApi.loadAllUsers$().subscribe({
      next: (users) => console.log("Users", users),
      error: (error) => console.warn("Error", error),
    });
*/
    this.placeService.getRecentPlaces().subscribe(
      (places) => {
        this.recentPlaces = places;
      },
      (error) => {
        console.error('Failed to retrieve recent places:', error);
      }
    );
  }
  
  }

  
 
   
