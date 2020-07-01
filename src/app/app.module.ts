import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MemoslandTextComponent } from './memosland-text/memosland-text.component';
import { SignupComponent } from './homepage/signup/signup.component';
import { MemosComponent } from './memos/memos.component';
import { MyMemosComponent } from './memos/my-memos/my-memos.component';
import { AddMemoComponent } from './memos/add-memo/add-memo.component';
import { MemosLeaderMessageComponent } from './shared/memos-leader-message/memos-leader-message.component';
import { SigninComponent } from './signin/signin.component';
import { MemoComponent } from './memos/my-memos/memo/memo.component';
import { MemosMessageComponent } from './memos/memos-message/memos-message.component';
import { MemoEditComponent } from './memos/my-memos/memo/memo-edit/memo-edit.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthInterceptorService } from './shared/users.interceptor.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

export const firebaseconfig =environment.firebaseConfig;
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomepageComponent,
    MemoslandTextComponent,
    SignupComponent,
    MemosComponent,
    MyMemosComponent,
    AddMemoComponent,
    MemosLeaderMessageComponent,
    SigninComponent,
    MemoComponent,
    MemosMessageComponent,
    MemoEditComponent,
    NotFoundComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
