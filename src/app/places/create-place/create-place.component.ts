import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { PlaceApiService } from '../place-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.component.html',
  styleUrls: ['./create-place.component.css']
})
export class CreatePlaceComponent implements OnInit {

  newPlace: Place = {
    name: '',
    description: '',
    location: { type: 'Point', coordinates: [0, 0] }, // Set initial GeoJsonPoint coordinates
    tripId: '', // Fill this with the appropriate trip ID
    tripHref: '', // Fill this with the appropriate trip Href
    pictureUrl: ''
  };

  constructor (
    private placeService: PlaceApiService,
    private route: ActivatedRoute,
    private router: Router) {}

    ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
        this.newPlace.tripId = params['tripId'] || '';
        this.newPlace.tripHref = params['tripHref'] || '';
      });
    }
  

createPlace(): void {
  this.placeService.createPlace(this.newPlace).subscribe(
    (createdPlace) => {
      console.log('Place created successfully:', createdPlace);
      // Optionally, navigate to the place details page or any other action after successful creation
      this.newPlace = {
        name: '',
        description: '',
        location: { type: 'Point', coordinates: [0, 0] },
        tripId: this.newPlace.tripId, // Set tripId from newPlace object
        tripHref: this.newPlace.tripHref, // Set tripHref from newPlace object
        pictureUrl: ''
      };
    },
    (error) => {
      console.error('Failed to create place:', error);
      // Handle error scenario, such as displaying an error message
    }
  );
}

    
    


  
}
