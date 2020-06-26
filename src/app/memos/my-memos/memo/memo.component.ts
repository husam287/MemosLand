import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { memoModel } from '../../memo.model';
import{ MemosServiceService } from '../../memos-service.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.css']
})
export class MemoComponent implements OnInit,OnDestroy {
@Input('memo') memo:memoModel;
@Input('id') id:number;
editObservable=new Subject<boolean>();
edit=false;
@ViewChild('target') target:ElementRef;
@ViewChild('memoSource') memoSource:ElementRef;


subs:Subscription;
  constructor(private memosService:MemosServiceService) { }

  ngOnInit(): void {
    this.subs=this.editObservable.subscribe(
      (data)=>{
        this.edit=data;
        if(this.edit)
        this.target.nativeElement.scrollIntoView({block:'start',behavior:'smooth'});
        else
        this.memoSource.nativeElement.scrollIntoView({block:'center',behavior:'smooth'});
      })
      
  }
  ngOnDestroy(){
    this.subs.unsubscribe();
  }
  onEdit(){
    this.editObservable.next(!this.edit);
    
  
    
    
  }
  onRemove(){
    let r:boolean=confirm('Are you sure you want to REMOVE this memo');
    if (r){
       this.subs= this.memosService.removeMemo(this.memo).subscribe(
        ()=>{
          this.memosService.onFetching();

        });
    }
    
  }

}
