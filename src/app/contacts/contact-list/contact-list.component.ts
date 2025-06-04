import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy{
 
  contacts: Contact[] = []

  private subscription: Subscription;

    constructor(private contactService: ContactService) { }



ngOnInit() {
  this.contacts = this.contactService.getContacts();
  this.subscription = this.contactService.contactListChangedEvent
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
      });
}

//onContactSelected(contact: Contact) {
 //this.contactService.contactSelectedEvent.emit(contact);
//}


 ngOnDestroy() {
    this.subscription.unsubscribe();

  }


}
