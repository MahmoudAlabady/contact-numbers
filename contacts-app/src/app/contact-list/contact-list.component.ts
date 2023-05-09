import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../contact.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit{
  filtersForm!: FormGroup;

  contacts: any[] = [];
  page = 1;
  pageSize = 5;
  totalContacts = 0;

  filters = {
    name: '',
    phone: '',
    address: '',
  };
  constructor(private contactService: ContactService,private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.filtersForm = this.formBuilder.group({
      name: [''],
      phone: [''],
      address: [''],
      notes: ['']
    });
    this.getContacts();
  }

  getContacts() {
    const params = {
      page: this.page.toString(),
      name: this.filters.name,
      phone: this.filters.phone,
      address: this.filters.address,
    };
    this.contactService.getContacts(params).subscribe((res: any) => {
      console.log(res)
      this.contacts = res.contacts;

      this.totalContacts =res.count
    });
  }
  onPageChange(page: number) {
    if(page>0){
      this.page = page;
      this.getContacts();
    }
    
  }
  addContact() {
    // this.contactService.setCurrentContact(null);
    // this.contactService.setEditMode(false);
  }

  editContact(contact: any) {
    // this.contactService.setCurrentContact(contact);
    // this.contactService.setEditMode(true);
  }

  deleteContact(contact: any) {
    // if (confirm('Are you sure you want to delete this contact?')) {
    //   this.contactService.deleteContact(contact._id).subscribe(() => {
    //     this.getContacts();
    //   });
    // }
  }
}
