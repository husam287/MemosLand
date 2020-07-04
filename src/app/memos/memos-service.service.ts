import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {  HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';
import { memoModel } from './memo.model';
import { UsersManageService } from '../shared/users-manage.service';

@Injectable({providedIn:'root'})
export class MemosServiceService {

  //array of memories
  private memos:memoModel[]=[];
  refresher=new Subject<memoModel[]>();
  constructor(private http:HttpClient,private storage :AngularFireStorage,private userSys:UsersManageService) { }

  
  addMemo(memo:memoModel){
    return this.uploadMemo(memo);
  }
  getMemos(){
    this.onFetching();
  }
  
  updateMemo(newMemo:memoModel,changePhoto:boolean,oldurl?:string){
    let userId=null;
    this.userSys.currentUser.subscribe((user)=>{
      userId=user.id;
    })
         
         if(changePhoto){
           this.storage.storage.refFromURL(oldurl).delete().then();
         }
         let updatedUrl:string='https://memosland-b1118.firebaseio.com/memos_'+userId+'/'+newMemo.id+'.json';
         return this.http.put(updatedUrl,newMemo)
         
      
    

  }
  removeMemo(removedMemo:memoModel){
    let userId=null;
    this.userSys.currentUser.subscribe((user)=>{
      userId=user.id;
    })
         let url:string=removedMemo.url;
         this.storage.storage.refFromURL(url).delete().then();
         let deleteUrl:string='https://memosland-b1118.firebaseio.com/memos_'+userId+'/'+removedMemo.id+'.json';
        return this.http.delete(deleteUrl);
  }



  //______________UPLOAD TO THE DATABASE________________
  uploadMemo(memo:memoModel){
    let userId=null;
    this.userSys.currentUser.subscribe((user)=>{
      userId=user.id;
    })
    return this.http.post('https://memosland-b1118.firebaseio.com/memos_'+userId+'.json',memo)
    
  }

  downloadAllMemos(){
    let userId=null;
    this.userSys.currentUser.subscribe((user)=>{
      userId=user.id;
    })
   return this.http.get<{[key:string]:memoModel}>('https://memosland-b1118.firebaseio.com/memos_'+userId+'.json')
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
    let userId=null;
    this.userSys.currentUser.subscribe((user)=>{
      userId=user.id;
    })
    return this.http.get<memoModel>('https://memosland-b1118.firebaseio.com/memos_'+userId+'/'+key+'.json')
    .pipe(map((data)=>{
      
        var arr:memoModel=null;
          
            data.date=new Date(data.date);
            arr={...data,id:key};
          

        
        return arr;

    }))
  }
  onFetching(){
    let subs:Subscription= this.downloadAllMemos()
    .subscribe(
      (data)=>{
        this.memos=data;
        this.refresher.next(data);
        subs.unsubscribe();
      })

    }



  
}
