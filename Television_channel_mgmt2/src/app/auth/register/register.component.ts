import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/Users';
import { AdminservicesService } from 'src/app/Services/adminservices.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: '',
    roleId: '',
  };

  roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Channel Manager'},
    { id: 3, name: 'Content Producer' },
    { id: 4, name: 'Editor' },
    { id: 5, name: 'Reporter' },
    { id: 6, name: 'Advertiser' },
  ];

  loading = false;
  errorMessage = '';
  adduser: User = new User();

  constructor(
    private http: HttpClient,
    private router: Router,
    private adminservicesService: AdminservicesService
  ) {}
  PostUserregister() {
    this.loading = true;
    if (!this.adduser.Username || !this.adduser.Email || !this.adduser.PasswordHash || !this.adduser.RoleId) {
      this.errorMessage = 'All fields are required.';
      this.loading = false;
      return;
    }
    this.adduser.UserId = 0;  
    console.log('Request Payload:', this.adduser);  
    this.adminservicesService.PostRegsiter2(this.adduser).subscribe(
      (result: any) => {
        this.loading = false;
        console.log(result, 'Register');
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.error.title || 'An error occurred during registration. Please try again.';
        console.error('Backend error:', error);
      }
    );
  }
}
