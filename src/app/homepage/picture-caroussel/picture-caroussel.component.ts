import { Component, OnInit } from '@angular/core';
import { PlaceApiService } from 'src/app/places/place-api.service';
import { PlaceData } from 'src/app/places/place.model';

@Component({
  selector: 'app-picture-caroussel',
  templateUrl: './picture-caroussel.component.html',
  styleUrls: ['./picture-caroussel.component.css']
})
export class PictureCarousselComponent implements OnInit {
  recentPlaces: PlaceData[] = [];

  constructor(private placeService: PlaceApiService) { }

  ngOnInit(): void {
    //call for 5 recents places
    this.placeService.getRecentPlaces().subscribe(places => {
      this.recentPlaces = places;
    });
  }

}
