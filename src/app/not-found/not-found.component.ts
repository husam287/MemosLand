import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
data:string;
  constructor(private activeRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRouter.data.subscribe(
      (data:Data)=>{
        this.data=data['message'];
      }
    );

  }

}
