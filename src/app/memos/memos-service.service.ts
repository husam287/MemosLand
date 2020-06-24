import { memoModel } from './memo.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {  HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class MemosServiceService {

  //array of memories
  private memos:memoModel[]=[];
  constructor(private http:HttpClient) { }

  
  addMemo(memo:memoModel){
    this.uploadMemo(memo);
  }
  getMemos(){
    return this.memos.slice();
  }
  
  updateMemo(newMemo:memoModel,id:number){

    this.memos[id]=newMemo;

  }
  removeMemo(id:number){
    this.memos.splice(id);

  }



  //______________UPLOAD TO THE DATABASE________________
  uploadAllMemos(){
    this.http.put('https://memosland-b1118.firebaseio.com/memos.json',this.getMemos())
    .subscribe()
  }
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
        return arr;

    }))
    
  }


  
}
