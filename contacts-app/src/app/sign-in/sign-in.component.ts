import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  loginForm = this.formBuilder.group({
    user: [
      '', ],
    pass: ['', ],
  });
  constructor(
    private formBuilder: FormBuilder,private userService:UserService,private router:Router,
  ) {}
}
