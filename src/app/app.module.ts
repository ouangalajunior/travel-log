import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { AuthModule } from "./auth/auth.module";
import { DummyPageComponent } from './dummy-page/dummy-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiTokenInterceptorService } from "./auth/api-token-interceptor.service";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserCurrentComponent } from './users/user-current/user-current.component';
import { MyTripComponent } from './trip/my-trip/my-trip.component';
import { MapComponent } from './places/map/map.component';
import { TripListV2Component } from './trip/trip-list-v2/trip-list-v2.component';

//Material module for tripv2 test
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TripListV3Component } from './trip/trip-list-v3/trip-list-v3.component';
import { CreatePlaceV2Component } from './places/create-place-v2/create-place-v2.component';
import { MapCreateComponent } from './places/map-create/map-create.component';
import { MapService } from './places/map.service';




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
    UserListComponent,
    UserDetailsComponent,
    UserEditComponent,
    UserCurrentComponent,
    MyTripComponent,
    MapComponent,
    TripListV2Component,
    TripListV3Component,
    CreatePlaceV2Component,
    MapCreateComponent,
    
    
    //TripSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
    
   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiTokenInterceptorService,
      multi: true,
    },
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
