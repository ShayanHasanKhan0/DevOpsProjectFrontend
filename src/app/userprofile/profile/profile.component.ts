import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ForgetpasswordService } from 'src/services/forgetpassword.service';
import { UserprofileService } from 'src/services/userprofile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {

  // messages for forgot password
  msg:string;
  avail:boolean;
  prompt:string;

  // messages for user profile
  msg1:string;
  prompt1:string;
  avail1:boolean;

  userProfile={
    email: "",
    // fname: "",
    // lname: "",
    // homeAddress: "",
    // city: "",
    // country: "",
    // postalcode: "",
  };

  constructor(private userprofileservice: UserprofileService, private forgotpassService: ForgetpasswordService) { }

  ngOnInit(): void {
    this.getUserProfile()
  }

  loading:boolean=true;

  ngAfterViewInit():void {
    setTimeout(() => {
      this.loading=false;
    }, 0);
  }

  getUserProfile(){
    this.userprofileservice.getUserProfile().subscribe((userprofile)=>{
      this.userProfile = userprofile;
    });
  }

  onSubmitChanges(){
    // console.log(f.controls.email.value)
    this.userprofileservice.submitChanges(this.userProfile).subscribe((msg)=>{
      this.getUserProfile();
      this.prompt1 = "Changes submitted successfully";
      this.avail1 = false;
    },(err)=>{
      // messages for forgot password
      this.msg1 = "An error occurred while submitting changes";
      this.avail1 = true;
    });

  }

  onChange(){
    this.prompt1 = null
  }

  // Passsword reset
  passwordReset(a: NgForm) {
    if (!a.valid) {
      this.msg = "Invalid form data!!";
      this.avail = true;
      return;
    }

    if (a.controls.p1.value != a.controls.p2.value) {
      this.msg = "Passwords dont match";
      this.avail = true;
      return;
    }
    
    (document.getElementById('subbutton') as HTMLButtonElement).disabled = true;

    setTimeout(function() {
      (document.getElementById('subbutton') as HTMLButtonElement).disabled = false;
    }, 10000)

    this.forgotpassService.savePasswordProfile({password:a.controls.p1.value},localStorage.getItem('userId')).subscribe( response =>{
      if(response.message === "password reset successfully.") {
        this.prompt = "password reset successfully!";
        this.avail = false;
      } else {
        this.prompt = "coudnt reset password due to an unknown error.";
        this.avail = false;
      }
    })
  }
}
