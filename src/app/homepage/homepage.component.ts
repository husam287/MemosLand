import { Component, OnInit } from '@angular/core';
import { UsersManageService } from '../shared/users-manage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
isAuth=false;
userName=null;
  constructor(private userSys:UsersManageService) { }

  ngOnInit(): void {
    this.userSys.currentUser
    .subscribe(user=>{
      this.isAuth=!!user;
      if(!!user)
      this.userName=user.displayName;
    })
  }

}
