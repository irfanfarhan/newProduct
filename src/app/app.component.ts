import { Component, OnInit } from '@angular/core';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService) { }

  ngOnInit(): void {
    // this.msalBroadcastService.msalSubject$
    //   .pipe(
    //     filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
    //   )
    //   .subscribe((result: EventMessage) => {
    //     console.log(result);
    //     const payload = result.payload as AuthenticationResult;
    //     localStorage.setItem('token', `Bearer ${payload.accessToken}`);
    //     this.authService.instance.setActiveAccount(payload.account);
    //     if (result?.interactionType === 'redirect') {
    //       this.router.navigate(['/portal/customer']);
    //     }
    //   });
      
    // console.log(document.location);
    // console.log(this.authService.instance.getActiveAccount());
    // if(this.authService.instance.getActiveAccount() && document.location?.pathname === '/'){
    //   this.router.navigate(['/portal/customer']);
    // }
  }
}
