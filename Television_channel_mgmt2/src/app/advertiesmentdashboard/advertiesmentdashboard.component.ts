import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminservicesService } from 'src/app/Services/adminservices.service';
import { Show } from 'src/app/Models/Shows';

@Component({
  selector: 'app-advertiesmentdashboard',
  templateUrl: './advertiesmentdashboard.component.html',
  styleUrls: ['./advertiesmentdashboard.component.css']
})
export class AdvertiesmentdashboardComponent {
  errorMessage: string | undefined;
  loading: boolean = false;

  Showads: Show[] = [];
  PostAds: any[] = [];
  addshowevents: Show = new Show();
  userid: string = "";
  
  isModalOpen: boolean = false;
  newChannel: any = {};

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private adminservicesService: AdminservicesService
  ) {}




  ngOnInit() {
    
    this.getShowlistdata1();
   
  }
  
  

openAddChannelModal() {
  this.isModalOpen = true;
}

closeModal() {
  this.isModalOpen = false;
}
  
  getShowlistdata1() {
    this.adminservicesService.GetShows().subscribe((data) => {
      this.Showads = data as Show[];
      console.log(this.Showads, "ads");
    })
  };
  
  UpdateAdvertiement(data: any) {
    this.loading = true;

    this.adminservicesService.UpdateShowchannels(data.ShowId, this.addshowevents).subscribe({
      next: (response) => {
        console.log('Update successful:', response);
        alert('Advertisement updated successfully!');
        this.getShowlistdata1(); 
      },
      error: (error) => {
        console.error('Error updating advertisement:', error);
        alert('Failed to update advertisement!');
      },
      complete: () => {
        this.loading = false;
      }
    });

    data.isEditing = false;
  }


  cancelEdit(item: any) {
    item.isEditing = false;
    this.getShowlistdata1();
  }


  Editmandalmaster(item: any) {
    item.isEditing = true;
  }

  DeleteAdvertiesment(item:any) {
    if (!this.userid) {
      alert('Please select a valid show to delete.');
      return;
    }

    this.adminservicesService.DeleteAdvertiesment(item.advertisementId).subscribe({
      next: (response) => {
        alert('Advertisement deleted successfully!');
        this.getShowlistdata1();
      },
      error: (error) => {
        console.error('Error deleting advertisement:', error);
        alert('Failed to delete advertisement.');
      }
    });
  }

  PostChannelShowsevents() {
    this.loading = true;

    this.adminservicesService.PostShowChannels(this.addshowevents).subscribe({
      next: (result: any) => {
        this.PostAds = result;
        console.log('Show successfully created:', this.PostAds);
        alert('Show created successfully!');
        this.getShowlistdata1(); // Refresh the show list after adding
      },
      error: (error) => {
        this.errorMessage = 'An error occurred. Please try again.';
        console.error('Error creating show:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

}
