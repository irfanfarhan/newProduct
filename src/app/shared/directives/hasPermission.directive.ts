import {
    Directive,
    Input,
    TemplateRef,
    ViewContainerRef,
    OnInit
} from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Directive({
    selector: '[hasPermission]'
})
export class HasPermissionDirective implements OnInit {
    roles: any;
    permissions = [];
    logicalOp = 'AND';
    isHidden = true;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authService: MsalService
    ) {

    }

    ngOnInit() {
        this.roles = {
            "roles": [
                "customer-service",
                "olo-admin",
                "customer-service-admin"
            ]
        }
        let activeAccount = this.authService.instance.getActiveAccount();
        this.updateView();
    }

    @Input()
    set hasPermission(val: any) {
        this.permissions = val;
        this.updateView();
    }

    @Input()
    set hasPermissionOp(permop: any) {
        this.logicalOp = permop;
        this.updateView();
    }

    private updateView() {
        if (this.checkPermission()) {
            if (this.isHidden) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                this.isHidden = false;
            }
        } else {
            this.isHidden = true;
            this.viewContainer.clear();
        }
    }

    private checkPermission() {
        let hasPermission = false;

        if (this.roles?.roles?.length > 0) {
            for (const checkPermission of this.permissions) {
                const permissionFound = this.roles?.roles.find((x: any) => x === checkPermission);

                if (permissionFound) {
                    hasPermission = true;

                    if (this.logicalOp === 'OR') {
                        break;
                    }
                } else {
                    hasPermission = false;
                    if (this.logicalOp === 'AND') {
                        break;
                    }
                }
            }
        }

        return hasPermission;
    }
}
