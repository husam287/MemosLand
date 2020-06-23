import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { finalize,tap } from 'rxjs/operators';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-add-memo',
  templateUrl: './add-memo.component.html',
  styleUrls: ['./add-memo.component.css']
})
export class AddMemoComponent implements OnInit {

  //________________Upload data _____________________
  task: AngularFireUploadTask; // main task of upload 
  url: Observable <String | null>; //download link 
  snapshot:Observable <any>;
  precentage:Observable<number | null>;
  //_________________________________________________


  selectedImg=null;  //for select image

  constructor(private storage:AngularFireStorage) { }


  ngOnInit(): void {
  }

  onSubmit(memoForm:NgForm){
    this.startUpload(this.selectedImg);
    
  }

  onChange(event:FileList){
    this.selectedImg=event;
  
  }




  //############### Upload section ###############

  startUpload(event:FileList){
    const file=event[0];
    if(file.type.split('/')[0]!=='image'){
      console.error('unsupported file type');
      return
    }

    const path =`memos/${new Date().getTime()}_${file.name}`;
    const ref=this.storage.ref(path);
    this.task=this.storage.upload(path,file);
    this.precentage=this.task.percentageChanges();
    
    this.task.snapshotChanges().pipe(
      finalize(async ()=>{
        this.url= await ref.getDownloadURL().toPromise();
      })
    ).subscribe()
   
  }



}
