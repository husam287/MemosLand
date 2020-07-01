import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UsersManageService } from '../shared/users-manage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('clickTheButton',{static:false}) clickTheButton:ElementRef;
  x=window.matchMedia('(max-width:767px)'); //x from 0 to 767px
  isAuth=false;
  constructor(private userSys:UsersManageService) { }

  ngOnInit(): void {
    this.userSys.currentUser.subscribe(user=>{this.isAuth=!!user});
  }

  onLogout(){
    this.userSys.logout();
  }
  close(){
    if(this.x.matches){
      this.clickTheButton.nativeElement.click();
    }
  }
}
