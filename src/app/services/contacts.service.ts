import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/observable';

import { Contact } from '../contact';

@Injectable()
export class ContactsService {

  constructor(private httpClient: HttpClient) { }

  public getContacts(pageNumber: number, pageSize: number): Observable<Contact[]> {

    return this.httpClient.get<Contact[]>('assets/contacts.json');

  }

  public getTotalContactsCount(): Observable<number> {

    return this.httpClient.get<number>('assets/contactsCount.json');

  }

}