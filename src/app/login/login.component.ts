import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loaderShow: boolean = false;
  timeLeft: number = 15;
  interval: any;
  response:any;
  userEmail: any;
  userPassword: any;

  constructor(private router: Router, private loginAuth: ApiService) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
      ]),
    });

    get Email(): FormControl {
      return this.loginForm.get('email') as FormControl;
    }

    get Password(): FormControl {
      return this.loginForm.get('password') as FormControl;
    }

    errorResponse: any;
    isAuthenticated: boolean = true;

  loginSubmited(): void {
      this.loaderShow = true;
      this.startTimer();
      this.loginAuth
        .loginUser(this.loginForm.value.email,this.loginForm.value.password)
        .subscribe((res) => {
                        this.errorResponse = res;
                        console.log('Error '+this.errorResponse);

                       var crud = btoa(this.loginForm.value.email + ':' + this.loginForm.value.password);
                       this.userEmail = this.loginForm.value.email;
                       sessionStorage.setItem('authvalue', crud);
                       sessionStorage.setItem('emailvalue', this.userEmail);
                       sessionStorage.setItem('passwordvalue', this.userPassword);

                       this.pauseTimer();
                       this.loaderShow = false;

                       this.router.navigate(['home']);

                      },error => {
                       if(error.status==0){
                                   this.response = "Please Check your Internet Connection !";
                       }
                       if(error.status==401){
                                   this.response = "Wrong Email or Password!";
                       }
                       if(error.status==200){
                                 var crud = btoa(this.loginForm.value.email + ':' + this.loginForm.value.password);
                                 this.userEmail = this.loginForm.value.email;
                                 this.userPassword = this.loginForm.value.password;
                                 sessionStorage.setItem('authvalue', crud);
                                 sessionStorage.setItem('emailvalue', this.userEmail);
                                 sessionStorage.setItem('passwordvalue', this.userPassword);

                                  this.pauseTimer();
                                  this.loaderShow = false;
                                  this.response = "Successfully Authenticated";

                                  this.router.navigate(['home']);
                       }
                       this.isAuthenticated = false;
                       this.pauseTimer();
                       this.loaderShow = false;
                    }

        );
    }

    startTimer() {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.timeLeft = 15;
          this.loaderShow = false;
          this.pauseTimer();
        }
      }, 1500);
    }

    pauseTimer() {
      clearInterval(this.interval);
    }

}
