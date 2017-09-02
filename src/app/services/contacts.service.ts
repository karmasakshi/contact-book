import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/observable';

import { Contact } from '../contact';

@Injectable()
export class ContactsService {

  private apiEndpoint: string;

  constructor(private httpClient: HttpClient) {

    this.apiEndpoint = 'http://localhost:1337/contacts';

  }

  /**
   *
   * Adds seed contacts to API.
   *
   */
  public addSeedContacts(): Observable<Contact[]> {

    return this.httpClient.post<Contact[]>(this.apiEndpoint, [
      {
        "email": "jack.pigeon@gmail.com",
        "firstName": "Jack",
        "lastName": "Pigeon",
        "phone": "+91-78-234-23",
        "createdAt": "2017-09-02T15:44:09.289Z",
        "updatedAt": "2017-09-02T15:44:09.289Z",
        "id": 12
      },
      {
        "email": "bojack.pigeon@gmail.com",
        "firstName": "BoJack",
        "lastName": "Pigeon",
        "phone": "+91-79-234-23",
        "createdAt": "2017-09-02T15:51:17.782Z",
        "updatedAt": "2017-09-02T15:51:17.782Z",
        "id": 13
      },
      {
        "email": "bojack.horseman@gmail.com",
        "firstName": "BoJack",
        "lastName": "Horseman",
        "phone": "+91-769-69",
        "createdAt": "2017-09-02T15:51:32.640Z",
        "updatedAt": "2017-09-02T15:51:32.640Z",
        "id": 14
      },
      {
        "email": "walter.white@gmail.com",
        "firstName": "Walter",
        "lastName": "White",
        "phone": "+90-769-69",
        "createdAt": "2017-09-02T15:51:46.846Z",
        "updatedAt": "2017-09-02T15:51:46.846Z",
        "id": 15
      },
      {
        "email": "bazooka.white@gmail.com",
        "firstName": "Walter",
        "lastName": "Boom",
        "phone": "+90-769-69-11",
        "createdAt": "2017-09-02T15:51:57.900Z",
        "updatedAt": "2017-09-02T15:51:57.900Z",
        "id": 16
      },
      {
        "email": "afrojack.white@gmail.com",
        "firstName": "Afrojack",
        "lastName": "Water",
        "phone": "+90-7-69-11",
        "createdAt": "2017-09-02T15:52:21.326Z",
        "updatedAt": "2017-09-02T15:52:21.326Z",
        "id": 17
      },
      {
        "email": "lolmax.tutu@gmail.com",
        "firstName": "Tutu",
        "lastName": "Lol",
        "phone": "+90-7-69-111",
        "createdAt": "2017-09-02T15:52:41.566Z",
        "updatedAt": "2017-09-02T15:52:41.566Z",
        "id": 18
      },
      {
        "email": "donald.drumpf@gmail.com",
        "firstName": "Donald",
        "lastName": "Drumpf",
        "phone": "+1-11-11-111",
        "createdAt": "2017-09-02T15:53:04.619Z",
        "updatedAt": "2017-09-02T15:53:04.619Z",
        "id": 19
      }
    ]);

  }

  /**
   *
   * Gets contacts' count.
   *
   */
  public getContactsCount(): Observable<number> {

    return this.httpClient.get<number>(this.apiEndpoint + '/count');

  }

  /**
   *
   * Gets page contacts.
   *
   * @param limit Limit per page.
   * @param skip Number of items to skip.
   * @param filters Filters.
   * @param sort Sort criterion.
   */
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

    return this.httpClient.get<Contact[]>(this.apiEndpoint, { params: queryParameters });

  }

  /**
   *
   * Searches contacts.
   *
   * @param searchKey Search key.
   */
  public searchContacts(searchKey: string): Observable<Contact[]> {

    let queryParameters = new HttpParams();

    queryParameters = queryParameters.append('searchKey', searchKey);

    return this.httpClient.get<Contact[]>(this.apiEndpoint + '/search', { params: queryParameters });

  }

}