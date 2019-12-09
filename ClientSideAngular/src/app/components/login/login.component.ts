import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public logInModel: any = {};
  response: any;
  constructor(
    public _Service: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.verifyAccountIfNaccery();
  }

  login() {
    console.log("login.component.ts: sign() called");
    this._Service.login().subscribe(
      data => {
        console.log("Successfull", data);
        this.response = data;
        console.log("Response: ", this.response.message);
        //check the response message
        if (this.response.message === "Auth successful") {
          console.log("login.component.ts: data: ", data);
          this._Service.formData = data["user"];
          console.log("token:", this._Service.formData.token);
          this.toastr.success(data["message"], "Success");
          localStorage.setItem("user", data["user_type"]);
          localStorage.setItem("token", data["token"]);
          if (data["user_type"] === "admin") {
            this.router.navigate(["/adminTimes"]);
          } else {
            this.router.navigate(["/userTimes"]);
          }
        }
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }

  verifyAccountIfNaccery() {
    if (this.route.snapshot.routeConfig.path === "login/:id") {
      this.route.params.subscribe(params =>
        this._Service.activeUser(params).subscribe(
          res => {
            console.log(res);
            if (res["message"] === "Your Account Is Active Now") {
              this.toastr.success(
                "Success to active Your User\n you can login now"
              );
              this._Service.formData = res["user"];
            }
          },
          err => {
            this.toastr.error(err.error.message, "Problems!!!");
          }
        )
      );
    }
  }

  onforgotPassword() {
    console.log("forgot password call");
    if (!this._Service.logInModel.email) alert("Put Your Email First");
    else {
      this._Service.forgotPassword().subscribe(
        res => {
          console.log(res);
          this.toastr.success("Succsess , Please Check Your Email");
        },
        err => {
          console.log(err);
          this.toastr.error("Problems");
        }
      );
    }
  }
}
