  import { Injectable, EventEmitter } from '@angular/core';
  import { Contact } from './contact.model';
  import { MOCKCONTACTS } from './MOCKCONTACTS';
  import { Subject } from 'rxjs';
  @Injectable({
    providedIn: 'root'
})
  export class ContactService {
	contactChangedEvent = new EventEmitter<Contact[]>();
	contactListChangedEvent = new Subject<Contact[]>();
	maxContactId: number;

	contacts: Contact[];

	constructor() {
		this.contacts = MOCKCONTACTS;
		this.maxContactId = this.getMaxId();
	}

	getContacts(): Contact[] {
		return this.contacts.slice();
	}

	getContact(id: string): Contact {
		// //loop through all the contacts
		// this.contacts.forEach(contact => {
		//   //if ids match
		//   if (contact.id === id) {
		//     return contact;
		//   }
		// })
		// //if no id is found...
		// return null;

		for (const contact of this.contacts) {
			if (contact.id === id) {
				return contact;
			}
		}
		return null;
	}

	getMaxId(): number {
		let maxId = 0;
		for (const contact of this.contacts) {
			const currentId = +contact.id;
			if (currentId > maxId) {
				maxId = currentId;
			}
		}
		return maxId;
	}

	addContact(newContact: Contact) {
		if (newContact === null || newContact === undefined) {
			return;
		}

		this.maxContactId++;
		newContact.id = this.maxContactId.toString();
		this.contacts.push(newContact);
		const contactListClone = this.contacts.slice();
		this.contactListChangedEvent.next(contactListClone);
	}

	updateContact(originalContact: Contact, newContact: Contact) {
		if (originalContact === null || originalContact === undefined || newContact === null || newContact === undefined) {
			return;
		}

		const pos = this.contacts.indexOf(originalContact);
		if (pos < 0) {
			return;
		}

		newContact.id = originalContact.id;
		this.contacts[pos] = newContact;
		const contactListClone = this.contacts.slice();
		this.contactListChangedEvent.next(contactListClone);
	}

	deleteContact(contact: Contact) {
		if (contact === null || contact === undefined) {
			return;
		}
		const pos = this.contacts.indexOf(contact);

		if (pos < 0) {
			return;
		}
		this.contacts.splice(pos, 1);
		this.contactListChangedEvent.next(this.contacts.slice());
	}
}