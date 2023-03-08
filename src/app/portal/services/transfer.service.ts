import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  apiBaseUrl: string;

  constructor(private http: HttpClient, 
    private router: Router,
    private authService: MsalService) { 
    this.apiBaseUrl = window.location.origin;
  }

  getTransferBalance(form: any) {
    return this.http.get<any>('assets/profileDetails.json');
  }

  transferBalance(payload: any) {
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