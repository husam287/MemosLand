import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MemosComponent } from './memos/memos.component';
import { AddMemoComponent } from './memos/add-memo/add-memo.component';
import { MyMemosComponent } from './memos/my-memos/my-memos.component';
import { SignupComponent } from './homepage/signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { MemosMessageComponent } from './memos/memos-message/memos-message.component';


const routes: Routes = [
 {path:'',redirectTo:'home',pathMatch:'full'},
 {path:'home',component:HomepageComponent},
 {path:'sign-up',component:SignupComponent},
 {path:'sign-in',component:SigninComponent},
 {path:'memos',component:MemosComponent,
    children:[
      {path:'',component:MemosMessageComponent},
      {path:'add',component:AddMemoComponent},
      {path:'view',component:MyMemosComponent}
    ]
 }





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
