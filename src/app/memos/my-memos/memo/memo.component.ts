import { Component, OnInit, Input } from '@angular/core';
import { memoModel } from '../../memo.model';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.css']
})
export class MemoComponent implements OnInit {
@Input() memo:memoModel;



  constructor() { }

  ngOnInit(): void {
  }

}
