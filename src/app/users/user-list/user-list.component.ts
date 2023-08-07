
import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserApiService } from '../user-api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: User [] = [];
  filteredUserList: User [] = [];
  constructor (
    private userApiService: UserApiService
  ){}
  ngOnInit(): void {
    this.loadAllUsers$();
      
  }
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



}
