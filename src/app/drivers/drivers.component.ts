import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AbstractControl, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
  driversInfo:any = [];
  userInfo:any=[];
  userEmail: any;
  userPassword: any;
  loaderShow: boolean = false;
  timeLeft: number = 25;
  interval: any;
  formShow: boolean = false;
  userType:any;

  constructor(private router: Router,private driverServices: ApiService) { }

  ngOnInit(): void {
    this.loaderShow = true;
        this.startTimer();

        this.userEmail= sessionStorage.getItem('emailvalue');
        this.userPassword= sessionStorage.getItem('passwordvalue');
        this.userType = sessionStorage.getItem('userTypevalue');

        this.driverServices
          .getAllDrivers(this.userEmail,this.userPassword)
          .subscribe((response) => {
            this.driversInfo = response;
            this.loaderShow = false;
            this.pauseTimer();
          });

        this.driverServices
                  .getUserInfoByEmail(this.userEmail,this.userPassword)
                  .subscribe((response) => {
                    this.userInfo = response;
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
           this.driverServices.logout();
    }

  addUserForm = new FormGroup({
          sex: new FormControl('', [Validators.required]),
          last_name: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern('[a-zA-Z].*'),
          ]),
          first_name: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern('[a-zA-Z].*'),
          ]),
          email: new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl('', [
              Validators.required,
              Validators.minLength(4),
              Validators.maxLength(15),
            ]),
          telephone: new FormControl(''),
      });

  get Sex(): FormControl {
            return this.addUserForm.get('sex') as FormControl;
     }

  get Lastname(): FormControl {
            return this.addUserForm.get('last_name') as FormControl;
     }

  get Firstname(): FormControl {
            return this.addUserForm.get('first_name') as FormControl;
     }

  get Password(): FormControl {
            return this.addUserForm.get('password') as FormControl;
     }

  get Email(): FormControl {
            return this.addUserForm.get('email') as FormControl;
     }

  get Telephone(): FormControl {
            return this.addUserForm.get('telephone') as FormControl;
     }

  get f(): { [key: string]: AbstractControl } {
            return this.addUserForm.controls;
     }

    userSubmited(): void {
        this.loaderShow = true;
            this.startTimer();

            this.driverServices
              .addDriver(this.userEmail,this.userPassword,[
                this.addUserForm.value.first_name,
                this.addUserForm.value.last_name,
                this.addUserForm.value.telephone,
                this.addUserForm.value.email,
                this.addUserForm.value.password,
                'ACTIF',
               this.userInfo.idadmin
              ])
              .subscribe(resp => {
                this.formShow = false;
                this.driverServices
                        .getAllDrivers(this.userEmail,this.userPassword)
                              .subscribe((res) => {
                                    this.driversInfo = res;
                                    this.pauseTimer();
                                    this.loaderShow = false;
                                  });
              });
  }

  changeState(id:any){
    this.loaderShow = true;
    this.startTimer();
    this.driverServices
              .changeDriverState(this.userEmail,this.userPassword,id)
              .subscribe((response) => {
                this.driverServices
                           .getAllDrivers(this.userEmail,this.userPassword)
                           .subscribe((res) => {
                                         this.driversInfo = res;
                                         this.pauseTimer();
                                         this.loaderShow = false;
                                     });
              });
  }


}
