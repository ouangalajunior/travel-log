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
  filteredPlaceList: PlaceData[] = [];

  constructor(private placeService: PlaceApiService) {}

  ngOnInit(): void {
    this.getPlaces();
  }

  getPlaces(): void {
    this.placeService.getPlaces().subscribe((places) => {
      this.placeList = places;
      this.filteredPlaceList = this.placeList;
    },
    (error) => {
      console.error('Failed to retrieve place list:', error);
      // Handle error scenario, such as displaying an error message
    }
    );
  }

  searchPlaceResults(text: string ) {
    if (!text.trim()) {
      this.filteredPlaceList = this.placeList;
    } else {
      this.filteredPlaceList = this.placeList.filter(
        (placeData) =>
          placeData?.name.toLowerCase().includes(text.toLowerCase()) ||
          placeData?.description.toLowerCase().includes(text.toLowerCase())
      );
    }
  }
}
