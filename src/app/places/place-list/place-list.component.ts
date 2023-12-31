import { Component, OnInit, ViewChild } from '@angular/core';
import { PlaceData } from '../place.model';
import { PlaceApiService } from '../place-api.service';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {
  placeList: PlaceData[] = [];
  //filteredPlaceList: PlaceData[] = [];
 
  //Search and sort control

  sortingControl = new FormControl();
  searchControl = new FormControl();
  totalItems: number = 0;
//Pagination variable declaration
  currentPage: number = 1;
  pageSize: number = 10;
  sortValue: string = '';
  searchValue: string = '';
  //Paginator 
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;



  constructor(private placeService: PlaceApiService) {}

  ngOnInit(): void {
    //sort
    this.sortingControl.valueChanges.subscribe((value) => {
      this.sortValue = value;
      this.getPlaces();
    });
    //search
    this.searchControl.valueChanges.subscribe((searchValue) => {
      this.searchValue = searchValue;
      this.getPlaces();
    });
     // Initial call to get the place list without any search or sorting
  this.getPlaces();
  }


   //Method to list all user, with search and sort options
   getPlaces(): void {
    this.placeService.getPlaceSearch(this.sortValue, this.currentPage, this.pageSize, this.searchValue,
      
       )
      .subscribe((response) => {
        this.placeList = response.body || [];
  
        // Update pagination variables based on response headers
        this.totalItems = parseInt(response.headers.get('Pagination-Filtered-Total') || '0', 10);
        this.currentPage = parseInt(response.headers.get('Pagination-Page') || '1', 10);
        this.pageSize = parseInt(response.headers.get('Pagination-Page-Size') || this.pageSize.toString(), 10);
  
        // Update the paginator length based on the total count
        if (this.paginator) {
          this.paginator.length = this.totalItems;
        }
      });
  }
  
//method to handle page change and data refresh
  onPageChange(e: PageEvent) {
    this.currentPage = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.getPlaces();
  }


}
