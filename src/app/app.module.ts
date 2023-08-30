
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from "./auth/auth.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiTokenInterceptorService } from "./auth/api-token-interceptor.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './users/user-registration/user-registration.component';
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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MapService } from './places/map.service';
import { MapComponent } from './places/map/map.component';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PictureCarousselComponent } from './homepage/picture-caroussel/picture-caroussel.component';
import { RecentTripsListComponent } from './trip/recent-trips-list/recent-trips-list.component';





@NgModule({
  declarations: [
    AppComponent,


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
    
    PictureCarousselComponent,
    RecentTripsListComponent,



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
    BrowserAnimationsModule,
    CarouselModule.forRoot(),


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
