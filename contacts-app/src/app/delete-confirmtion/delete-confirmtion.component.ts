import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-delete-confirmtion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-confirmtion.component.html',
  styleUrls: ['./delete-confirmtion.component.scss']
})
export class DeleteConfirmtionComponent {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmtionComponent>, @Inject(MAT_DIALOG_DATA) public data: string,private router:Router,private contactService: ContactService) {}

  closeClick(): void {
    this.dialogRef.close();
  }

  deletee() {
    this.contactService.deleteContact(this.data).subscribe((res: any) => {
      
    });   
     this.dialogRef.close();

  }
}
