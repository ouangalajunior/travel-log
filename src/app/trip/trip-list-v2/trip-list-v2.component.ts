import { Component, OnInit, ViewChild } from '@angular/core';
import { TripData } from '../trip.model';
import { TripService } from '../trip-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/users/user.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-trip-list-v2',
  templateUrl: './trip-list-v2.component.html',
  styleUrls: ['./trip-list-v2.component.css']
})
export class TripListV2Component implements OnInit {

  tripList: TripData[] = [];
  //filteredTripList: TripData[] = [];
  sortingControl = new FormControl();
  searchControl = new FormControl();
  totalItems: number = 0;
  
  currentPage: number = 1;
  pageSize: number = 5;
  
  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private router: Router
  ) { }

  ngOnInit(): void {
  
   // this.get("");
  


   // this.doSorting("");
/*
   this.searchControl.valueChanges.pipe(
    
  ).subscribe((searchValue) => {
    this.searchTrip(searchValue);
  });

  this.sortingControl.valueChanges.subscribe((value) => {
    if (value) {
      let sortResult = this.doSorting(value);
      this.get(sortResult.sort);
    }
  });
*/

  }
  /*
  getTrips(): void {
    this.tripService.getTrips().subscribe(
      (trips) => {
        this.tripList = trips;
        this.filteredTripList = this.tripList;

      },
      (error) => {
        console.error('Failed to retrieve trip list:', error);
        // Handle error scenario, such as displaying an error message
      }
    );
  }
  */

/*
  searchTripResults(text: string) {
    if (!text.trim()) {
      this.filteredTripList = this.tripList;
    } else {
      this.filteredTripList = this.tripList.filter(
        (tripData) =>
          tripData?.title.toLowerCase().includes(text.toLowerCase()) ||
          tripData?.description.toLowerCase().includes(text.toLowerCase())
      );
    }
  }
*/
get(sort: string) {
  this.tripService.get(sort, this.currentPage, this.pageSize)
    .subscribe((response) => {
      this.tripList = response.body as TripData [];
    });
}

  

onPageChange(e: PageEvent) {
  this.currentPage = e.pageIndex + 1;
  let sortResult = this.doSorting(this.sortingControl.value);
  this.get(sortResult.sort);
}
  //Search trip V2
  
  /*
  searchTrip(search: string) {
    this.tripService.searchTrips(search).subscribe((trips) => {
      this.tripList = trips;
    });
  }
  */







  doSorting(value: string) {
    let sort: string = '';

    if (value.toLowerCase() === 'title-desc') {
      sort = 'title';

    } else if (value.toLowerCase() === 'title-asc') {
      sort = '-title';

    } else if (value.toLowerCase() === 'date-desc') {
      sort = 'createdAt';

    } else if (value.toLowerCase() === 'date-asc') {
      sort = '-createdAt';

    }
    return {
      sort,

    }
  }




  }

