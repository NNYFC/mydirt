import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AbstractControl, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userType:any;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.userType = sessionStorage.getItem('userTypevalue');
  }

  logout(): void {
      this.apiService.logout();
  }

}
