import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dustbin',
  templateUrl: './dustbin.component.html',
  styleUrls: ['./dustbin.component.css']
})
export class DustbinComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
         sessionStorage.setItem('isLoggedIn', 'false');
         sessionStorage.clear();
         this.router.navigate(['login']);
       }
}
