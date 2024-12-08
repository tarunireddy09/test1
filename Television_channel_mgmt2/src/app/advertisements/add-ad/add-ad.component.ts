import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Advertiesment } from 'src/app/Models/Advertiesment';
import { AdminservicesService } from 'src/app/Services/adminservices.service';
@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.css']
})
export class AddAdComponent {
  selectuser:any[]=[];
  PostAds :any[]=[];

  loading: any;
 
addadvertiesment: Advertiesment = new Advertiesment();
name: any;
advertisement: any;
  errorMessage: string | undefined;


  constructor(private http: HttpClient, private router: Router, private adminservicesService: AdminservicesService) {
    this.getuserdata();
  }
  

PostAdvertiesment() {
  this.addadvertiesment.AdvertisementId = this.addadvertiesment.AdvertisementId;
  this.addadvertiesment.Title = this.addadvertiesment.Title;
  this.addadvertiesment.ClientName = this.addadvertiesment.ClientName;
  this.addadvertiesment.ScheduledDate = this.addadvertiesment.ScheduledDate; 
   this.addadvertiesment.Duration = this.addadvertiesment.Duration;  
  this.addadvertiesment.Rate = this.addadvertiesment.Rate;
  this.addadvertiesment.AssignedSubcategory = this.addadvertiesment.AssignedSubcategory;
  this.addadvertiesment.Status = "Active";
  this.addadvertiesment.UserId=this.addadvertiesment.UserId;
  


  this.adminservicesService.PostAdvertiesment(this.addadvertiesment).subscribe(
    (result: any) => {
      this.PostAds = result;
      console.log(this.PostAds, 'Advertiesment');
      alert('Advertiesment is Successfully!!!');

      
    },
    (error) => {
      this.loading = false;
      this.errorMessage = 'An error occurred. Please try again.';
      console.error('API error:', error);
    }
  );
}

getuserdata()
  {
    this.adminservicesService.GetUsers().subscribe((result:any) => {
     
this.selectuser= result;
console.log(this.selectuser, "selectusers");

      
    });

  }

}
