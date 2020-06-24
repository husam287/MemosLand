import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { finalize} from 'rxjs/operators';


@Component({
  selector: 'app-add-memo',
  templateUrl: './add-memo.component.html',
  styleUrls: ['./add-memo.component.css']
})
export class AddMemoComponent implements OnInit {
  @ViewChild('memoForm') memoForm:NgForm; //The form reference
  @ViewChild('fileInput') fileInput:ElementRef;


  //________________Upload data _____________________
  task: AngularFireUploadTask; // main task of upload 
  url: Observable <String | null>; //download link 
  snapshot:Observable <any>; //snapshot of the byte and upload
  precentage:Observable<number | null>; //used to view when the download complete
  //_________________________________________________
  

  selectedImg=null;  //for the selected image
  dataSubject=new Subject<string>(); //to get url after finish upload and use it at (onsubmit)
  snapshotSubscription:Subscription; //to cancel subscription of upload process
  submitedOnceAtLeast=false; //this flag chose give true the form submit one time

  constructor(private storage:AngularFireStorage) { }


  ngOnInit(): void {
    
  }



  onSubmit(){
    console.log(this.memoForm.form.controls.info.untouched)
    //will start the upload 
    this.startUpload(this.selectedImg);
    

   let subs:Subscription= this.dataSubject.subscribe(
      (url)=>{ //url is the url that will sent after upload complete
        console.log(url);




         //______________RESETING_________________
        this.submitedOnceAtLeast=true;
        this.snapshotSubscription.unsubscribe();
        this.url=null; //reset the url
        this.precentage=null; //reset precentage
        this.memoForm.resetForm();
        this.fileInput.nativeElement.value='';
        this.selectedImg=null;
        subs.unsubscribe();   
    })
    
  }
    
    
     
  
  onChange(event:FileList){
    this.selectedImg=event;
  }






  //############### Upload section ###############

  startUpload(event:FileList){

    const file=event[0];

    //________REJECTION UNSUPPORTED FORMATES_________
    if(file.type.split('/')[0]!=='image'){
      console.error('unsupported file type');
      return
    }
    //________________________________________________



    //_______________Upload Process___________________

    const path =`memos/${new Date().getTime()}_${file.name}`; //the path in firebase cloud
    const ref=this.storage.ref(path);
    
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
