import { Component, OnInit } from "@angular/core";
import { UserApiService } from "../users/user-api.service";
//import { AuthService } from "../auth.service";


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  constructor(private readonly userApi: UserApiService,
    
    
    ) {}

  ngOnInit(): void {
    // Ask the service to make an API call on component initialisation
    this.userApi.loadAllUsers$().subscribe({
      next: (users) => console.log("Users", users),
      error: (error) => console.warn("Error", error),
    });
  }

 
   
}