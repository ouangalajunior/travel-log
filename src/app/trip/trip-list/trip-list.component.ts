import { Component, OnInit, ViewChild } from '@angular/core';
import { TripData } from '../trip.model';
import { TripService } from '../trip-api.service';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  
  tripList: TripData[] = [];

  //Search and sort control
  sortingControl = new FormControl();
  searchControl = new FormControl();
  
  //Pagination variable declaration
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  sortValue: string = '';
  searchValue: string = '';
  titleValue: string = '';

 //Pagintor library from anfular material
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor( private tripService: TripService,) { }

  ngOnInit(): void {
    // Initial call to get the trip list without any search or sorting
  this.getTrips();
  //sort trip call
    this.sortingControl.valueChanges.subscribe((value) => {
      this.sortValue = value;
      this.getTrips();
    });

    //search trip call
    this.searchControl.valueChanges.subscribe((searchValue) => {
      this.searchValue = searchValue;
      this.getTrips();
    });
     
  }
  //Method to list all user, with search and sort options
  getTrips(): void {
    this.tripService.getTripSearch(this.sortValue, this.currentPage, this.pageSize, this.searchValue, )
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
