import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { memoModel } from 'src/app/memos/memo.model';
import { NgForm } from '@angular/forms';
import { AngularFireUploadTask, AngularFireStorageReference, AngularFireStorage } from 'angularfire2/storage';
import { MemosServiceService } from 'src/app/memos/memos-service.service';
import { finalize } from 'rxjs/operators';

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
  task: AngularFireUploadTask; // main task of upload 
  url: Observable <String | null>; //download link 
  snapshot:Observable <any>; //snapshot of the byte and upload
  precentage:Observable<number | null>; //used to view when the download complete
  photoRef:AngularFireStorageReference;
  //_________________________________________________
  

  selectedImg=null;  //for the selected image
  dataSubject=new Subject<string>(); //to get url after finish upload and use it at (onsubmit)
  snapshotSubscription:Subscription; //to cancel subscription of upload process
  fileInputClicked=false; //flag to refers file input clicked
  subs1:Subscription;

  //initialize form
  defTitle="";
  defDate="";
  defInfo="";
  oldUrl="";
  oldId="";
  
  

  constructor(private storage:AngularFireStorage ,private memos:MemosServiceService) { 
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
    if(this.selectedImg){

      this.startUpload(this.selectedImg);
    //subscripe as thisto wait the url to change
   this.subs1 =this.dataSubject.subscribe(
      (url)=>{ //url is the url that will sent after upload complete 

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
              if(!this.selectedImg){
               //______________RESETING_________________
              this.snapshotSubscription.unsubscribe();
              }
              this.url=null; //reset the url
              this.precentage=null; //reset precentage
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
          //______________RESETING_________________
          if(!this.selectedImg){
          this.snapshotSubscription.unsubscribe();
          }
          this.url=null; //reset the url
          this.precentage=null; //reset precentage
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










  //####################### Upload section #########################


  
  startUpload(event:FileList){

    const file=event[0];
    //_______________Upload Process___________________

    const path =`memos/${new Date().getTime()}_${file.name}`; //the path in firebase cloud
    const ref=this.storage.ref(path);
    this.photoRef=this.storage.ref(path);
      this.task=this.storage.upload(path,file); //Upload the image
      this.precentage=this.task.percentageChanges();
      
      this.snapshotSubscription=this.task.snapshotChanges().pipe(
        finalize(async ()=>{
          this.url= await ref.getDownloadURL().toPromise(); //here will wait untill get the url
          this.dataSubject
          .next(await ref.getDownloadURL().toPromise()); //sent url to this subject to subscribe in (onSubmit)
        })
      ).subscribe()
    }

}
