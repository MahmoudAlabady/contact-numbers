import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private contactService: ContactService, private router: Router) {}

  login() {
    this.contactService.authenticate(this.username, this.password).subscribe((token: string) => {
      localStorage.setItem('token', token);
      this.router.navigate(['/contacts']);
    }, (error: any) => {
      alert('Invalid username or password');
    });
  }
}
