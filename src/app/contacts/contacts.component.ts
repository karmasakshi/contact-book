import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';

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
  public searchFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private contactsService: ContactsService) {

    this.componentStatus = 'loaded';

    this.contactsCount = 0;

    this.pageContacts = [];

    this.pageSize = 5;

    this.searchFormGroup = this.formBuilder.group({
      searchKey: ['']
    });

  }

  ngOnInit() {

    // Subscribe to changes of the search input.
    this.searchFormGroup.valueChanges.debounceTime(300).subscribe(

      (changes) => {

        this.searchContacts(changes.searchKey);

      }

    );

    // Get contacts' count.
    this.getContactsCount();

    // Get page contacts.
    this.getPageContacts(this.pageSize, 0);

  }

  /**
   *
   * Adds seed contacts to API.
   *
   */
  public addSeedContacts(): void {

    this.componentStatus = 'loading';

    this.contactsService.addSeedContacts().subscribe(

      (response) => {

        this.getPageContacts(this.pageSize, 0);

      },

      (error) => {

        this.componentStatus = 'loaded';

      }

    );

  }

  /**
   *
   * Gets contacts' count.
   *
   */
  public getContactsCount(): void {

    this.contactsService.getContactsCount().subscribe(

      (response) => {

        this.contactsCount = response;

      },

      (error) => { }

    );

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

  /**
   *
   * Searches contacts.
   *
   * @param searchKey Search key.
   */
  public searchContacts(searchKey): void {

    if (searchKey.length === 0) {

      this.getPageContacts(this.pageSize, 0);

    } else {

      this.componentStatus = 'loading';

      this.contactsService.searchContacts(searchKey).subscribe(

        (response) => {

          this.pageContacts = response;

          this.contactsCount = this.pageContacts.length;

          this.componentStatus = 'loaded';

        },

        (error) => { }

      );

    }

  }

  /**
   *
   * Update page.
   *
   * @param state Clarity Datagrid state.
   */
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