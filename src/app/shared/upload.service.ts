import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage'
import { finalize } from 'rxjs/operators'

@Injectable({providedIn:'root'})

export class UploadService {
   //________________Upload data _____________________
   private task: AngularFireUploadTask; // main task of upload 
   snapshot:Observable <any>; //snapshot of the byte and upload
   //_________________________________________________

   urlSender=new Subject<string>();

  constructor(private storage:AngularFireStorage){}    







  //_______________Upload Process___________________

  startUpload(event:FileList){

    const file=event[0];

    const path =`memos/${new Date().getTime()}_${file.name}`; //the path in firebase cloud
    const ref=this.storage.ref(path);
      this.task=this.storage.upload(path,file); //Upload the image
      
     return this.task.snapshotChanges()
     .pipe(
        finalize(async ()=>{
          this.urlSender
          .next(await ref.getDownloadURL().toPromise()); //sent url to this subject to subscribe in (onSubmit)
        })
      )
    }
}