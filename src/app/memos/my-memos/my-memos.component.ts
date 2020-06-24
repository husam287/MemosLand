import { Component, OnInit, OnDestroy } from '@angular/core';
import { memoModel } from '../memo.model';
import { MemosServiceService } from '../memos-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-memos',
  templateUrl: './my-memos.component.html',
  styleUrls: ['./my-memos.component.css'],
  providers:[]
})
export class MyMemosComponent implements OnInit,OnDestroy {
  memos:memoModel[];
  constructor(private memosService:MemosServiceService) { }

  ngOnInit(): void {

    //alwas refresh memossss
    this.onFetching();
  }
  ngOnDestroy(){
  }


  private onFetching(){
    this.memosService.downloadAllMemos()
    .subscribe(
      (data)=>{this.memos=data;console.log(data[0])}
    )

    }
}

