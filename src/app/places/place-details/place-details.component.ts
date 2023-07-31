import { Component } from '@angular/core';
import { PlaceData } from '../place.model';
import { PlaceApiService } from '../place-api.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent {
  placeData: PlaceData | undefined;
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private placeService: PlaceApiService
  ){ }

  ngOnInit(): void {
    const placeId = this.route.snapshot.params['id'];
    this.retrievePlace(placeId);
  }
  private retrievePlace(id: string) {
    this.placeService.retrievePlace(id).subscribe(
      (response) => {
        this.placeData = response;
        console.log(response);
      },
      (error) => {
        console.error('Failed to retrieve place details:', error);
        // Handle error scenario, such as displaying an error message
      }
    );
  }

  editPlace(): void{
    this.router.navigate(['/edit-place', this.placeData?.id]);

  }

}
