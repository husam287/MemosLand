import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsersManageService } from '../shared/users-manage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
isAuth=false;
userName=null;
@ViewChild('target') target:ElementRef
  constructor(private userSys:UsersManageService,private router:Router) { }

  ngOnInit(): void {
    this.userSys.currentUser
    .subscribe(user=>{
      this.isAuth=!!user;
      if(!!user)
      this.userName=user.displayName;
    })
  }

  onGetStarted(){
    if(this.isAuth)
    this.router.navigate(['/memos'])
    else
    this.target.nativeElement.scrollIntoView({block:'start',behavior:'smooth'});


  }
}
