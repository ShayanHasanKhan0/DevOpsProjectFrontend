import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  msg: any = [];
  avail: boolean;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }
  onSubmitLogin(f: NgForm) {
    if (!f.valid) {
      this.msg = "Invalid Email or Password";
      this.avail = true;
      return;
    }
    this.authService.login(
      {
        "email": f.controls.email.value,
        "password": f.controls.p1.value,
      }
    ).subscribe(
      data => {
        localStorage.setItem('stripeCusID', data['stripeCusID']);
        if(data['userId']){
          window.localStorage.setItem('userId', data['userId']);
          this.router.navigate(['/d/quizmenu']);
        }
        else if(data['msg']){
          console.log(data['msg'])
          if(data['msg'] === 'Invalid email or Password') {
            this.msg = "Invalid Email or Password";
            this.avail = true;
          }
        }
        return
      },
      error => {
        this.msg = "An error occurred";
        this.avail = true;
      }
    )
  }

  onSubmitRegister(f: NgForm) {
    if (f.controls.p1.value != f.controls.p2.value) {
      this.msg = "Password doesn't match";
      this.avail = true;
      return;
    }
    if (!f.valid) {
      this.msg = "Invalid Form Fields";
      this.avail = true;
      return;
    }
    this.authService.register({
      "email": f.controls.email.value,
      "password": f.controls.p2.value,
    }).subscribe(
      data => {
        // console.log(data)
        // console.log("asdas")
        // return
        if(data['msg']){
          console.log(data['msg'])
        }
        else{
          // this.authService.msg = "successfully registered a user!";
          this.onSubmitLogin(f)
        }
      },
      error => {this.router.navigate(['/error']);}
    )
  }
}
