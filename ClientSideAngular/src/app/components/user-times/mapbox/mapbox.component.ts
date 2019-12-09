import { Component, OnInit, ChangeDetectorRef, Input } from "@angular/core";
import { environment } from "../../../../environments/environment";
import * as mapboxgl from "mapbox-gl";
import { MapService } from "../../../services/map.service"

@Component({
  selector: "app-mapbox",
  templateUrl: "./mapbox.component.html",
  styleUrls: ["./mapbox.component.css"]
})
export class MapboxComponent implements OnInit {

  map: mapboxgl.Map;
  style = "mapbox://styles/mapbox/streets-v11";
   lat: number = 0;
   lng: number= 0;

  constructor(private location: MapService) { }

  ngOnInit() {
    this.getLocation();
  }

  @Input() event: any;


  getLocation() {
    (mapboxgl as typeof mapboxgl).accessToken =
      environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: "map",
      style: this.style,
      zoom: 13,
      center: [this.location.location.lng, this.location.location.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        showUserLocation: true,
        trackUserLocation: true
      })
    );
  };
}

