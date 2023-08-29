import { Component } from '@angular/core';
import { User } from "../user.model";
import { Router } from '@angular/router';
import { UserApiService } from '../user-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',

})
export class UserRegistrationComponent {
  registrationForm: FormGroup;
  accountCreated: boolean = false;
  //use of formbuilder, formgroup and validator 

  constructor(private userService: UserApiService,
    private formbuilder: FormBuilder,
    private router: Router
  ) {
    //registration form builder with validators for username and password
    this.registrationForm = this.formbuilder.group({
      name: ['', [Validators.required, this.usernameValidator]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  // method for new user creation
  registerUser(): void {
    if (this.registrationForm.valid) {
      const newUser: User = {
        name: this.registrationForm.get('name')?.value,
        password: this.registrationForm.get('password')?.value,
      };
      this.userService.registerUser(newUser).subscribe(
        (registeredUser) => {
          alert('Your account is created successfully');
          this.accountCreated = true; // Set accountCreated to true
          // Reset the form after successful registration
          this.registrationForm.reset();
          //set time out to login page redirection
          setTimeout(() => {
            this.router.navigate(['/login']); // Navigate to the login page
          }, 5000);
        },
        (error) => {
          console.error('Error creating account:', error);
        }
      );
    }
  }

  //user name validator method
  usernameValidator(control: { value: string }): null | { validUsername: boolean } {
    const validUsernamePattern = /^[a-zA-Z0-9-]{3,25}$/;
    if (!validUsernamePattern.test(control.value)) {
      return { validUsername: true };
    }
    return null;
  }

}


