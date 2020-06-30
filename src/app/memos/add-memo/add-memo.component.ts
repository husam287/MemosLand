import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Subject, Subscription } from 'rxjs';
import { MemosServiceService } from '../memos-service.service';
import { memoModel } from '../memo.model';
import { UploadService } from '../../shared/upload.service'

@Component({
  selector: 'app-add-memo',
  templateUrl: './add-memo.component.html',
  styleUrls: ['./add-memo.component.css']
})
export class AddMemoComponent implements OnInit {
  @ViewChild('memoForm') memoForm:NgForm; //The form reference
  @ViewChild('fileInput') fileInput:ElementRef; //file input reference

  //________________Upload data _____________________
  url:string=null; //download link 
  loading=false; //used to view when the download complete
  //_________________________________________________
  

  selectedImg=null;  //for the selected image
  submitedOnceAtLeast=false; //this flag chose give true the form submit one time
  fileInputClicked=false; //flag to refers file input clicked

  
  constructor(private uploadService:UploadService ,private memos:MemosServiceService) { }


  ngOnInit(): void {

    
  }
  
  

  onSubmit(){
    //will start the upload 
    this.loading=true;
    let upSubs:Subscription= this.uploadService.startUpload(this.selectedImg)
    .subscribe();
    
    //subscripe as thisto wait the url to change
    let subs:Subscription=this.uploadService.urlSender.subscribe(
      (url)=>{ //url is the url that will sent after upload complete 
          this.url=url;
        //sending to formdataedited contained the form data and edit it
        let formDataEdited=new memoModel(
          this.memoForm.value.title,
          this.memoForm.value.info,
          url,
          this.memoForm.value.date,
          ); //transleted string to date
          //adding the edited data
          let subs1:Subscription =this.memos.addMemo(formDataEdited).subscribe(
            ()=>{
              //______________RESETING_________________
             this.submitedOnceAtLeast=true;
             this.memoForm.resetForm();
             this.fileInput.nativeElement.value='';
             this.selectedImg=null;
             this.fileInputClicked=false;
             this.url=null;
             this.loading=false;
             subs1.unsubscribe();
             subs.unsubscribe();
             upSubs.unsubscribe();
            }
          );
          

          
        })
        
  }
    
  
  
  
  onChange(event:FileList){
    
    //________REJECTION UNSUPPORTED FORMATES_________
    if(event[0].type.split('/')[0]!=='image'){
      alert('WRONG FILE FORMAT')
      this.fileInput.nativeElement.value='';
    }
    //________________________________________________

    //Correct data
    else{
      this.selectedImg=event;
    }
  }

 
  
}
