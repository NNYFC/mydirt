import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AbstractControl, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dustbin',
  templateUrl: './dustbin.component.html',
  styleUrls: ['./dustbin.component.css']
})
export class DustbinComponent implements OnInit {
  dustbinList:any=[];
  placeList:any=[];
  loaderShow: boolean = false;
  timeLeft: number = 15;
  interval: any;
  userEmail:any;
  userPassword:any;
  formShow: boolean = false;

  constructor(private router: Router,private dustbinServices: ApiService) { }

  ngOnInit(): void {
    this.userEmail= sessionStorage.getItem('emailvalue');
    this.userPassword= sessionStorage.getItem('passwordvalue');

    this.loaderShow = true;
    this.startTimer();

    this.dustbinServices.getAllDustbin(this.userEmail,this.userPassword).subscribe(
      (res) => {
        this.dustbinList = res;

        /* if(!Object.keys(res).length){
            console.log("No Data found");
        } */

        this.pauseTimer();
        this.loaderShow = false;
      }
    );

    this.dustbinServices.getAllPlace().subscribe(
          (res) => {
            this.placeList = res;
          }
    );


  }

  logout(): void {
           this.dustbinServices.logout();
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


  addDustbinForm = new FormGroup({
            dustbin_name: new FormControl('', [
              Validators.required,
              Validators.minLength(2),
              Validators.pattern('[a-zA-Z].*'),
            ]),
            idplace: new FormControl('', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(15),
              ])
  });


  get Dustbin_name(): FormControl {
              return this.addDustbinForm.get('dustbin_name') as FormControl;
       }

  get Idplace(): FormControl {
              return this.addDustbinForm.get('idplace') as FormControl;
       }


  get f(): { [key: string]: AbstractControl } {
              return this.addDustbinForm.controls;
       }

  dustbinSubmited(): void {
          this.loaderShow = true;
              this.startTimer();

              this.dustbinServices
                .addDustbin(this.userEmail,this.userPassword,[
                  this.addDustbinForm.value.dustbin_name,
                  this.addDustbinForm.value.idplace
                ])
                .subscribe(resp => {
                  this.formShow = false;
                  this.dustbinServices
                          .getAllDustbin(this.userEmail,this.userPassword)
                                .subscribe((res) => {
                                      this.dustbinList.push(res);
                                      this.pauseTimer();
                                      this.loaderShow = false;
                                    });
                });
      }



}
