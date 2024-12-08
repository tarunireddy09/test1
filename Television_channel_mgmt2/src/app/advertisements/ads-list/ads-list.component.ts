import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminservicesService } from 'src/app/Services/adminservices.service';
import { Advertiesment } from 'src/app/Models/Advertiesment';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent {

advertisements: any;
  encryptServices: any;
  stateArr: Advertiesment[] = [];
  advertiemnetid :string='';
  userid: any = "";

  UpdateAds :any[]=[];
  loading: string="";
  errorMessage: string | undefined;

constructor(private http: HttpClient, private router: Router, private adminservicesService: AdminservicesService) {}
addadvertiesment: Advertiesment = new Advertiesment();


userId:any;

userRole: string | null = null;
ngOnInit() {
  this.getInitialRefreshData(); 
}
getInitialRefreshData(){
  this.userRole = sessionStorage.getItem('userRole');
  if(this.userRole==='Admin'){
    this.fetchAdvertisements();
  }
  else{
    this.getAdvByUserId();
  }
}
getAdvByUserId() {
  this.userId = sessionStorage.getItem('userId');
  this.adminservicesService.GetAdvByUserId(this.userId).subscribe({
    next: (data) => {
      this.advertisements = data; 
      console.log('Advertisements fetched:', this.advertisements);
      
    },
    error: (err) => {
      console.error('Error fetching advertisements:', err);
      alert('Failed to fetch advertisements!');
    },
  });
}
fetchAdvertisements() {
  this.adminservicesService.GetAdvertiesment().subscribe({
    next: (data) => {
      this.advertisements = data; 
      console.log('Advertisements fetched:', this.advertisements);
    },
    error: (err) => {
      console.error('Error fetching advertisements:', err);
      alert('Failed to fetch advertisements!');
    },
  });
}
UpdateAdvertiement(data:any) {
  console.log(data, "Data");
  console.log(this.userid, "userid");
  console.log(this.addadvertiesment, "updateadv");
  this.adminservicesService.UpdateAdvertiesment(data.advertisementId, data).subscribe({
    next: (response) => {
      console.log('Update successful:', response);
      alert('Advertisement updated successfully!');
      this.getInitialRefreshData();
    },
    error: (error) => {
      console.error('Error updating advertisement:', error);
      alert('Failed to update advertisement!');
    },
  });
}


cancelEdit(item: any) {
  item.isEditing = false;
  item.editable = !item.editable;
  this.fetchAdvertisements();
}

Editmandalmaster(item: any) {
  item.isEditing = true;
  item.editable = !item.editable;
}


DeleteSelectedAdvId(item:any) {
  this.adminservicesService.DeleteAdvertiesment(item.advertisementId).subscribe({
    next: (response) => {
      console.log('Deleted successful:', response);
      alert('Advertisement deleted successfully!');
      this.getInitialRefreshData();
    },
    error: (error) => {
      console.error('Error deleting advertisement:', error);
      alert('Failed to delete advertisement!');
    },
  });

  
}
isAlphabetic(inputString: string): boolean {
  const alphabeticRegex = /^[a-zA-Z ]+$/;
  return alphabeticRegex.test(inputString);
}
}

