
import { Component, OnInit } from '@angular/core';
import { TripData } from '../trip.model';
import { TripService } from '../trip-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css']
})
export class TripEditComponent implements OnInit {
  tripData: TripData | undefined;
  errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const tripId = this.route.snapshot.params['id'];
    this.retrieveTrip(tripId);
  }

  private retrieveTrip(id: string) {
    this.tripService.retrieveTrip(id).subscribe(
      (response) => {
        this.tripData = response;
        console.log(response);
      },
      (error) => {
        console.error('Failed to retrieve trip details:', error);
        // Handle error scenario, such as displaying an error message
      }
    );
  }

  updateTrip(): void {
    if (this.tripData) {
      this.tripService.updateTrip(this.tripData).subscribe(
        () => {
          console.log('Trip updated successfully!');
          this.router.navigate(['/trip-list', this.tripData?.id]);
        },
        (error: HttpErrorResponse) => {
          console.error('Failed to update trip:', error);
          let errorMessage = 'An error occurred while updating the trip.';
          
          if (error.status === 403) {
            errorMessage = 'You are not authorized to update this trip.';
          } else if (error.status === 400) {
            errorMessage = 'You are sending a JSON value that is not an object';
          } else if (error.status === 401){

          } 
          
          else if (error.status === 422){
            errorMessage = 'The request contains semantically invalid properties.';

          }

          
          
         this.errorMessage = errorMessage;
         //this.snackBar.open(errorMessage, 'Dismiss', { duration: 5000 });
         setTimeout(() => {
          this.errorMessage = undefined;
        }, 5000);
         
        }
      );
    }
  }
}

