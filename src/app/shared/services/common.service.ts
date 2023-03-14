import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  roles: any;

  constructor(private authService: MsalService) { }

  checkPermission(permissions: any) {
    let hasPermission = false;
    let activeAccount = this.authService.instance.getActiveAccount();
    this.roles = {
      "roles": [
        "customer-service",
        "olo-admin",
        "customer-service-admin"
      ]
    }
    if (this.roles?.roles?.length > 0) {
      for (const checkPermission of permissions) {
        const permissionFound = this.roles?.roles.find((x: any) => x === checkPermission);

        if (permissionFound) {
          hasPermission = true;
        } else {
          hasPermission = false;
        }
      }
    }
    return hasPermission;
  }
}
