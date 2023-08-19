import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as L from 'leaflet';

@Injectable({
    providedIn: 'root'
})
export class MapService {
    private mapSubject: BehaviorSubject<L.Map | null> = new BehaviorSubject<L.Map | null>(null);
    map$: Observable<L.Map | null> = this.mapSubject.asObservable();
    marker: any;

    constructor() { }

    initMap(latitude: number, longitude: number, placeName: string): void {
        const mymap = L.map('map').setView([latitude, longitude], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(mymap);

        L.marker([latitude, longitude]).addTo(mymap);

        const popupContent = `<b>${placeName}</b><br>Latitude: ${latitude}, Longitude: ${longitude}`;
        // Attach the popup to the marker on mouseover
    this.marker.on('mouseover', () => {
        this.marker.bindPopup(popupContent).openPopup();
      });
  
      this.marker.on('mouseout', () => {
        this.marker.closePopup(); // Explicitly close the popup
      });
  
        
        L.popup()
            .setLatLng([latitude, longitude])
            .setContent(popupContent)
            .openOn(mymap);

        this.mapSubject.next(mymap);
    }
}
