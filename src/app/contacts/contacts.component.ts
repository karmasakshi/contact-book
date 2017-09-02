import { Component, OnInit } from '@angular/core';

import { Contact } from '../contact';

import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-contacts',
  styleUrls: ['./contacts.component.css'],
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit {

  public activePageNumber: number;
  public contacts: Contact[];
  public pageSize: number;
  public totalContactsCount: number;

  constructor(private contactsService: ContactsService) {

    this.activePageNumber = 1;

    this.contacts = [];

    this.pageSize = 5;

    this.totalContactsCount = 0;

  }

  ngOnInit() {

    this.contactsService.getTotalContactsCount().subscribe(

      (response) => {

        this.totalContactsCount = response;

      },

      (error) => { }

    );

    this.contactsService.getContacts(this.activePageNumber, this.pageSize).subscribe(

      (response) => {

        this.contacts = response;

      },

      (error) => { }

    );

  }

}