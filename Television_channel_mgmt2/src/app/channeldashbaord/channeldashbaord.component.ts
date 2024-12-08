import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminservicesService } from 'src/app/Services/adminservices.service';
import { Show } from 'src/app/Models/Shows';
@Component({
  selector: 'app-channeldashbaord',
  templateUrl: './channeldashbaord.component.html',
  styleUrls: ['./channeldashbaord.component.css']
})
export class ChanneldashbaordComponent implements OnInit {

  errorMessage: string | undefined;
  loading: boolean | undefined;
  userId: any;
  route: any;
  getwrkdata :any=[];

  selectedyears: any=[];

  constructor(private http: HttpClient, private router: Router, private adminservicesService: AdminservicesService, ) {}

Showads :any[]=[];
PostAds :any[]=[];
addshowevents: Show = new Show();
params:any[]=[];

userid :string="";

ngOnInit() {
    this.route.paramMap.subscribe((params: { get: (arg0: string) => any; }) => {
      this.userId = params.get('id');
      console.log('Product ID (from subscription):', this.userId);
    });
  this.selectedyears=localStorage.getItem("userselstyear");
  this.GetShowChannellistbyid();
  console.log(this.selectedyears, "selected"); 
}
redirectToForm() {
  this.router.navigate(['/add-advertisement']);
}
getShowlistdata() {
  this.adminservicesService.GetShows().subscribe((data) => {
    this.Showads = data as Show[];

    console.log(this.Showads , "getshowlist");
  });
}
GetShowChannellistbyid() {

    this.route.paramMap.subscribe((params: { get: (arg0: string) => any; }) => {
      this.userId = params.get('id');
      this.adminservicesService.GetShowsByUserId(this.userId).subscribe((data) => {
        this.Showads = data as Show[];
      console.log('Product ID (from subscription):', this.userId);
    console.log(this.Showads , "getshowlist");
  });
});
}






UopdateChannelsmgmt(data: any) {


  //this.addshows.Status = "Active";
  // Call the service to update the advertisement
  //this.adminservicesService.UpdateAdvertiesment(data.advertisementId, data).subscribe({
    console.log(data.id, "userid");
    console.log(data.showId, "updateadv");
  this.adminservicesService.UpdateShowchannels(data.showId, data).subscribe({
    next: (response) => {
      console.log('Update successful:', response);
      alert('Advertisement updated successfully!');
      this.getShowlistdata(); // Refresh the advertisements table
    },
    error: (error) => {
      console.error('Error updating advertisement:', error);
      alert('Failed to update advertisement!');
    },
  });

  // Mark the row editing as finished
  data.isEditing = false;
}


cancelEdit(item: any) {
  item.isEditing = false;
  item.editable = !item.editable;
  this.getShowlistdata();
}

Editmandalmaster(item: any) {
  item.isEditing = true;
  item.editable = !item.editable;
}


DeletShowseventsdata(item:any) {
  debugger;
  console.log(item, "datadelete");
  console.log(item.advertisementId);
  this.adminservicesService.DeleteShowevents(item.showId).subscribe((data) => {
    this.getShowlistdata
  });
}




isModalOpen = false;
newChannel: any = {};

openAddChannelModal() {
  this.isModalOpen = true;
}

closeModal() {
  this.isModalOpen = false;
  this.newChannel = {}; // Clear the form
}


  
PostChannelShowsevents() {
  this.addshowevents.ShowId = this.addshowevents.ShowId;
  this.addshowevents.Title = this.addshowevents.Title;
  this.addshowevents.Genre = this.addshowevents.Genre;
  this.addshowevents.Schedule = this.addshowevents.Schedule; 
   this.addshowevents.Duration = this.addshowevents.Duration;  
  this.addshowevents.Rating = this.addshowevents.Rating;
  this.addshowevents.ProducerId = this.addshowevents.ProducerId;
  this.addshowevents.Status = "Active";
  //this.addshowevents.CreatedAt = this.addshowevents.ClientName;
  //this.addshowevents.UpdatedAt = this.addshowevents.ClientName;


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
