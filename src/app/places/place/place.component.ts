import { Component, Input } from '@angular/core';
import { PlaceData } from '../place.model';
import { ActivatedRoute,Router } from '@angular/router';
import { PlaceApiService } from '../place-api.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent {
  @Input () placeData!: PlaceData;
  constructor (private placeService: PlaceApiService, 
    private router: Router,
    private route: ActivatedRoute,
    ){}

}
