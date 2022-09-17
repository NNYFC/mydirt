import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AbstractControl, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notificationList:any=[];
  drivernotificationList:any=[];
  driverList:any=[];
  dustbinList:any=[];
  selectedNotification:any=[];
  imageList:any=[];
  loaderShow: boolean = false;
  timeLeft: number = 15;
  interval: any;
  userEmail:any;
  userPassword:any;
  formShow: boolean = false;
  detailsShow: boolean = false;
  userType:any;
  userId:any;

  constructor(private router: Router,private notificationServices: ApiService) { }

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
              this.notificationServices.getAllNotification(this.userEmail,this.userPassword).subscribe(
                      (res) => {
                        this.notificationList = res;
                        this.pauseTimer();
                        this.loaderShow = false;
                      }
              );

              this.notificationServices.getAllDrivers(this.userEmail,this.userPassword).subscribe(
                                    (res) => {
                                      this.driverList = res;
                                    }
               );
              this.notificationServices.getAllDustbin(this.userEmail,this.userPassword).subscribe(
                                                  (res) => {
                                                    this.dustbinList = res;
                                      }
              );
            }else{
              this.userId = sessionStorage.getItem('userId');
              this.notificationServices.getAllDustbinOfDriver(this.userEmail,this.userPassword,this.userId).subscribe(
                        (res) => {
                          console.log(res);
                          this.drivernotificationList = res;
                          this.pauseTimer();
                          this.loaderShow = false;
                        }
                      );
         }
  }

  getMsgDetails(item:any): void{
    this.loaderShow = true;
    this.startTimer();
    this.selectedNotification = item;
    this.notificationServices.getPictureById(this.userEmail,this.userPassword,this.selectedNotification.idnotification)
                             .subscribe((res) => {
                              console.log(res);
                              this.imageList = res;
                              this.pauseTimer();
                              this.loaderShow = false;
                              this.detailsShow = true;
                            }
     );

  }

  closeDetail():void{
    this.detailsShow = false;
  }

  logout(): void {
        this.notificationServices.logout();
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

  openForm(){
        if(this.formShow == false){
          this.formShow = true;
        }else{
          this.formShow = false;
        }
  }

  asignDriverForm = new FormGroup({
                iddriver: new FormControl('', [
                  Validators.required,
                  Validators.minLength(2),
                  Validators.pattern('[a-zA-Z].*'),
                ]),
                iddustbin: new FormControl('', [
                  Validators.required,
                  Validators.minLength(2),
                  Validators.pattern('[a-zA-Z].*'),
                ])
     });

     get Iddriver(): FormControl {
                  return this.asignDriverForm.get('iddriver') as FormControl;
           }

     get Iddustbin(): FormControl {
                  return this.asignDriverForm.get('iddustbin') as FormControl;
           }

      get f(): { [key: string]: AbstractControl } {
                    return this.asignDriverForm.controls;
             }

  asignSubmited():void{
      this.loaderShow = true;
      this.startTimer();
      this.notificationServices
          .aSignDustbinToDriver(this.userEmail,this.userPassword,[
                  this.asignDriverForm.value.iddustbin,this.asignDriverForm.value.iddriver
               ]).subscribe(resp => {
                      this.loaderShow = false;
                      this.formShow = false;
                      this.pauseTimer();

                });
  }



}
