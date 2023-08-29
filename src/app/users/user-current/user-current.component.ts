import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-current',
  templateUrl: './user-current.component.html',
  
})
export class UserCurrentComponent implements OnInit{
 currentUser: User | undefined;

  constructor (
    private authService: AuthService

  ){}
  ngOnInit(): void {
    this.getCurrentUser();
  }

  //Method to get current user
  getCurrentUser(): void {
    this.authService.getUser$().subscribe(
      (user) => {
        this.currentUser = user;
        if (user) {
          //remove comment to display current user in console
          //console.log('Current user:', user.name);
          //set time to hide current user message in the header after 1 min log in
          setTimeout(() => {
            this.currentUser = undefined;
          }, 60000);
        } else {
          console.log('No user logged in.');
        }
      },
      (error) => {
        console.error('Failed to get current user:', error);
      }
    );
  }

}
