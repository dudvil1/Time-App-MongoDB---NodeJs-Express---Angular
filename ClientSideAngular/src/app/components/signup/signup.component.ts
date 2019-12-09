import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public model:any = {}

  constructor(
    public _Service:ApiService,
    private toastr: ToastrService,
    private router:Router
  ) { }

  ngOnInit() {
    console.log(this._Service.formData);
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
    this._Service.formData = {
      name : '',
      email: '',
      password: ''
    };
  }


  signup() {
    this._Service.signup().subscribe(
      data => {
        console.log("data: ", data);
        this.toastr.success(data["message"], "Success")

      },
      error => {
        this.toastr.error(error.error.message, "Error in signup.component.ts");
      }
    )
  }
}
