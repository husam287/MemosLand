import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-memo',
  templateUrl: './add-memo.component.html',
  styleUrls: ['./add-memo.component.css']
})
export class AddMemoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(memoForm:NgForm){
    console.log(memoForm);
  }
}
