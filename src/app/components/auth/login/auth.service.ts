import { Injectable, EventEmitter } from '@angular/core';
import { LoginData } from 'src/app/models/login-data.model';
import { AdminData } from 'src/app/models/admin-data.model';
import { AdminUpdateAuthEventFeedbackRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  adminData: AdminData = {userName: '', isLoggedIn: false};
  adminDataChanged = new EventEmitter<AdminData>();

  constructor(
    private router: Router
  ) { }

  login(loginData: LoginData) {
    console.log(loginData.userName);
    if(loginData.userName === 'guus' && loginData.passWord === '123') {
      console.log('cigar');
      this.adminData.userName = loginData.userName;
      this.adminData.isLoggedIn = true;
      localStorage.setItem('engelbewaarder-admin-admindata', JSON.stringify(this.adminData));
      this.adminDataChanged.emit(this.adminData);
      this.router.navigate(['/overview']);
    } else {
      console.log('no cigar');
    }
  }

  fetchAdminData() {
    if(this.adminData.userName !== '' && this.adminData.isLoggedIn !== false) {
      // this.adminDataChanged.emit(this.adminData);
      return this.adminData;
    } else if (JSON.parse(localStorage.getItem('engelbewaarder-admin-admindata')) !== null) {
      // this.adminDataChanged.emit(this.adminData);
      return JSON.parse(localStorage.getItem('engelbewaarder-admin-admindata'));
    } else {
      // this.adminDataChanged.emit(this.adminData);
      return new AdminData('', false);
    } 
  }
  
  getAdminData() {
    this.adminData  = this.fetchAdminData();
    this.adminDataChanged.emit(this.adminData);
  }
  logOut() {
    this.adminData = new AdminData('', false);
    this.adminDataChanged.emit(this.adminData);
    localStorage.setItem('engelbewaarder-admin-admindata', JSON.stringify(this.adminData));
    this.router.navigate(['/home']);
  }
  
}
