import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

//Introduce ng-container with ngIf directive to display logout button only after user looged in successfully.
//change auth service to public to allow template access.
@Component({
  selector: "app-logout-button",
  template: '<ng-container *ngIf="auth.isAuthenticated$() | async"> <button (click)="logout()" class="btn btn-primary">Logout</button> </ng-container>',
})
export class LogoutButtonComponent {
  constructor(public auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }
}