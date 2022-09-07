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
  imageList:any=[];
  loaderShow: boolean = false;
  timeLeft: number = 15;
  interval: any;
  userEmail:any;
  userPassword:any;
  formShow: boolean = false;

  constructor(private router: Router,private notificationServices: ApiService) { }

  ngOnInit(): void {
    this.userEmail= sessionStorage.getItem('emailvalue');
        this.userPassword= sessionStorage.getItem('passwordvalue');
        this.loaderShow = true;
        this.startTimer();
        this.notificationServices.getAllNotification(this.userEmail,this.userPassword).subscribe(
          (res) => {
            console.log(res);
            this.notificationList = res;
            this.pauseTimer();
            this.loaderShow = false;
          }
        );
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

        console.log(this.formShow);
      }


      addUserForm = new FormGroup({
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

                this.notificationServices
                  .addDriver(this.userEmail,this.userPassword,[
                    this.addUserForm.value.first_name,
                    this.addUserForm.value.last_name,
                    this.addUserForm.value.telephone,
                    this.addUserForm.value.email,
                    this.addUserForm.value.password,
                    'ACTIF',
                    1
                  ])
                  .subscribe(resp => {
                    this.formShow = false;
                    this.notificationServices
                            .getAllDrivers(this.userEmail,this.userPassword)
                                  .subscribe((res) => {
                                        this.notificationList.push(res);
                                        this.pauseTimer();
                                        this.loaderShow = false;
                                      });
                  });
        }



}
