import { Component, OnInit } from '@angular/core';
import { UsersManageService } from './shared/users-manage.service';
import { MemosServiceService } from './memos/memos-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MemosLand';
constructor(private userSys:UsersManageService,private memosService:MemosServiceService){}


  ngOnInit(){
    this.userSys.autoLogin();
  }
}
