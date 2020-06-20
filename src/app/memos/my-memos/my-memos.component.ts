import { Component, OnInit } from '@angular/core';
import { memoModel } from '../memo.model';

@Component({
  selector: 'app-my-memos',
  templateUrl: './my-memos.component.html',
  styleUrls: ['./my-memos.component.css']
})
export class MyMemosComponent implements OnInit {
  memos=[];
  constructor() { }

  ngOnInit(): void {
  }

}
