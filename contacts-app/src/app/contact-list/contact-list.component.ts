import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../contact.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit{
  filtersForm!: FormGroup;
  dialogRef!: MatDialogRef<any>;

  contacts: any[] = [];
  page = 1;
  pageSize = 5;
  totalContacts = 0;

  filters = {
    name: '',
    phone: '',
    address: '',
  };
  constructor(private contactService: ContactService,private formBuilder: FormBuilder,private dialog: MatDialog) {}

  ngOnInit() {
    this.createForm();

    this.getContacts();
  }
 

createForm(){
  this.filtersForm = this.formBuilder.group({
    name: [''],
    phone: [''],
    address: [''],
    notes: ['']
  });
  this.filtersForm.valueChanges.subscribe(() => {
    this.getContacts();
  });
}


  getContacts() {
    const params = {
      page: this.page.toString(),
      name: this.filtersForm.get('name')!.value,
      phone: this.filtersForm.get('phone')!.value,
      address: this.filtersForm.get('address')!.value,
    };
    this.contactService.getContacts(params).subscribe((res: any) => {
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
    this.dialogRef = this.dialog.open(ContactFormComponent, {
      width: '369px',
      height: '159px',
      data: 'Do you want to add new contact?'
    });

    this.dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
      }
    });
  }
  // addContact() {
  //   // this.contactService.setCurrentContact(null);
  //   // this.contactService.setEditMode(false);
  // }

  editContact(contact: any) {
    this.dialogRef = this.dialog.open(ContactFormComponent, {
      width: '369px',
      height: '159px',
      data: this.contacts
    });

    this.dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
      }
    });
  }

  deleteContact(id: string) {
    this.contactService.deleteContact(id).subscribe((res: any) => {
      this.getContacts()
    });
  }
}
