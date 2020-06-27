import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subject, Subscription, Subscribable } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';
import { finalize} from 'rxjs/operators';
import { MemosServiceService } from '../memos-service.service';
import { memoModel } from '../memo.model';


@Component({
  selector: 'app-add-memo',
  templateUrl: './add-memo.component.html',
  styleUrls: ['./add-memo.component.css']
})
export class AddMemoComponent implements OnInit {
  @ViewChild('memoForm') memoForm:NgForm; //The form reference
  @ViewChild('fileInput') fileInput:ElementRef; //file input reference

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
  submitedOnceAtLeast=false; //this flag chose give true the form submit one time
  fileInputClicked=false; //flag to refers file input clicked

  constructor(private storage:AngularFireStorage ,private memos:MemosServiceService) { }


  ngOnInit(): void {
    
  }



  onSubmit(){
    //will start the upload 
    this.startUpload(this.selectedImg);
    
    //subscripe as thisto wait the url to change
   let subs:Subscription= this.dataSubject.subscribe(
      (url)=>{ //url is the url that will sent after upload complete 

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
             this.snapshotSubscription.unsubscribe();
             this.url=null; //reset the url
             this.precentage=null; //reset precentage
             this.memoForm.resetForm();
             this.fileInput.nativeElement.value='';
             this.selectedImg=null;
             this.fileInputClicked=false;
             subs.unsubscribe();
             subs1.unsubscribe();   

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
