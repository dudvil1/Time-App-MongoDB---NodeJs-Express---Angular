import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-start-exit",
  templateUrl: "./start-exit.component.html",
  styleUrls: ["./start-exit.component.css"]
})
export class StartExitComponent implements OnInit {
  myDate = new Date();
  note:any = "";
  constructor(public _Service: ApiService, private toastr: ToastrService) {}

  ngOnInit() {}

  onSubmitStartShift() {
    this._Service.startShift(new Date(),this.note).subscribe(
      (res:any) => {
        console.log(res);
        this.toastr.success( res.message);
      },
      err => {
        this.toastr.error(err.error.message);
      }
    );
  }

  onSubmitExitShift() {
    this._Service.ExitShift(new Date(),this.note).subscribe(
      res => {
        console.log(res);
        this.toastr.success("See you");
      },
      err => {
        this.toastr.error(err.error.message, "Problems!!!");
      }
    );
  }
}
