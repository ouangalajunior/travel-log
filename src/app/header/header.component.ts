import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public auth: AuthService,
    private router: Router
    ) {}

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl("/login");// Handle navigation or other logout actions if needed
  }

  

}
