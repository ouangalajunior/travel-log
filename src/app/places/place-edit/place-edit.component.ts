import { Component, OnInit } from '@angular/core';
import { PlaceData, } from '../place.model';
import { PlaceApiService } from '../place-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MapService } from '../map.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-place-edit',
  templateUrl: './place-edit.component.html',
  styleUrls: ['./place-edit.component.css']
})
export class PlaceEditComponent implements OnInit {

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

  placeData: PlaceData | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private placeService: PlaceApiService,
    private formBuilder: FormBuilder,
    private mapService: MapService,
  ) {}

  ngOnInit(): void {
    const placeId = this.route.snapshot.params['id'];
    this.retrievePlace(placeId);

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

  private retrievePlace (id: string): void {

    this.placeService.retrievePlace(id).subscribe(
      (response) => {
        this.placeData = response;
        console.log(response);
      },
      (error) => {
        console.error('Failed to retrieve trip details:', error);
        // Handle error scenario, such as displaying an error message
      }
    );

  }

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

  

}