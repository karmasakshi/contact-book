import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClarityModule } from 'clarity-angular';

import { AppRoutingModule } from './app-routing.module';

import { ContactsService } from './services/contacts.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContactsComponent } from './contacts/contacts.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  imports: [

    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,

    ClarityModule.forRoot(),

    AppRoutingModule

  ],
  providers: [ContactsService]
})
export class AppModule { }