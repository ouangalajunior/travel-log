import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlaceData } from '../place.model';
import { MapService } from '../map.service';
import { Place } from '../place.model';
import { PlaceApiService } from '../place-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-place-v2',
  templateUrl: './create-place-v2.component.html',
  styleUrls: ['./create-place-v2.component.css']
})
export class CreatePlaceV2Component implements OnInit {
  locationForm: FormGroup = this.formBuilder.group({
    name: [''],          // Added name field
    description: [''],   // Added description field
    latitude: [''],
    longitude: [''],
    tripId: [''],// Fill this with the appropriate trip ID
    tripHref: [''], // Fill this with the appropriate trip Href
    pictureUrl: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private mapService: MapService,
    private placeService: PlaceApiService,
    private route: ActivatedRoute,
  ) {
   
  }

  ngOnInit(): void {
    this.mapService.latitude$.subscribe((latitude) =>
      this.locationForm.patchValue({ latitude })
    );
    this.mapService.longitude$.subscribe((longitude) =>
      this.locationForm.patchValue({ longitude })
    );
    this.mapService.initMap();
  }

  createPlace(): void {
    const formData = this.locationForm.value;

    const newPlace: Place= {
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
    (error) => {
      console.error('Error creating place:', error);
    }
  );
    // Here you can submit the form data to your backend or perform any desired action
    console.log('Form submitted:', formData);
  }
}



  
 

