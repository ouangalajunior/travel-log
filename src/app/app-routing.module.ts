import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from "./auth/login-page/login-page.component";
import { authGuard } from "./auth/guards/auth.guard";
import { UserRegistrationComponent } from './users/user-registration/user-registration.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TripComponent } from './trip/trip.component';
import { CreatePlaceComponent } from './places/create-place/create-place.component';
import { PlaceListComponent } from './places/place-list/place-list.component';
import { PlaceEditComponent } from './places/place-edit/place-edit.component';
import { PlaceDetailsComponent } from './places/place-details/place-details.component';
import { TripCreateComponent } from './trip/trip-create/trip-create.component';
import { TripListComponent } from './trip/trip-list/trip-list.component';
import { TripDetailComponent } from './trip/trip-detail/trip-detail.component';
import { TripEditComponent } from './trip/trip-edit/trip-edit.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { MyTripComponent } from './trip/my-trip/my-trip.component';




const routes: Routes = [
  //default page redirection to homepage
  { path: "", redirectTo: "homepage", pathMatch: "full" },
  //no found page redirection to homepage
  //{ path: '**', redirectTo: "homepage", pathMatch: "full" },

  {
    path: "homepage", component: HomepageComponent,
    // Prevent access to this page to unauthenticated users
    //canActivate: [authGuard],
  },
  { path: "header", component: HeaderComponent },
  { path: "footer", component: FooterComponent },


  //users route
  { path: "user-list", component: UserListComponent },
  { path: "user-list/:id", component: UserDetailsComponent },
  { path: "user-edit/:id", component: UserEditComponent },
  { path: "login", component: LoginPageComponent, },
  { path: "user-registration", component: UserRegistrationComponent, },

  // New trip route
  // Prevent access to this page to unauthenticated users
  { path: "trip", component: TripComponent, },
  { path: "trip-create", component: TripCreateComponent, canActivate: [authGuard] },
  { path: "trip-list", component: TripListComponent },
  { path: "trip-list/:id", component: TripDetailComponent },
  { path: "trip-edit/:id", component: TripEditComponent },
  // Prevent access to this page to unauthenticated users
  { path: "mytrip", component: MyTripComponent, canActivate: [authGuard] },

  // Place route
  { path: "place-details/:id", component: PlaceDetailsComponent, },
  { path: 'edit-place/:id', component: PlaceEditComponent },
  { path: "place-list", component: PlaceListComponent, },
  { path: "create-place", component: CreatePlaceComponent, },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
