import { Component, OnInit, Input } from '@angular/core';
import { memoModel } from '../../memo.model';
import{ MemosServiceService } from '../../memos-service.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.css']
})
export class MemoComponent implements OnInit {
@Input('memo') memo:memoModel;
@Input('id') id:number;
editObservable=new Subject<boolean>();

edit=false;

  constructor(private memosService:MemosServiceService) { }

  ngOnInit(): void {
    this.editObservable.subscribe(
      (data)=>{this.edit=data}
    )
  }
  onEdit(){
    this.editObservable.next(!this.edit);
    
  }
  onRemove(){
    let r:boolean=confirm('Are you sure you want to REMOVE this memo');
    if (r){
      this.memosService.removeMemo(this.memo);
    }
    
  }

}
