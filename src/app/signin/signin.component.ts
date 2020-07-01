import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsersManageService } from '../shared/users-manage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
isLoading=false;
errorMessage:string=null;
  constructor(private route:Router,private userSys:UsersManageService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    this.isLoading=true;
    this.userSys.login(form.value.email,form.value.password).subscribe(
      ()=>{
        this.isLoading=false;
        this.route.navigate(['/home'])
      },
      (error)=>{
        this.isLoading=false;
        this.errorMessage=error;
      }
    );
  }

  
}
