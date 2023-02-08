import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @Input() lat!: number;
  @Input() lng!: number;
  center!: google.maps.LatLngLiteral;
  constructor() {}
  ngOnInit(): void {
    this.setCenter();
    this.addMarker();
  }
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 13;
  addMarker() {
    this.markerPositions.push(this.center);
  }
  openInfoWindow(marker: MapMarker) {
    if (this.infoWindow != undefined) {
      this.setCenter();
      this.infoWindow.open(marker);
    }
  }
  setCenter() {
    this.center = {
      lat: this.lat,
      lng: this.lng,
    };
  }
}
