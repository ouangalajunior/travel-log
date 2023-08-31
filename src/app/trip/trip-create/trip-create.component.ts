import { Component, } from '@angular/core';
import { TripData } from '../trip.model';
import { TripService } from '../trip-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',

})
export class TripCreateComponent {

  //new trip 
  newTrip: TripData = {
      title: '',
    description: '',
    };
    errorMessage: string | undefined;
  constructor(
    private tripService: TripService,
    private router: Router
    ) { }

  

//create trip method
  createTrip(): void {
    this.tripService.createTrip(this.newTrip).subscribe(createdTrip => {
      alert('Trip created successfully!');
      this.newTrip = {
       
        title: '',
        description: '',
       
      };
      this.router.navigateByUrl('/trip-list');
    },

    (error: HttpErrorResponse) => {
          console.error('Failed to create:', error);
          let errorMessage = 'An error occurred while updating the trip.';

         if (error.status === 400) {
            errorMessage = 'You are sending a JSON value that is not an object';
          } else if (error.status === 401) {

            errorMessage = 'You need authentication and authorization';
          }
          else if (error.status === 422) {
            errorMessage = 'The request contains semantically invalid properties.';
          }
          this.errorMessage = errorMessage;
          setTimeout(() => {
            this.errorMessage = undefined;
          }, 5000);

        }
    );
  }


}
