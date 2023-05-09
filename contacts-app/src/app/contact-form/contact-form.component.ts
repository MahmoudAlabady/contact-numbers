import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  contact: any;
  mode!: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contact = this.contactService.getCurrentContact();
    this.mode = this.contactService.getEditMode() ? 'Edit' : 'Add';
  }

  saveContact() {
    if (this.contactService.getEditMode()) {
      this.contactService.updateContact(this.contact._id, this.contact).subscribe(() => {
        this.contactService.setCurrentContact(null);
        this.contactService.setEditMode(false);
      });} else {
        this.contactService.addContact(this.contact).subscribe(() => {
        this.contactService.setCurrentContact(null);
        this.contactService.setEditMode(false);
        });
        }
        }
        
        cancel() {
        this.contactService.setCurrentContact(null);
        this.contactService.setEditMode(false);
        }
        
}
