import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { memoModel } from 'src/app/memos/memo.model';
import { NgForm } from '@angular/forms';
import { MemosServiceService } from 'src/app/memos/memos-service.service';
import { UploadService } from 'src/app/shared/upload.service';

@Component({
  selector: 'app-memo-edit',
  templateUrl: './memo-edit.component.html',
  styleUrls: ['./memo-edit.component.css']
})

export class MemoEditComponent implements OnInit {

  @ViewChild('memoForm') memoForm:NgForm; //The form reference
  @ViewChild('fileInput',{static:true}) fileInput:ElementRef; //file input reference
  @Input('closeEdit') closeEdit:Subject<boolean>;
  @Input('memo') memo:memoModel;
  @Input('edit') edit:boolean;

  //________________Upload data _____________________
  url:string=null; //download link 
  loading=false; //used to view when the download complete
  //________________________________________________
  

  selectedImg=null;  //for the selected image
  fileInputClicked=false; //flag to refers file input clicked
  subs1:Subscription;

  //initialize form
  defTitle="";
  defDate="";
  defInfo="";
  oldUrl="";
  oldId="";
  
  

  constructor(private uploadService:UploadService ,private memos:MemosServiceService) { 
  }
  
  
  ngOnInit(): void {
    this.defDate=this.memo.date.toISOString().split('T')[0];
    this.defTitle=this.memo.title;
    this.defInfo=this.memo.info;
    this.oldId=this.memo.id; 
    this.oldUrl=this.memo.url;
  }
 

  onCancel(){

    this.closeEdit.next(false)
    
  }

  onSubmit(){
    this.loading=true;
    if(this.selectedImg){
      this.uploadService.startUpload(this.selectedImg).subscribe();
    //subscripe as thisto wait the url to change
   this.subs1 =this.uploadService.urlSender.subscribe(
      (url)=>{ //url is the url that will sent after upload complete 
        this.url=url;
        //sending to formdataedited contained the form data and edit it
        let formDataEdited=new memoModel(
          this.memoForm.value.title,
          this.memoForm.value.info,
          url,
          this.memoForm.value.date,
          this.oldId); //transleted string to date
          //adding the edited data
          let subs:Subscription =this.memos.updateMemo(formDataEdited,this.selectedImg,this.oldUrl).subscribe(
            ()=>{
              this.memos.onFetching();
              this.url=null; //reset the url
              this.loading=false;
              this.fileInputClicked=false;
              this.onCancel();
              this.subs1.unsubscribe();
              subs.unsubscribe();
              
             }
            
          );



    })
  }
  //____________dont want to change photo______________________
  else{
    //sending to formdataedited contained the form data and edit it
    let formDataEdited=new memoModel(
      this.memoForm.value.title,
      this.memoForm.value.info,
      this.oldUrl,
      this.memoForm.value.date,
      this.oldId
      ); //transleted string to date
      //adding the edited data
      let subs:Subscription =this.memos.updateMemo(formDataEdited,this.selectedImg,this.oldUrl).subscribe(
        ()=>{
          this.memos.onFetching();
          this.loading=false;
          //______________RESETING_________________
          this.fileInputClicked=false;
          this.onCancel();
          subs.unsubscribe();
          
         }
        
      );
    

  }
    
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
