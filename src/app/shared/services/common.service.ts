import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  roles: any;

  constructor() { }

  checkPermission(permissions: any) {
    let hasPermission = false;
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
