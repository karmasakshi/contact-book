import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClarityModule } from 'clarity-angular';

import { AppRoutingModule } from './app-routing.module';

import { ContactsService } from './services/contacts.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ContactsComponent } from './contacts/contacts.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    ContactsComponent
  ],
  imports: [

    HttpClientModule,

    BrowserModule,
    BrowserAnimationsModule,

    ClarityModule.forRoot(),

    AppRoutingModule

  ],
  providers: [ContactsService]
})
export class AppModule { }