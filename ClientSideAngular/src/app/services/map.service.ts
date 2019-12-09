import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class MapService {
  constructor() {
    this.getLocation();
  }
  /* lat: number = 0;
  lng: number = 0; */
  location:any =  { lat: 0 , lng: 0 } ;

  public getLocation() {
    navigator.geolocation.getCurrentPosition(ourLocation => {
      this.location.lat = ourLocation.coords.latitude;
      this.location.lng = ourLocation.coords.longitude;
      console.log (this.location.lat , this.location.lng);
    });
  }

  public changeLocation(location:any){
    console.log("mapService ChangeLocation",location);
    this.location.lat = 48.867374;
    this.location.lng = 2.784018;
  }
}
