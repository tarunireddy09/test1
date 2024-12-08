import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminservicesService } from 'src/app/Services/adminservices.service';
import { Show } from 'src/app/Models/Shows';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrls: ['./shows-list.component.css']
})
export class ShowsListComponent {
  stateArr: Show[] = [];
  constructor(private http: HttpClient, private router: Router, private adminservicesService: AdminservicesService) {}
  addshows : Show= new Show();
  Showads :any[]=[];
  userId:any;
  userRole: string | null = null;
  ngOnInit() {
    this.getInitialData();
}
getInitialData(){
  this.userRole = sessionStorage.getItem('userRole');
  if(this.userRole==='Admin'){
    this.getShowlistdata();
  }
  else{
    this.getShowListByUserId();
  }
}
getShowListByUserId() {
  this.userId = sessionStorage.getItem('userId');
  this.adminservicesService.GetShowsByRole(this.userId).subscribe({
    next: (data) => {
      this.Showads = data as Show[];  
    },
    error: (err) => {
      console.error('Error fetching advertisements:', err);
      alert('Failed to fetch advertisements!');
    },
  });
}
getShowlistdata() {
  this.adminservicesService.GetShows().subscribe({
    next: (data) => {
      this.Showads = data as Show[];    
    },
    error: (err) => {
      console.error('Error fetching advertisements:', err);
      alert('Failed to fetch advertisements!');
    },
  });
}
UopdateChannelsmgmt(data: any) {

    console.log(data.id, "userid");
    console.log(data.showId, "updateadv");
  this.adminservicesService.UpdateShowchannels(data.showId, data).subscribe({
    next: (response) => {
      console.log('Update successful:', response);
      alert('Advertisement updated successfully!');
      this.getInitialData();
    },
    error: (error) => {
      console.error('Error updating advertisement:', error);
      alert('Failed to update advertisement!');
    },
  });
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
  
  this.adminservicesService.DeleteShowevents(item.showId).subscribe((data) => {
    this.getShowlistdata();
  });
}
}