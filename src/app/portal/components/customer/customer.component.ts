import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent implements OnInit {
  pCategory: Category[] | undefined;
  selectedCategory: Category | undefined;
  value3: string | undefined;
  loading = [false, false, false, false];
  items: MenuItem[] | undefined;
  constructor() { }

  ngOnInit(): void {
    this.pCategory = [
      { name: 'Email'},
      { name: 'Loyalty Card'},
      { name: 'Restaurant'}
    ];
    this.items = [{
          label: 'Edit Profile'
          
      },
      {
          label: 'Subscribe to Listrak'
          
      },
      {
        label: 'Reset Password'
        
    },
    {
        label: 'Delete Profile'
        
    } 
        
      ]}

}
  

interface Category {
  name: string,
}