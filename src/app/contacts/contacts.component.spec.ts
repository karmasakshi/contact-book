import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder, FormGroup } from '@angular/forms';

import { ContactsComponent } from './contacts.component';

describe('ContactsComponent', () => {

  let component: ContactsComponent;

  let fixture: ComponentFixture<ContactsComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ContactsComponent],
      imports: [FormBuilder, FormGroup]
    }).compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(ContactsComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

});