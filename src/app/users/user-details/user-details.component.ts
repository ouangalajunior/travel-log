import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserApiService } from '../user-api.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User | undefined;
  constructor ( 
    private route: ActivatedRoute,
    private router: Router,
    private userApiService: UserApiService
    ){ }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.userApiService.retrieveUser(id).subscribe(
        (user) => {
          this.user= user;
        }

      );
    }
      
  }
  deleteUser(user: User){
    if(confirm(`Are you sure you want to delete user '${user.name}'?`)){
      if(user.id){
        this.userApiService.deleteUser(user.id).subscribe(() => {
          console.log(`User '${user.name}' deleted successfully.`);
          this.router.navigateByUrl('/users-list');
         
        });
    } else {
      console.error('User ID is missing.');
    }
      }
    }
  }


