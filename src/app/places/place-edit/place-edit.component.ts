import { Component, OnInit } from '@angular/core';
import { PlaceData, } from '../place.model';
import { PlaceApiService } from '../place-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-place-edit',
  templateUrl: './place-edit.component.html',
  styleUrls: ['./place-edit.component.css']
})
export class PlaceEditComponent implements OnInit {

  placeData: PlaceData | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private placeService: PlaceApiService
  ) {}

  ngOnInit(): void {
    const placeId = this.route.snapshot.params['id'];
    this.retrievePlace(placeId);
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
