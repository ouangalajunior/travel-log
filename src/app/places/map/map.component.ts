import { Component, OnInit, Input } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() latitude: number | undefined;
  @Input() longitude: number | undefined;
  @Input() placeName: string | undefined;

  
  zoomLevel = 13; // Replace with the desired zoom level
  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }
  
  initMap(): void {
    if (!this.latitude || !this.longitude || !this.placeName) {
      return;
    }

    const mymap = L.map('map').setView([this.latitude, this.longitude], this.zoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(mymap);

    
    let marker= L.marker([this.latitude, this.longitude]).addTo(mymap);

    const popupContent = `<b>${this.placeName}</b><br>Latitude: ${this.latitude}, Longitude: ${this.longitude}`;
    L.popup()
      .setLatLng([this.latitude, this.longitude])
      .setContent(popupContent)
      .openOn(mymap);
    

        
}




    


}


