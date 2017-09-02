import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/observable';

import { Contact } from '../contact';

@Injectable()
export class ContactsService {

  constructor(private httpClient: HttpClient) { }

  public getContactsCount(): Observable<number> {

    return this.httpClient.get<number>('http://localhost:1337/contacts/count');

  }

  public getPageContacts(limit: number, skip: number, filters?: { [property: string]: string }, sort?: any): Observable<Contact[]> {

    let queryParameters = new HttpParams();

    queryParameters = queryParameters.append('limit', String(limit));

    queryParameters = queryParameters.append('skip', String(skip));

    if (filters) {

      let filterQuery: any = {};

      Object.keys(filters).forEach(filter => {

        filterQuery[filter] = {
          contains: filters[filter]
        }

      });

      queryParameters = queryParameters.append('where', JSON.stringify(filterQuery));

    }

    if (sort) {

      let sortQuery: string = `${sort.by} ${sort.reverse ? 'DESC' : 'ASC'}`;

      queryParameters = queryParameters.append('sort', sortQuery);

    }

    return this.httpClient.get<Contact[]>('http://localhost:1337/contacts', { params: queryParameters });

  }

}