import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { LoginComponent } from './auth/login/login.component';
//import { AddUserComponent } from './users/add-user/add-user.component';
//import { UsersListComponent } from './users/users-list/users-list.component';

import { ShowsListComponent } from './shows/shows-list/shows-list.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdmindashbaordComponent } from './admindashbaord/admindashbaord.component';
import { Advertiesment } from './Models/Advertiesment';
import { AdvertisementsRoutingModule } from './advertisements/advertisements-routing.module';
import { AddAdComponent } from './advertisements/add-ad/add-ad.component';
import { AdsListComponent } from './advertisements/ads-list/ads-list.component';
import { AddShowComponent } from './shows/add-show/add-show.component';
//import { AdvertiesmentdashboardComponent } from './advertiesmentdashboard/advertiesmentdashboard.component';
//import { ChanneldashbaordComponent } from './channeldashbaord/channeldashbaord.component';
//import { AdminlayoutComponent } from './adminlayout/adminlayout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: AdmindashbaordComponent,
    children: [
      { path: 'addadvertiesment', component: AddAdComponent },
      { path: 'advertiesmentlist', component: AdsListComponent },
      { path: 'Channeldata', component: AddShowComponent },
      { path: 'Channelist', component: ShowsListComponent },
      { path: '', redirectTo: 'addadvertiesment', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
