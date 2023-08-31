import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlaceData } from '../place.model';
import { PlaceApiService } from '../place-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MapService } from '../map.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.component.html',
  styleUrls: ['./create-place.component.css']
})
export class CreatePlaceComponent implements OnInit {
 

  locationForm: FormGroup = this.formBuilder.group({
    name: [''],          // Added name field
    description: [''],   // Added description field
    latitude: [''],
    longitude: [''],
    tripId: [''],// Fill this with the appropriate trip ID
    tripHref: [''], // Fill this with the appropriate trip Href
    pictureUrl: [''],
  });
  map: any;
  marker: any;
  errorMessage: string | undefined;

  constructor(
    private placeService: PlaceApiService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private mapService: MapService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.locationForm.patchValue({
        tripId: params['tripId'] || '',         // Automatically fill tripId field
        tripHref: params['tripHref'] || ''     // Automatically fill tripHref field
      });
    });

    //map integration to get current user position
    if (!navigator.geolocation) {
      console.log('Location is not supported');
    }

    this.mapService.latitude$.subscribe((latitude) =>
      this.locationForm.patchValue({ latitude })
    );
    this.mapService.longitude$.subscribe((longitude) =>
      this.locationForm.patchValue({ longitude })
    );
    this.mapService.initMap();
  }

  //create place method
  createPlace(): void {
    const formData = this.locationForm.value;

    const newPlace: PlaceData = {
      name: formData.name,
      description: formData.description,
      location: {
        type: "Point",
        coordinates: [formData.longitude, formData.latitude]
      },
      tripId: formData.tripId, // Fill this with the appropriate trip ID
      tripHref: formData.tripHref, // Fill this with the appropriate trip Href
      pictureUrl: formData.pictureUrl
    };

    // Call the API service to create a new place
    this.placeService.createPlace(newPlace).subscribe(
      (createdPlace) => {
        console.log('Place created:', createdPlace);
        // Reset the form after successful creation
        this.locationForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.error('Failed to create:', error);
        let errorMessage = 'An error occurred while creatting the place.';

       if (error.status === 400) {
          errorMessage = 'You are sending a bad request';
        } else if (error.status === 401) {

          errorMessage = 'You need authentication and authorization';
        }
        else if (error.status === 422) {
          errorMessage = 'The request contains semantically invalid properties.';
        }
        else if (error.status === 415) {
          errorMessage = 'Unsupported Media Type';
        }
        this.errorMessage = errorMessage;
        setTimeout(() => {
          this.errorMessage = undefined;
        }, 5000);

      }
    );
    // Here you can submit the form data to your backend or perform any desired action
    console.log('Form submitted:', formData);
  }




}