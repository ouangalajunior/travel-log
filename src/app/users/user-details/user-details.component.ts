import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserApiService } from '../user-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TripData } from 'src/app/trip/trip.model';

import { TripService } from 'src/app/trip/trip-api.service';
import { AuthService } from 'src/app/auth/auth.service';



@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User | undefined;
  currentUser: User | undefined;
  tripList: TripData[] = [];
  
  constructor ( 
    private route: ActivatedRoute,
    private router: Router,
    private userApiService: UserApiService,
    private tripService: TripService,
    private authService: AuthService
    ){ }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getCurrentUser();
    /*
    if(id){
      this.userApiService.retrieveUser(id).subscribe(
        (user) => {
          this.user= user;
        }

      );
      
    }
    */
    if (id) {
      this.getUserTrip(); // Call the getUser() method to fetch user and trips
    }
      
  }
  deleteUser(user: User){
    if(confirm(`Are you sure you want to delete user '${user.name}'?`)){
      if(user.id){
        this.userApiService.deleteUser(user.id).subscribe(() => {
          console.log(`User '${user.name}' deleted successfully.`);
          this.router.navigateByUrl('/users-list');
         
        });
    } else {
      console.error('User ID is missing.');
    }
      }
    }

    getUserTrip(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if(id){ this.userApiService.retrieveUser(id).subscribe(
        (user) => {
          this.user= user;
          if (user.id) {this.tripService.getTripsByAllUser(user.id).subscribe(
            (trips) => {
              if (this.user){
                this.user.trips = trips;
              }
            }
          )}

        });
      }
      

  }

  // Get the current logged-in user for comparison
  getCurrentUser(): void {
    this.authService.getUser$().subscribe(
      (user) => {
        this.currentUser = user;
      },
      (error) => {
        console.error('Failed to get current user:', error);
      }
    );
  }



}
