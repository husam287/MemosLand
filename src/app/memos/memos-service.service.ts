import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {  HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';
import { memoModel } from './memo.model';

@Injectable({providedIn:'root'})
export class MemosServiceService {

  //array of memories
  private memos:memoModel[]=[];
  refresher=new Subject<memoModel[]>();
  updatedMemoDone=new Subject<boolean>();
  constructor(private http:HttpClient,private storage :AngularFireStorage) { }

  
  addMemo(memo:memoModel){
    this.uploadMemo(memo);
  }
  getMemos(){
    this.onFetching();
  }
  
  updateMemo(newMemo:memoModel,changePhoto:boolean,oldurl?:string){
    
         
         if(changePhoto){
           this.storage.storage.refFromURL(oldurl).delete().then();
         }
         let updatedUrl:string='https://memosland-b1118.firebaseio.com/memos/'+newMemo.id+'.json';
         this.http.put(updatedUrl,newMemo).subscribe(
           ()=>{
             this.onFetching();
             if(!changePhoto){
              this.updatedMemoDone.next(true);
            }
           }
         );
         
      
    

  }
  removeMemo(removedMemo:memoModel){
  
         let url:string=removedMemo.url;
         this.storage.storage.refFromURL(url).delete().then();
         let deleteUrl:string='https://memosland-b1118.firebaseio.com/memos/'+removedMemo.id+'.json';
         this.http.delete(deleteUrl).subscribe(
           ()=>{
             this.onFetching();

           })
  }



  //______________UPLOAD TO THE DATABASE________________
  uploadMemo(memo:memoModel){
    this.http.post('https://memosland-b1118.firebaseio.com/memos.json',memo)
    .subscribe();
  }

  downloadAllMemos(){
   return this.http.get<{[key:string]:memoModel}>('https://memosland-b1118.firebaseio.com/memos.json')
    .pipe(map((data)=>{
        const arr:memoModel[]=[];
        for(const key in data){
          if(data.hasOwnProperty(key))
          {
            data[key].date=new Date(data[key].date);
            arr.push({...data[key],id:key});
          }

        }
        this.refresher.next(arr);
        return arr;

    }))
    
  }
  downloadMemo(key:string){
    return this.http.get<memoModel>('https://memosland-b1118.firebaseio.com/memos'+'/'+key+'.json')
    .pipe(map((data)=>{
      
        var arr:memoModel=null;
          
            data.date=new Date(data.date);
            arr={...data,id:key};
          

        
        return arr;

    }))
  }
  private onFetching(){
    let subs:Subscription= this.downloadAllMemos()
    .subscribe(
      (data)=>{
        this.memos=data;
        this.refresher.next(data);
        subs.unsubscribe();
      })

    }



  
}
