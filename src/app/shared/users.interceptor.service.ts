import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { UsersManageService } from './users-manage.service';
import { exhaustMap, take } from 'rxjs/operators';




@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authService:UsersManageService){}
    intercept(req:HttpRequest<any>,next:HttpHandler){
        return this.authService.currentUser.pipe(
            take(1),
            exhaustMap(user=>{
                if(!user)
                    return next.handle(req);
                else{
                    const modifiedReq=req.clone({
                        params:new HttpParams().set('auth',user.token)
                    })
                    return next.handle(modifiedReq);
                }
            })
        )

    }


}