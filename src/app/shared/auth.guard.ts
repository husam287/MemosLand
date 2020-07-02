import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersManageService } from '../shared/users-manage.service';
import { map, tap, take } from 'rxjs/operators';

@Injectable({providedIn:'root'})

export class AuthGuard implements CanActivate{

constructor(private authService:UsersManageService,private router:Router){}

    canActivate(router:ActivatedRouteSnapshot,state:RouterStateSnapshot ): 
      Observable<boolean | UrlTree> 
    | Promise<boolean | UrlTree> 
    | boolean | UrlTree {
        return this.authService.currentUser.pipe(
            take(1),
            map(user=>{
                const isAuth=!!user;
                if(isAuth)
                return true;
                else
                return this.router.createUrlTree(['/home']);
            })
            
        )
        
    }
}