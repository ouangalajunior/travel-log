import { Component, OnInit } from '@angular/core';
import { PlaceData, } from '../place.model';
import { PlaceApiService } from '../place-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MapService } from '../map.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-place-edit',
  templateUrl: './place-edit.component.html',
  
})
export class PlaceEditComponent implements OnInit {
  map: any;
  marker: any;

  placeData: PlaceData | undefined;
  locationForm: FormGroup;

  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private placeService: PlaceApiService,
    private formBuilder: FormBuilder,
    private mapService: MapService,
  ) { this.locationForm = this.formBuilder.group({
    name: [''],
    description: [''],
    latitude: [''],
    longitude: [''],
    tripId: [''],
    tripHref: [''],
    pictureUrl: [''],
  });
}

  ngOnInit(): void {
    const placeId = this.route.snapshot.params['id'];
    this.retrievePlace(placeId);
//map integration
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

//retrieve place method
private retrievePlace(id: string): void {
  this.placeService.retrievePlace(id).subscribe(
    (response) => {
      this.placeData = response;
      // Populate form data using patchValue()
      this.locationForm.patchValue({
        name: this.placeData.name,
        description: this.placeData.description,
        pictureUrl: this.placeData.pictureUrl,
        latitude: this.placeData.location.coordinates[1],
        longitude: this.placeData.location.coordinates[0],
        tripId: this.placeData.tripId,
        tripHref: this.placeData.tripHref,
      });
    },
    (error) => {
      console.error('Failed to retrieve place details:', error);
      // Handle error scenario, such as displaying an error message
    }
  );

  }
  updatePlace(): void {
    if (this.placeData) {
      const formData = this.locationForm.value;
      const updatedPlace: PlaceData = {
        ...this.placeData,
        name: formData.name,
        description: formData.description,
        location: {
          type: 'Point',
          coordinates: [formData.longitude, formData.latitude],
        },
        tripId: formData.tripId,
        tripHref: formData.tripHref,
        pictureUrl: formData.pictureUrl,
      };

      this.placeService.updatePlace(updatedPlace).subscribe(
        () => {
          console.log('Place updated successfully!');
          this.router.navigate(['/place-details', this.placeData?.id]);
        },
        (error) => {
          console.error('Failed to update place:', error);
          // Handle error scenario, such as displaying an error message
        }
      );
    }


  // update place method
  /*
  updatePlace (): void {

    if (this.placeData) {
      this.placeService.updatePlace(this.placeData).subscribe(
        () => {
          console.log('Place updated successfully!');
          this.router.navigate(['/place-details', this.placeData?.id]);
        },
        (error) => {
          console.error('Failed to update trip:', error);
          // Handle error scenario, such as displaying an error message
        }
      );
    }
  }
  */
  /*

  updatePlaceV2(){
    const formData = this.locationForm.value;

    const updatePlace: PlaceData = {
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
    this.placeService.updatePlace(updatePlace).subscribe(
      () => {
        console.log('Place updated successfully!');
        this.router.navigate(['/place-details', this.placeData?.id]);
      },
      (error) => {
        console.error('Failed to update trip:', error);
        // Handle error scenario, such as displaying an error message
      }
    );



  }

  */

}
}