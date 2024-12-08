import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Logindetails } from 'src/app/Models/loginrequest';
import { AdminservicesService } from 'src/app/Services/adminservices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;
  Postloginmaster: any;
  aFormGroup: any;
  UserId: any;
  constructor(private http: HttpClient, private router: Router, private adminservicesService: AdminservicesService) {}
  loginUser: Logindetails = new Logindetails();
  ngOnInit() {
   
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.aFormGroup.get(controlName)!.hasError(errorName);
  };
  Postlogindetails() {
    this.loginUser.UserId = this.loginUser.UserId;
    this.loginUser.Username = this.loginUser.Username;
    this.loginUser.Password = this.loginUser.Password;
  
    this.adminservicesService.Postlogindeatils(this.loginUser).subscribe(
      (result: any) => {
        this.Postloginmaster = result;
        console.log(this.Postloginmaster, 'login');
        const userId= result.userId;
        if (result.success) {
          const userRole = result.role;
          if (result.role === 1) {
            sessionStorage.setItem('userRole', 'Admin');
            this.router.navigate(['/']);
            var userselstyear={
              userId: this.UserId,
            };
          } else if (result.role === 2) {
            sessionStorage.setItem('userRole', 'ChannelManager');
            sessionStorage.setItem('userId', result.userId);
           this.router.navigate(['/Channeldata']);

          } else if (result.role === 4) {
            sessionStorage.setItem('userRole', 'Director');
            this.router.navigate(['/director-dashboard'], { state: { data: result.data } });
          } else if (result.role === 6) {
            sessionStorage.setItem('userRole', 'Advertiser');
            sessionStorage.setItem('userId', result.userId);
            this.router.navigate(['/addadvertiesment']);
          }
        } 
        
        
        else {
          alert(result.error);
          alert("Invalid login credentials.");
          this.errorMessage = result.message || 'Invalid login credentials.';
          console.error('Login failed:', this.errorMessage);
        }        
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'An error occurred. Please try again.';
        console.error('API error:', error);
      }
    );
  }
}
