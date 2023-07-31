import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-current',
  templateUrl: './user-current.component.html',
  styleUrls: ['./user-current.component.css']
})
export class UserCurrentComponent implements OnInit{
 currentUser: User | undefined;

  constructor (
    private authService: AuthService

  ){}
  ngOnInit(): void {
    this.getCurrentUser();
  }
  getCurrentUser(): void {
    this.authService.getUser$().subscribe(
      (user) => {
        this.currentUser = user;
        if (user) {
          console.log('Current user:', user.name);
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
