import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-memos-leader-message',
  templateUrl: './memos-leader-message.component.html',
  styleUrls: ['./memos-leader-message.component.css']
})
export class MemosLeaderMessageComponent implements OnInit {


  // those will be got from the component tags as attributs
  @Input('src') photo:string; 
  @Input('title') title:string;
  @Input('message') info:string;
  @Input('buttons') buttons=[];

  
  
  
  constructor() { 

  }

  ngOnInit(): void {
    console.log(this.photo);
  }

}
