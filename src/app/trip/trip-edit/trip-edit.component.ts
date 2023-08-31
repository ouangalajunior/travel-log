
import { Component, OnInit } from '@angular/core';
import { TripData } from '../trip.model';
import { TripService } from '../trip-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',

})
export class TripEditComponent implements OnInit {
  //trip data and error message variable
  tripData: TripData | undefined;
  errorMessage: string | undefined;
  tripForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private tripService: TripService,

  ) {
    this.tripForm = this.formBuilder.group({
      title: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    const tripId = this.route.snapshot.params['id'];
    this.retrieveTrip(tripId);
  }

  //method to retrieve trip
  retrieveTrip(id: string) {
    this.tripService.retrieveTrip(id).subscribe(
      (response) => {
        this.tripData = response;
        //remove comment to  see response in console
        // console.log(response);
        this.tripForm.patchValue({
          title: this.tripData.title,
          description: this.tripData.description
        });
      },
      (error) => {
        console.error('Failed to retrieve trip details:', error);
        // Handle error scenario, such as displaying an error message
      }
    );
  }

  //Mehtod to update trip with error handling

  updateTrip(): void {
    if (this.tripData) {
      const formData = this.tripForm.value;
      const updatedTrip : TripData = {
        ...this.tripData,
        title: formData.title,
        description: formData.description,
      }


      this.tripService.updateTrip(updatedTrip ).subscribe(
        () => {
          alert('Trip updated successfully!');
          this.router.navigate(['/trip-list', this.tripData?.id]);
        },
        (error: HttpErrorResponse) => {
          console.error('Failed to update trip:', error);
          let errorMessage = 'An error occurred while updating the trip.';

          if (error.status === 403) {
            errorMessage = 'You are not authorized to update this trip.';
          } else if (error.status === 400) {
            errorMessage = 'You are sending a JSON value that is not an object';
          } else if (error.status === 401) {

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
}

