import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { HttpClientModule } from '@angular/common/http';
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
import { MemoEditComponent } from './memos/my-memos/memo-edit/memo-edit.component';
import { MemosMessageComponent } from './memos/memos-message/memos-message.component';


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
    MemoEditComponent,
    MemosMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
