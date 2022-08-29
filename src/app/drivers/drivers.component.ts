import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
  driversInfo:Array<any> = [];
  userEmail: any;
  userPassword: any;
  loaderShow: boolean = false;
  timeLeft: number = 25;
  interval: any;
  formShow: boolean = false;

  constructor(private router: Router,private driverServices: ApiService) { }

  ngOnInit(): void {
    this.loaderShow = true;
        this.startTimer();

        this.userEmail= sessionStorage.getItem('emailvalue');
        this.userPassword= sessionStorage.getItem('passwordvalue');

        this.driverServices
          .getAllDrivers(this.userEmail,this.userPassword)
          .subscribe((response) => {
          console.log(response);
            this.driversInfo.push(response);
            this.loaderShow = false;
            this.pauseTimer();
          });
  }

  openForm(){
    if(this.formShow == false){
      this.formShow = true;
    }else{
      this.formShow = false;
    }

    console.log(this.formShow);
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

  logout(): void {
         sessionStorage.setItem('isLoggedIn', 'false');
         sessionStorage.clear();
         this.router.navigate(['login']);
       }
}
