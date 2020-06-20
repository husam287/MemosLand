import { Component, OnInit } from '@angular/core';
import { memoModel } from '../memo.model';
import { MemosServiceService } from '../memos-service.service';

@Component({
  selector: 'app-my-memos',
  templateUrl: './my-memos.component.html',
  styleUrls: ['./my-memos.component.css'],
  providers:[MemosServiceService]
})
export class MyMemosComponent implements OnInit {
  memos=[];
  constructor(private memosService:MemosServiceService) { }

  ngOnInit(): void {
    this.memos=this.memosService.getMemos();
  }

}
