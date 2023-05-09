import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../contact.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent  implements OnInit{
  contact: any;
  mode!: string;

  constructor(public dialogRef: MatDialogRef<ContactFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private contactService: ContactService,private formBuilder: FormBuilder) {}
  filtersForm!: FormGroup;

  ngOnInit() {
    
    this.filtersForm = this.formBuilder.group({
      name: [''],
      phone: [''],
      address: [''],
      notes: ['']
    });
    this.fillEditFormWithData()
    // this.contact = this.contactService.getCurrentContact();
    // this.mode = this.contactService.getEditMode() ? 'Edit' : 'Add';
  }

  saveContact(values:any){
    console.log(values)
    let body =values
    this.contactService.addContact(body).subscribe({
       next: (res:any)=>{
        
    
       },
       error:(httpError:any)=>{
         
       }
     })
   }
   updateContact(values:any){
    console.log(values)
    let body =values
    let id =this.data.id
    this.contactService.updateContact(id,body).subscribe({
       next: (res:any)=>{
        
    
       },
       error:(httpError:any)=>{
         
       }
     })
     this.dialogRef.close();
   }
   fillEditFormWithData() {
    // console.log(contact)
    if(this.data.edit){
      const contact = this.data.contacts.find((c: { _id: any; }) => c._id === this.data.id);
      console.log(contact)
  
      this.filtersForm.get('notes')?.setValue(contact.notes);
      this.filtersForm.get('address')?.setValue(contact.address);
      this.filtersForm.get('phone')?.setValue(contact.phone);
  
      this.filtersForm.get('name')?.setValue(contact.name);
    }
    
    


  }
  
        
}
