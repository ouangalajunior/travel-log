
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../user.model';
import { UserApiService } from '../user-api.service';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: User [] = [];
  

  sortingControl = new FormControl();
  searchControl = new FormControl();
  totalItems: number = 0;

  currentPage: number = 1;
  pageSize: number = 10;
  sortValue: string = '';
  searchValue: string = '';
  //Paginator 
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;


  constructor (
    private userApiService: UserApiService
  ){}
  ngOnInit(): void {
    this.sortingControl.valueChanges.subscribe((value) => {
      this.sortValue = value;
      this.getUsers();
    });
    this.searchControl.valueChanges.subscribe((searchValue) => {
      this.searchValue = searchValue;
      this.getUsers();
    });
     // Initial call to get the user list without any search or sorting
  this.getUsers();


      
  }
  /*
  loadAllUsers$(){
    this.userApiService.loadAllUsers$().subscribe(
    (users) => {
      this.userList= users;
      this.filteredUserList = this.userList;
    },
    (error) => {
      console.error('Failed to retrieve user list:', error);
      // Handle error scenario, such as displaying an error message
    }

    );
  }

  searchUserResults(text: string ) {
    if (!text.trim()) {
      this.filteredUserList = this.userList;
    } else {
      this.filteredUserList = this.userList.filter(
        (user) =>
          user?.name.toLowerCase().includes(text.toLowerCase()) 
      );
    }
  }
  */
  //Method to list all user, with search and sort options
  getUsers(): void {
    this.userApiService.getUserSearch(this.sortValue, this.currentPage, this.pageSize, this.searchValue,
      
       )
      .subscribe((response) => {
        this.userList = response.body || [];
  
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
    this.getUsers();
  }


}
