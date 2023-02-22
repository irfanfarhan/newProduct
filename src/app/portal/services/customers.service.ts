import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient,
    private router: Router,
    private authService: MsalService) { }

  getProfileDetails(searchValue: any, code: any) {
    return this.http.get<any>('assets/profileDetails.json');
  }

  deleteProfile(email: any) {
    return this.http.get<any>('assets/profileDetails.json');
  }

  updateProfile(payload: any) {
    return this.http.get<any>('assets/profileDetails.json');
  }

  resetPassword(payload: any) {
    return this.http.put<any>('assets/profileDetails.json', payload);
  }

  getOrderHistory(email: any) {
    return this.http.get<any>('assets/orderHistory.json');
  }

  deleteCreditCard(payload: any) {
    return this.http.delete<any>('assets/profileDetails.json', payload);
  }

  getKountStatus(email: any) {
    return this.http.get<any>('assets/profileDetails.json');
  }

  getListrakSubState(email: any) {
    return this.http.get<any>('assets/profileDetails.json');
  }

  updateListrakSubState(data: any) {
    return this.http.post<any>('assets/profileDetails.json', {});
  }

  updateKountStatus(payload: any) {
    return this.http.post<any>('assets/profileDetails.json', payload);
  }

  public logout(): void {
    localStorage.clear();
    this.authService.logoutPopup({
      mainWindowRedirectUri: "/"
    });
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 100);
  }

  handleError(error: HttpErrorResponse) {
    if (error?.status === 401) {
      console.log('logout');
      this.logout();
    }
  }
}

