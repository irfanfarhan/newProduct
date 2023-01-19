import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CustomerService } from '../../services/customers.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent implements OnInit {
  pCategory: Category[] | undefined;
  selectedCategory: Category | undefined;
  value3: string | undefined;
  items: MenuItem[] | undefined;
  actions: any[] = [];
  storedCards: any[] = [];
  loading: boolean = true;
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.pCategory = [
      { name: 'Email' },
      { name: 'Loyalty Card' },
      { name: 'Restaurant' }
    ];
    this.items = [
      { label: 'Edit Profile' },
      { label: 'Subscribe to Listrak' },
      { label: 'Reset Password' },
      { label: 'Delete Profile' }
    ]
    this.actions = [
      { label: 'Edit' },
      { label: 'Delete' },
      { label: 'Transfer balance to this card' }
    ]
    this.customerService.getStoredCards().subscribe(data => {
      this.storedCards = data;
      this.loading = false;
    });
  }

  onRowSelect(event: any) {

  }

  onRowUnselect(event: any) {
  }
}


interface Category {
  name: string,
}