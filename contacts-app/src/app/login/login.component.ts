import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    user: [
      '', ],
    pass: ['', ],
  });
  constructor(
    private contactService: ContactService, private formBuilder: FormBuilder,private userService:UserService,private router:Router,
  ) {}

  login(credentials:any) {
    this.userService.authenticate(credentials).subscribe((res: any) => {
      console.log(res)
      let token =res.token
      localStorage.setItem('token', token);
      this.router.navigate(['/contact-list']);
    }, (error: any) => {
      alert('Invalid username or password');
    });
  }
}
