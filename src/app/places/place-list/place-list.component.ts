import { Component, OnInit } from '@angular/core';
import { PlaceData } from '../place.model';
import { PlaceApiService } from '../place-api.service';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {
  placeList: PlaceData[] = [];

  constructor(private placeService: PlaceApiService) {}

  ngOnInit(): void {
    this.getPlaces();
  }

  getPlaces(): void {
    this.placeService.getPlaces().subscribe((places) => {
      this.placeList = places;
    });
  }
}
