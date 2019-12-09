import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: 'app-admin-times',
  templateUrl: './admin-times.component.html',
  styleUrls: ['./admin-times.component.css']
})
export class AdminTimesComponent implements OnInit {

  constructor(public _Service: ApiService) { }

  ngOnInit() {
  }

}
