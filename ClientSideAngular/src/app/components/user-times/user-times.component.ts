import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-times',
  templateUrl: './user-times.component.html',
  styleUrls: ['./user-times.component.css']
})
export class UserTimesComponent implements OnInit {


  constructor(
    private _Service: ApiService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
  }

  public location:any ={};
  onClickchangeLocation(location:any){
      console.log("ParentCompo",location);
      this.location = location;
      console.log("ParentCompoLocal",this.location);
  }
}
