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

  public componentStatus: 'loading' | 'loaded';
  public contacts: Contact[];
  public pageSize: number;
  public totalContactsCount: number;

  constructor(private contactsService: ContactsService) {

    this.componentStatus = 'loaded';

    this.contacts = [];

    this.pageSize = 5;

    this.totalContactsCount = 0;

  }

  ngOnInit() {

    this.getTotalContactsCount();

    this.getActivePageContacts(this.pageSize, 0);

  }

  public getActivePageContacts(limit: number, skip: number): void {

    this.contactsService.getContacts(limit, skip).subscribe(

      (response) => {

        this.contacts = response;

      },

      (error) => { }

    );

  }

  public getTotalContactsCount(): void {

    this.contactsService.getTotalContactsCount().subscribe(

      (response) => {

        this.totalContactsCount = response;

      },

      (error) => { }

    );

  }

  public updateActivePage(state: State): void {

    this.componentStatus = 'loading';

    this.getActivePageContacts(state.page.size, state.page.from);

    this.componentStatus = 'loaded';

  }

}