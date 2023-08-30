import { Component, OnInit } from "@angular/core";
import { UserApiService } from "../users/user-api.service";
import { PlaceApiService } from "../places/place-api.service";
import { PlaceData } from "../places/place.model";
//import { AuthService } from "../auth.service";


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  
})
export class HomepageComponent implements OnInit {
  recentPlaces: PlaceData[] = [];
  constructor(private readonly userApi: UserApiService,
    private placeService: PlaceApiService
    
    
    ) {}

  ngOnInit(): void {

 
  }
  
  }

  
 
   
