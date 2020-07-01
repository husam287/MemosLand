import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersManageService } from '../../shared/users-manage.service'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
isauth=false;
errorMessage:string=null;
isLoading=false;
  constructor(private usersys:UsersManageService,private router:Router) { }

  ngOnInit(): void {
    this.usersys.currentUser.subscribe(user=>{this.isauth=!!user})
  }
  

  onSubmit(form:NgForm){
    this.isLoading=true;
    this.usersys.signup(form.value.email,form.value.password,form.value.name).subscribe(
      ()=>{
        this.isauth=true;
        this.isLoading=false;
        this.router.navigate(['/memos'])
      },
      (error)=>{
        this.isLoading=false;
        this.errorMessage=error
      }
    );
  }

}
