import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as L from 'leaflet';


@Component({
  selector: 'app-map-create',
  templateUrl: './map-create.component.html',
  styleUrls: ['./map-create.component.css']
})
export class MapCreateComponent implements OnInit {

  locationForm: FormGroup = this.formBuilder.group({
    latitude: [''],
    longitude: ['']
  });

  zoomLevel = 13;
  map: any;
  marker: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    /*
    if (!navigator.geolocation) {
      console.log('Location is not supported');
    }

    this.initMap();
    this.watchPosition();


    this.locationForm = this.formBuilder.group({
      latitude: 0,
      longitude: 0
    });
    */
  }


  initMap(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];

      this.map = L.map('map').setView([coords.latitude, coords.longitude], 13);

      
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(this.map);

      this.marker = L.marker([coords.latitude, coords.longitude], { draggable: false }).addTo(this.map);

      this.marker.on('dragend', (event: any) => {
        const updatedLatLng = event.target.getLatLng();
        this.locationForm.patchValue({
          latitude: updatedLatLng.lat,
          longitude: updatedLatLng.lng
        });
      });
   

      let popup = L.popup()
        .setLatLng([coords.latitude, coords.longitude])
        .setContent('[coords.latitude, coords.longitude]')
        .openOn(this.map);

      // Set form values
      this.locationForm.patchValue({
        latitude: coords.latitude,
        longitude: coords.longitude
      });
    });
  }
  /*


  watchPosition() {
    let desLat = 0;
    let desLon = 0;

    let id = navigator.geolocation.watchPosition(
      (position) => {
        console.log(
          `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
        );
        if (position.coords.latitude === desLat) {
          //  navigator.geolocation.clearWatch(id);
        }
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: false,
        timeout: 50000,
        maximumAge: 0
      }
    );
  }
  */
}
