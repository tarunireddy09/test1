import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admindashbaord',
  templateUrl: './admindashbaord.component.html',
  styleUrls: ['./admindashbaord.component.css']
})
export class AdmindashbaordComponent {
  userRole: string | null = null;
  @Input() receivedData: any = '';
  constructor(){}
  ngOnInit() {
    this.userRole = sessionStorage.getItem('userRole');
  }

  title = 'Television_Mgmt';
  randomName(receivedData:any) {
    receivedData.toggle();
}

}
