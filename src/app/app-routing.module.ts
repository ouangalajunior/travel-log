import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from "./auth/login-page/login-page.component";
import { DummyPageComponent } from "./dummy-page/dummy-page.component";
import { authGuard } from "./auth/guards/auth.guard";

import { UserRegistrationComponent } from './user-registration/user-registration.component';
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

const routes: Routes = [
 // { path: "", redirectTo: "dummy", pathMatch: "full" },
  { path: "", redirectTo: "homepage", pathMatch: "full" },
  //{ path: '**', redirectTo: "homepage", pathMatch: "full" },
  { path: "homepage", component: HomepageComponent,
    // Prevent access to this page to unauthenticated users
   canActivate: [authGuard],
},

  { path: "header", component: HeaderComponent,
    // Prevent access to this page to unauthenticated users
    
  },
  { path: "footer", component: FooterComponent,
    // Prevent access to this page to unauthenticated users
  
  },

  {path: "login", component: LoginPageComponent, },
  {path: "create-place", component: CreatePlaceComponent, },
  {path: "trip", component: TripComponent, },
  
  {path: "place-details/:id", component: PlaceDetailsComponent, },
  { path: 'edit-place/:id', component: PlaceEditComponent },
  
  {path: "place-list", component: PlaceListComponent, },

  {path: "user-registration", component: UserRegistrationComponent, },
 
 // { path: "dummy", component: DummyPageComponent,
    // Prevent access to this page to unauthenticated users
  //  canActivate: [authGuard],
 //},


// New trip route
{path:"trip-create", component:TripCreateComponent},
{path: "trip-list", component: TripListComponent},
{path:"trip-list/:id", component: TripDetailComponent},
{path: "trip-edit/:id", component: TripEditComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
