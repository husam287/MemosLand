import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
