import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserApiService } from '../user-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  
})
export class UserEditComponent implements OnInit {
  user: User | undefined;
  userForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userApiService: UserApiService
  ) { 
    this.userForm = this.formBuilder.group({
      name: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.retrieveUser(id);

  }

  //method to retrieve user
  private retrieveUser(id: string): void {

    this.userApiService.retrieveUser(id).subscribe(
      (response) => {
        this.user = response;
// remove the comment to see the response in the console
      //  console.log(response);
      this.userForm.patchValue({
        name: this.user.name,
        password: this.user.password

      });
      },
      (error) => {
        console.error('Failed to retrieve trip details:', error);
        // Handle error scenario, such as displaying an error message
      }
    );

  }

//Nethod to update  user
  updateUser(): void {

    if (this.user) {

      const formData = this.userForm.value;
      const updatedUser : User = {
        ...this.user,
        name: formData.name,
        password: formData.password,
      }
      this.userApiService.updateUser(updatedUser ).subscribe(
        () => {
          alert('Traveler updated successfully!');
          this.router.navigate(['/user-list', this.user?.id]);
        },
        (error) => {
          console.error('Failed to update trip:', error);
          // Handle error scenario, such as displaying an error message
        }
      );
    }
  }

}
