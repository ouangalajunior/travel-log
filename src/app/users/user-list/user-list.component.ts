
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
    }
    );
  }



}
