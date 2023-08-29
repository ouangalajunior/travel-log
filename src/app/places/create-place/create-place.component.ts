import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlaceData } from '../place.model';
import { PlaceApiService } from '../place-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MapService } from '../map.service';


@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.component.html',
  styleUrls: ['./create-place.component.css']
})
export class CreatePlaceComponent implements OnInit {
  /*
    newPlace: Place = {
      name: '',
      description: '',
      location: { type: 'Point', coordinates: [0, 0] }, // Set initial GeoJsonPoint coordinates
      tripId: '', // Fill this with the appropriate trip ID
      tripHref: '', // Fill this with the appropriate trip Href
      pictureUrl: ''
    };
  */

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
      (error) => {
        console.error('Error creating place:', error);
      }
    );
    // Here you can submit the form data to your backend or perform any desired action
    console.log('Form submitted:', formData);
  }


  /*
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
  */





/*
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['latitude']) {
      this.locationForm.patchValue({ latitude: changes['latitude'].currentValue });
    }
    if (changes['longitude']) {
      this.locationForm.patchValue({ longitude: changes['longitude'].currentValue });
    }
    if (changes['placeData']) {
      const newPlaceData = changes['placeData'].currentValue;
      if (newPlaceData) {
        this.locationForm.patchValue({
          name: newPlaceData.name,
          description: newPlaceData.description,
          latitude: newPlaceData.location.coordinates[1],
          longitude: newPlaceData.location.coordinates[0]
        });
      }
    }
  }


*/



}