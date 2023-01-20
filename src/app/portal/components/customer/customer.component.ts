import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  creditCards: any[] = [];
  loading: boolean = true;
  orderHistory: any[] = [];
  kountAction: any[] = [];
  editProfileForm: FormGroup = this.fb.group({});
  editProfileDialog: boolean = false;
  constructor(private fb: FormBuilder, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.editProfileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.pCategory = [
      { name: 'Email' },
      { name: 'Loyalty Card' },
      { name: 'Restaurant' }
    ];
    this.items = [
      {
        label: 'Edit Profile', icon: 'pi pi-pencil', command: () => {
          this.editProfile();
        }
      },
      { label: 'Subscribe to Listrak', icon: 'pi pi-external-link' },
      { label: 'Reset Password', icon: 'pi pi-cog' },
      { label: 'Delete Profile', icon: 'pi pi-trash' }
    ]
    this.actions = [
      { label: 'Edit', icon: 'pi pi-pencil' },
      { label: 'Delete', icon: 'pi pi-trash' },
      { label: 'Transfer balance to this card', icon: 'pi pi-credit-card' }
    ]
    this.kountAction = [
      { label: 'Whitelist', icon: 'pi pi-pencil' }
    ]
    this.customerService.getStoredCards().subscribe(data => {
      this.storedCards = data;
      this.loading = false;
    });
    this.customerService.getCreditCards().subscribe(data => {
      this.creditCards = data;
      this.loading = false;
    });
    this.customerService.getOrderHistory().subscribe(data => {
      this.orderHistory = data;
      this.loading = false;
    });
  }

  editProfile() {
    this.editProfileDialog = true;
  }

  hideDialog() {
    this.editProfileDialog = false;
  }

  get form() {
    return this.editProfileForm?.controls;
  }

  submit() { 
    console.log(this.editProfileForm?.getRawValue());
    this.hideDialog();
  }

  onRowSelect(event: any) {

  }

  onRowUnselect(event: any) {
  }
}


interface Category {
  name: string,
}