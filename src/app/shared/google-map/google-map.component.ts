import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { staticValue } from 'src/app/constants/constant';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  title?: string;
  latitude?: number;
  longitude?: number;
  primaryButton?: boolean = true;
  primaryButtonText?: string = "OK";
  zoom = staticValue.mapZoom;
  display: any;
  center: google.maps.LatLngLiteral;

  primaryButtonConfirmationEvent = new EventEmitter<any>();

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.center = {
      lat: this.latitude,
      lng: this.longitude
    };
  }

  moveMap(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.display = event.latLng.toJSON();
  }

}
