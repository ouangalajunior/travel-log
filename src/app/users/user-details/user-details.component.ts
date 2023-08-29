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
    //get current user logged in for edit delete buttons logic
    this.getCurrentUser();
    
    if (id) {
      this.getUserTrip(); // Call the getUser() method to fetch user and trips
    }
      
  }
  
  // method to delete user
  deleteUser(user: User){
    if(confirm(`Are you sure you want to delete user '${user.name}'? All trips and places belong to this user will be deleted`)){
      if(user.id){
        this.userApiService.deleteUser(user.id).subscribe(() => {
          alert(`User '${user.name}' deleted successfully.`);
          this.router.navigateByUrl('/login');
         
        });
    } else {
      console.error('User ID is missing.');
    }
      }
    }

  //method to get user's trips
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
