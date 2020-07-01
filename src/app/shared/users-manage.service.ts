import { Injectable, ErrorHandler } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from './user.model';


//data recieved from http request
export interface authData{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    displayName:string,
    registered?:boolean,
    
}

@Injectable({
  providedIn: 'root'
})
export class UsersManageService {

currentUser=new BehaviorSubject<User>(null);
private expireTimer:any;

  constructor(private http:HttpClient,private router:Router){}

  signup(email:string,password:string,displayName:string){
      return this.http.post<authData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC40sSGaX0-fvmDBv6Ee5T4Jc7igeeQ0og',
      {   email:email,
          password:password,
          returnSecureToken:true
      
      }).pipe(
          catchError(this.handelErrors),
          tap(resData=>{
              this.setDisplayName(resData.idToken,displayName).subscribe(
                  (name)=>{
                      this.handelAuth(resData.email,resData.localId,resData.idToken,+resData.expiresIn,name)
                  }
              )
          })
      )
  }
  
  login(email:string,password:string){
      return this.http.post<authData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC40sSGaX0-fvmDBv6Ee5T4Jc7igeeQ0og',{
          email:email,
          password:password,
          returnSecureToken:true
      }).pipe(
          catchError(this.handelErrors),
          tap(resData=>{   
            this.handelAuth(resData.email,resData.localId,resData.idToken,+resData.expiresIn,resData.displayName)    
          })
      )
  
  }
  
  autoLogin(){
      const userData:
      {
          email:string,
          id:string,
          _token:string,
          _tokenExpireDate:string,
          displayName:string
      }
      =JSON.parse(localStorage.getItem('userData'));
      console.log(userData)
      if(!userData){
          return;
      }
  
      const loadedUserData= new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpireDate),userData.displayName)
      if(loadedUserData.token){
          console.log(loadedUserData)
          this.currentUser.next(loadedUserData);
          const timeToAutoLogout=new Date(userData._tokenExpireDate).getTime() - new Date().getTime();
          console.log(timeToAutoLogout)
          this.autoLogout(timeToAutoLogout);
      }
      
  }
  
  
  
  logout(){
      this.currentUser.next(null);
      this.router.navigate(['/home'])
      localStorage.removeItem('userData');
      if(this.expireTimer){
          clearTimeout(this.expireTimer);
      }
      this.expireTimer=null;
  }
  
  autoLogout(expireTime:number){
  
  this.expireTimer=setTimeout(() => {
        alert('Please Login again')
        this.logout()
      }, expireTime);
  }


  setDisplayName(token:string,name:string){
  
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC40sSGaX0-fvmDBv6Ee5T4Jc7igeeQ0og',
            {idToken:token,
            displayName:name,
            photoUrl:'',
            deleteAttribute:[],
            returnSecureToken:false}).pipe(
                catchError(this.handelErrors),
                map(res=>{return name}),
                
            )
  }

  

  private handelAuth(email:string,id:string,token:string,expireTime:number,displayName:string){
      const expireDate=new Date(new Date().getTime() + expireTime*1000)
      const user=new User(email,id,token,expireDate,displayName);
      this.currentUser.next(user);
      this.autoLogout(expireTime*1000);
      localStorage.setItem('userData',JSON.stringify(user));
  
  }
  
  
  private handelErrors(errorRes:HttpErrorResponse){
      let errorMessage='An unknown error occurred!'
              if(!errorRes.error||!errorRes.error.error){
                 return throwError(errorMessage)
              }
              switch(errorRes.error.error.message){
                  case 'EMAIL_EXISTS':
                      errorMessage='This Email is already exists'
                      break;
                  case 'EMAIL_NOT_FOUND':
                      errorMessage='This Email you have entered is not exists'
                      break;
                  case 'INVALID_PASSWORD':
                      errorMessage='This password is incorrect'
                      break;
                  case 'INVALID_ID_TOKEN':
                      errorMessage='Please Sign in again'
                      break;
                  case 'USER_NOT_FOUND':
                      errorMessage='There is any user like this'
                    
                    

                    
              }
              return throwError(errorMessage);
  
  }
  



}
