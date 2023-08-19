import { Component, OnInit, ViewChild } from '@angular/core';
import { TripData } from '../trip.model';
import { TripService } from '../trip-api.service';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-trip-list-v3',
  templateUrl: './trip-list-v3.component.html',
  styleUrls: ['./trip-list-v3.component.css']
})
export class TripListV3Component implements OnInit {

  tripList: TripData[] = [];
  sortingControl = new FormControl();
  searchControl = new FormControl();
  totalItems: number = 0;

  currentPage: number = 1;
  pageSize: number = 5;
  sortValue: string = '';
  searchValue: string = '';
  

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    this.sortingControl.valueChanges.subscribe((value) => {
      this.sortValue = value;
      this.getTrips();
    });
    this.searchControl.valueChanges.subscribe((searchValue) => {
      this.searchValue = searchValue;
      this.getTrips();
    });
     // Initial call to get the trip list without any search or sorting
  this.getTrips();
  }

  getTrips(): void {
    this.tripService.getTripSearch(this.sortValue, this.currentPage, this.pageSize, this.searchValue,
      
       )
      .subscribe((response) => {
        this.tripList = response.body || [];
  
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
    this.getTrips();
  }
}
