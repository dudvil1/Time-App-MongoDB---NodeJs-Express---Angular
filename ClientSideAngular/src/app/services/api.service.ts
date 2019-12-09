import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpParams
} from "@angular/common/http";
import { Observable, from } from "rxjs";
import { MapService } from "./map.service";
import {UserTimesService} from "./user-times.service"


@Injectable()
export class ApiService {
  formData: any = {};
  logInModel:any = {};

  constructor(private httpClient: HttpClient,
              private map: MapService,
              public userService: UserTimesService) {}

  login() {
    console.log("model:",this.logInModel);
    return this.httpClient.post("http://127.0.0.1:3000/user/login", this.logInModel);
  }

  signup() {
    return this.httpClient.post(
      "http://127.0.0.1:3000/user/signup",
      this.formData
    );
  }

  activeUser(params) {
    return this.httpClient.patch(
      "http://127.0.0.1:3000/user/activate-user",
      params
    );
  }

  forgotPassword() {
    return this.httpClient.patch(
      "http://127.0.0.1:3000/user/Forgot-Password",
      this.logInModel
    );
  }

  startShift(time, note) {
    let params: any = {};
    params.location = {
      lat: this.map.location.lat,
      lng: this.map.location.lng
    };
    params.time = time;
    params.user = this.formData;
    if (note) params.note = note;
    return this.httpClient.patch(
      "http://127.0.0.1:3000/times/startShift",
      params
    );
  }

  ExitShift(time, note) {
    let params: any = {};
    params.time = time;
    params.user = this.formData;
    if (note) params.note = note;
    return this.httpClient.patch(
      "http://127.0.0.1:3000/times/ExitShift",
      params
    );
  }

  GetAllMyShifts(month) {
    let localres:any = {};
    return this.httpClient.get("http://127.0.0.1:3000/times/getMyShifts", {
      params: { user: `${this.formData._id}`, time: `${month.Value}/${new Date().getFullYear()}`}
    })
    .toPromise()
    .then(res => {
      localres = res;
      this.userService.Timelist = localres.shifts as any[];
      console.log(this.userService.Timelist);
    });
  }
}
