import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare const L: any;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: any;
  private marker: any;

  private latitudeSubject = new BehaviorSubject<number>(0);
  private longitudeSubject = new BehaviorSubject<number>(0);

  latitude$ = this.latitudeSubject.asObservable();
  longitude$ = this.longitudeSubject.asObservable();

  constructor() {}
//map method using leaflet
  initMap(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];

      this.map = L.map('map').setView(latLong, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(this.map);

      this.marker = L.marker(latLong, { draggable: true }).addTo(this.map);

      this.marker.on('dragend', (event: any) => {
        const updatedLatLng = event.target.getLatLng();
        this.latitudeSubject.next(updatedLatLng.lat);
        this.longitudeSubject.next(updatedLatLng.lng);
      });

      this.latitudeSubject.next(coords.latitude);
      this.longitudeSubject.next(coords.longitude);
    });
  }
}