import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('clickTheButton',{static:false}) clickTheButton:ElementRef;
  x=window.matchMedia('(max-width:767px)'); //x from 0 to 767px
  constructor() { }

  ngOnInit(): void {
  }

  close(){
    if(this.x.matches){
      this.clickTheButton.nativeElement.click();
    }
  }
}
