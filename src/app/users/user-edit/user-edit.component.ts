import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserApiService } from '../user-api.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userApiService: UserApiService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.retrieveUser(id);

  }

  private retrieveUser(id: string): void {

    this.userApiService.retrieveUser(id).subscribe(
      (response) => {
        this.user = response;
        console.log(response);
      },
      (error) => {
        console.error('Failed to retrieve trip details:', error);
        // Handle error scenario, such as displaying an error message
      }
    );

  }

  updateUser(): void {

    if (this.user) {
      this.userApiService.updateUser(this.user).subscribe(
        () => {
          console.log('Place updated successfully!');
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
