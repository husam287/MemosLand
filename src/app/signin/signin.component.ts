import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
route:Router;
  constructor() { }

  ngOnInit(): void {
  }

  //to go to memos after sign in
  goToMemos(){
    
  }

}
