import { Component } from '@angular/core';
import { User } from "../users/user.model";

import { UserApiService } from '../users/user-api.service';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  newUser: User = {
    name: '',
    password: '',
  };
  constructor (private userService: UserApiService) {}

  registerUser (): void {
    this.userService.registerUser(this.newUser).subscribe(registeredUser=> {
      console.log('Your account is created successfully');

      this.newUser = {
        name: '',
        password: '',
      };
    }


    );

  }

}
