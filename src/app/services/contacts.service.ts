import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/observable';

import { Contact } from '../contact';

@Injectable()
export class ContactsService {

  constructor(private httpClient: HttpClient) { }

  public getContactsCount(): Observable<number> {

    return this.httpClient.get<number>('http://localhost:1337/contacts/count');

  }

  public getPageContacts(limit: number, skip: number): Observable<Contact[]> {

    return this.httpClient.get<Contact[]>('http://localhost:1337/contacts?limit=' + limit + '&skip=' + skip);

  }

}