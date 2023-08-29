import { Component, } from '@angular/core';
import { TripData } from '../trip.model';
import { TripService } from '../trip-api.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    (error) => {
      console.error('Failed to create Trip:', error);
      // Handle error scenario, such as displaying an error message
    }
    );
  }


}
