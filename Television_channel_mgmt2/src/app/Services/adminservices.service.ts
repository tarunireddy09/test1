import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/Users';

import { Observable } from 'rxjs';
import { Logindetails } from '../Models/loginrequest';
import { Show } from '../Models/Shows';
import { Advertiesment } from '../Models/Advertiesment';

@Injectable({
  providedIn: 'root'
})

export class AdminservicesService {
  constructor(private httpClient: HttpClient) {}

  private Rest_API_SERVER = 'https://localhost:44387/api/Login';
  private Rest_API_SERVER1 = 'https://localhost:44387/api/User'; 
  private Rest_API_SERVER2 = 'https://localhost:44387/api/Show'; 
  private Rest_API_DeleteAdvId='https://localhost:44387/api/DeleteAdvertiser';
  private Rest_API_SERVER3='https://localhost:44387/api/Adverties';

  public GetUsers() {
    return this.httpClient.get(this.Rest_API_SERVER1 +'/GetUsers');
  }
  public Postlogindeatils(loginrequest: Logindetails) {
    return this.httpClient.post(
      this.Rest_API_SERVER + '/login',loginrequest
    );
  }
  public PostRegsiter(adduser: User) {
    return this.httpClient.post(
      this.Rest_API_SERVER1 + '/register' ,adduser
    );
  }
  PostRegsiter2(user: User) {
    return this.httpClient.post(this.Rest_API_SERVER1 + '/register', user, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  public UpdateRegister( userid:string, adduser: User) {
       return this.httpClient.put(
         this.Rest_API_SERVER1 +'/id=' + userid, adduser );
     }
  public DeleteRegister(userid: string) {
    return this.httpClient.delete(
      this.Rest_API_SERVER1 + '/id=' + userid);
  }
  public GetShows() {
    return this.httpClient.get(this.Rest_API_SERVER2 + '/Show');
  }
  public GetShowsByUserId(id:number) {
    return this.httpClient.get(this.Rest_API_SERVER2 + '/byuser' + '/' + id) ;
  }
  public GetShowsByRole(id:number) {
      return this.httpClient.get(this.Rest_API_SERVER2 + '/getShowsByRole' + '/' + id) ;
    }
  public PostShowChannels(addshows: Show) {
    return this.httpClient.post(
      this.Rest_API_SERVER2 + '/PostShows' ,addshows
    );
  }

  public UpdateShowchannels( id:number, addshows: Show) {
   const url = `${this.Rest_API_SERVER2}/${id}`;
   return this.httpClient.put(url, addshows);
     }
  public DeleteShowevents(id: number) {
    return this.httpClient.delete(
      this.Rest_API_SERVER2 + '/deleteShow/' + id);   
  }
  public GetAdvertiesment() {
    return this.httpClient.get(this.Rest_API_SERVER3 + '/getadvertiser');
  }
  public PostAdvertiesment(addadvertiesment: Advertiesment){
    return this.httpClient.post(
      this.Rest_API_SERVER3 + '/postAdvertiesment' ,addadvertiesment
    );
  }
  public GetAdvByUserId(id:number) {  
      return this.httpClient.get(this.Rest_API_SERVER3 + '/getAdvById' + '/' + id) ;
    }
    public UpdateAdvertiesment(id: number, addadvertiesment: Advertiesment) {
      const url = `${this.Rest_API_SERVER3}/${id}`;
      return this.httpClient.put(url, addadvertiesment);
    }
    public UpdateAdvertiesmentdata( userid:string, adduser: Show) {
          return this.httpClient.put(
            this.Rest_API_SERVER1 +'/id=' + userid, adduser );
        }
  public DeleteAdvertiesment(advertied: number) {   
    console.log(advertied);
    return this.httpClient.delete(
      this.Rest_API_SERVER3 + '/DeleteAdvertiser/' + advertied);   
  }
}
  