import { Component, OnInit } from '@angular/core';

import { State } from 'clarity-angular';

import { Contact } from '../contact';

import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-contacts',
  styleUrls: ['./contacts.component.css'],
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit {

  public componentStatus: 'loaded' | 'loading';
  public contactsCount: number;
  public pageContacts: Contact[];
  public pageSize: number;

  constructor(private contactsService: ContactsService) {

    this.componentStatus = 'loaded';

    this.contactsCount = 0;

    this.pageContacts = [];

    this.pageSize = 5;

  }

  ngOnInit() {

    this.getContactsCount();

    this.getPageContacts(this.pageSize, 0);

  }

  public getContactsCount(): void {

    this.contactsService.getContactsCount().subscribe(

      (response) => {

        this.contactsCount = response;

      },

      (error) => { }

    );

  }

  public getPageContacts(limit: number, skip: number, filters?: { [property: string]: string }, sort?: any): void {

    this.componentStatus = 'loading';

    this.contactsService.getPageContacts(limit, skip, filters, sort).subscribe(

      (response) => {

        this.pageContacts = response;

        if (filters) {

          this.contactsCount = this.pageContacts.length;

        } else {

          this.getContactsCount();

        }

        this.componentStatus = 'loaded';

      },

      (error) => {

        this.componentStatus = 'loaded';

      }

    );

  }

  public updatePage(state: State): void {

    let filters: { [property: string]: string } = undefined;

    if (state.hasOwnProperty('filters')) {

      filters = {};

      for (let filter of state.filters) {

        let { property, value } = <{ property: string, value: string }>filter;

        filters[property] = value;

      }

    }

    this.getPageContacts(state.page.size, state.page.from, filters, state.sort);

  }

}