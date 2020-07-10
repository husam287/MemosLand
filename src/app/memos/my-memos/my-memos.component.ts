import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { memoModel } from '../memo.model';
import { MemosServiceService } from '../memos-service.service';

@Component({
  selector: 'app-my-memos',
  templateUrl: './my-memos.component.html',
  styleUrls: ['./my-memos.component.css'],
  providers:[]
})
export class MyMemosComponent implements OnInit,OnDestroy {
  memos:memoModel[];
  subs1:Subscription;
  constructor(private memosService:MemosServiceService) { }

  ngOnInit(): void {


    //alwas refresh memossss
    this.subs1=this.memosService.refresher.subscribe(
      (data)=>{this.memos=data;}
    )
    this.memosService.getMemos();
  }
  ngOnDestroy(){
    this.subs1.unsubscribe();
  }

  newFirst(){
    this.memos.sort(
      (a,b)=>{
        let result=b.date.getTime()-a.date.getTime();
        return result;
      }
    )
  }
  oldFirst(){
    this.memos.sort(
      (a,b)=>{
        let result=a.date.getTime()-b.date.getTime();
        return result;
      }
    )
  }

 
}

