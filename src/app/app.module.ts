import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { AuthModule } from "./auth/auth.module";
import { DummyPageComponent } from './dummy-page/dummy-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiTokenInterceptorService } from "./auth/api-token-interceptor.service";

import { FormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TripComponent } from './trip/trip.component';

import { CreatePlaceComponent } from './places/create-place/create-place.component';
import { PlaceDetailsComponent } from './places/place-details/place-details.component';
import { PlaceComponent } from './places/place/place.component';
import { PlaceListComponent } from './places/place-list/place-list.component';
import { PlaceEditComponent } from './places/place-edit/place-edit.component';

import { TripCreateComponent } from './trip/trip-create/trip-create.component';
import { TripEditComponent } from './trip/trip-edit/trip-edit.component';
import { TripListComponent } from './trip/trip-list/trip-list.component';
import { TripDetailComponent } from './trip/trip-detail/trip-detail.component';



//import { TripSearchComponent } from './trip-search/trip-search.component';

@NgModule({
  declarations: [
    AppComponent,
    DummyPageComponent,
   
    UserRegistrationComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    TripComponent,
    
    CreatePlaceComponent,
    PlaceDetailsComponent,
    PlaceComponent,
    PlaceListComponent,
    PlaceEditComponent,
    
    
    TripCreateComponent,
    TripEditComponent,
    TripListComponent,
    TripDetailComponent,
    
    
    //TripSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    FormsModule,
    MatSnackBarModule
    
   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiTokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
