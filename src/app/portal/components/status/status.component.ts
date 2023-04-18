import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  peetsAPI: any;
  oloData: any;
  oktaData: any;
  paytronixData: any;
  chaseData: any;
  shopifyData: any;
  data = {
    "data": [
      {
        "id": 1000,
        "name": "Get Profile",
        "status": "Good",
        "representative": {
          "name": "Credit Create Account",
        }
      },
      {
        "id": 1001,
        "name": "Add Credit Card",
        "status": "Good",
        "representative": {
          "name": "Card",
        }
      },
      {
        "id": 1002,
        "name": "Reload Loyalty Card",
        "status": "Critical",
        "representative": {
          "name": "Loyalty Card",
        }
      },
      {
        "id": 1003,
        "name": "MOA Order Submit",
        "status": "Critical",
        "representative": {
          "name": "Loyalty Card",
        }
      },
      {
        "id": 1004,
        "name": "OLO Get Profile",
        "status": "Good",
        "representative": {
          "name": "OLO",
        }
      },
      {
        "id": 1005,
        "name": "OLO Get/Create User",
        "status": "Good",
        "representative": {
          "name": "OLO",
        }
      },
      {
        "id": 1006,
        "name": "Submit Tips",
        "status": "Critical",
        "representative": {
          "name": "OLO",
        }
      },
    ]
  };
  constructor() { }

  ngOnInit(): void {
    this.peetsAPI = this.data.data;
    this.oloData = [
      {
        "id": 1000,
        "name": "MOA Order Submit",
        "status": "Good"
      },
      {
        "id": 1001,
        "name": "OLO Get Profile",
        "status": "Good"
      },
      {
        "id": 1002,
        "name": "OLO Get/Create user",
        "status": "Critical"
      }
    ];
    this.oktaData = [
      {
        "id": 1000,
        "name": "Get Access Token",
        "status": "Good"
      },
      {
        "id": 1001,
        "name": "Refresh Token",
        "status": "Good"
      },
      {
        "id": 1002,
        "name": "Reset Password",
        "status": "Critical"
      }
    ];
    this.paytronixData = [
      {
        "id": 1000,
        "name": "Add/Reedem loyalty card",
        "status": "Good"
      },
      {
        "id": 1001,
        "name": "Create Loyalty Card",
        "status": "Good"
      }
    ];
    this.chaseData = [
      {
        "id": 1000,
        "name": "Get Credit card token",
        "status": "Good"
      },
      {
        "id": 1001,
        "name": "Authorize card",
        "status": "Good"
      },
      {
        "id": 1001,
        "name": "Card settlement",
        "status": "Critical"
      }
    ];
    this.shopifyData = [
      {
        "id": 1000,
        "name": "Webhooks",
        "status": "Good"
      },
      {
        "id": 1001,
        "name": "Get customer profile",
        "status": "Good"
      }
    ]
  }
}
