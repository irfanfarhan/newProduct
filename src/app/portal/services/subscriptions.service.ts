import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  constructor(private http: HttpClient,
    private router: Router,
    private authService: MsalService) { }

  getSubscriptions() {
    const url = environment.apiSubscriptionUrl;
    return this.http.get<any>(url);
  }

  getProducts(subscription_id: any) {
    const url = environment.apiSubscriptionUrl + `/${subscription_id}`;
    return this.http.get<any>(url);
  }

  editProducts(subscription_id: any, payload: any) {
    const url = environment.apiSubscriptionUrl + `/${subscription_id}`;
    return this.http.put<any>(url, payload);
  }

  deleteProducts(subscription_id: any, payload: any) {
    const url = environment.apiSubscriptionUrl + `/${subscription_id}`;
    return this.http.delete<any>(url, { body: payload });
  }

  getProductList() {
    const url = environment.apibaseUrl + `/products`;
    return this.http.get<any>(url);
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

