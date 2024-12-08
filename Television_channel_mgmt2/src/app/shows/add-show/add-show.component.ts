import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Show } from 'src/app/Models/Shows';
import { AdminservicesService } from 'src/app/Services/adminservices.service';

@Component({
  selector: 'app-add-show',
  templateUrl: './add-show.component.html',
  styleUrls: ['./add-show.component.css']
})
export class AddShowComponent {

  name: any;
  advertisement: any;
  errorMessage: string | undefined;
  showmaster: Show[] = [];
  selectuser:any[]=[];
    constructor(private http: HttpClient, private router: Router, private adminservicesService: AdminservicesService) {}
  
    PostAds :any[]=[];
  
    loading: any;
    addshowevents: Show = new Show();

  ngOnInit() {
    this.getuserdata();
  }
  
  getuserdata()
  {
    this.adminservicesService.GetUsers().subscribe((result:any) => {
    this.selectuser= result;
    console.log(this.selectuser, "selectusers");  
    });
  } 
  PostAdvertiesment() {
    this.addshowevents.ShowId = this.addshowevents.ShowId;
    this.addshowevents.Title = this.addshowevents.Title;
    this.addshowevents.Genre = this.addshowevents.Genre;
    this.addshowevents.Schedule = this.addshowevents.Schedule; 
     this.addshowevents.Duration = this.addshowevents.Duration;  
    this.addshowevents.Rating = this.addshowevents.Rating;
    this.addshowevents.ProducerId = this.addshowevents.ProducerId;
    this.addshowevents.Status = "Active";
    this.adminservicesService.PostShowChannels(this.addshowevents).subscribe(
      (result: any) => {
        this.PostAds = result;
        console.log(this.PostAds, 'Showads');
        alert('Shows created is Successfully!!!');
  
        
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'An error occurred. Please try again.';
        console.error('API error:', error);
      }
    );
  }
}
