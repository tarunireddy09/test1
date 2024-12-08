import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { ShowsListComponent } from './shows/shows-list/shows-list.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddAdComponent } from './advertisements/add-ad/add-ad.component';
import { AdsListComponent } from './advertisements/ads-list/ads-list.component';

import { MatCardModule } from '@angular/material/card';

import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { AdmindashbaordComponent } from './admindashbaord/admindashbaord.component';
import { AddShowComponent } from './shows/add-show/add-show.component';
import { AdvertiesmentdashboardComponent } from './advertiesmentdashboard/advertiesmentdashboard.component';
import { ChanneldashbaordComponent } from './channeldashbaord/channeldashbaord.component';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
   
    ShowsListComponent,
    RegisterComponent,
    AdmindashbaordComponent,
    AddAdComponent,
    AdsListComponent,
  AddShowComponent,
  AdvertiesmentdashboardComponent,
  ChanneldashbaordComponent,
  LayoutComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule, 
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FormsModule ,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
