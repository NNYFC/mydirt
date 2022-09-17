import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AbstractControl, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loaderShow: boolean = false;
  timeLeft: number = 15;
  interval: any;
  userEmail:any;
  userPassword:any;
  formShow: boolean = false;
  userType:any;
  profileInfo:any;
  userId:any;

  constructor(private router: Router,private profileServices: ApiService) { }

  ngOnInit(): void {
    this.userEmail= sessionStorage.getItem('emailvalue');
    this.userPassword= sessionStorage.getItem('passwordvalue');
    this.userType = sessionStorage.getItem('userTypevalue');
    this.loaderShow = true;
    this.startTimer();
    this.refreshData();
  }

  refreshData(): void{
      if(this.userType == 'admin'){
                this.profileServices.getUserInfoByEmail(this.userEmail,this.userPassword).subscribe(
                        (res) => {
                          this.profileInfo = res;
                          this.pauseTimer();
                          this.loaderShow = false;
                        }
                );
              }else{
                this.profileServices.loginUser(this.userEmail,this.userPassword).subscribe(
                          (res) => {
                            console.log(res);
                            this.profileInfo = res;
                            this.pauseTimer();
                            this.loaderShow = false;
                          }
                        );
           }
    }

  logout(): void {
          this.profileServices.logout();
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
