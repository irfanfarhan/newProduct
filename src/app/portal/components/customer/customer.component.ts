import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, Message, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CustomerService } from '../../services/customers.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [DialogService, ConfirmationService]
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
  statuses: any[] = [];
  editProfileForm: FormGroup = this.fb.group({});
  resetPasswordForm: FormGroup = this.fb.group({});
  editSvCardForm: FormGroup = this.fb.group({});
  transferBalanceForm: FormGroup = this.fb.group({});
  whitelistForm: FormGroup = this.fb.group({});
  editProfileDialog: boolean = false;
  resetPasswordDialog: boolean = false;
  editSvCardDialog: boolean = false;
  transferBalanceDialog: boolean = false;
  whitelistDialog: boolean = false;
  messageShow: Message[] = [];
  value1: number = 42723;
  constructor(private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.editProfileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      zip: ['', Validators.required],
      bod: ['', Validators.required]
    });
    this.resetPasswordForm = this.fb.group({
      email: ['', Validators.required],
      resetPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
    this.editSvCardForm = this.fb.group({
      cardNumber: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      automaticallyReload: ['', Validators.required],
      account: ['', Validators.required]
    });
    this.transferBalanceForm = this.fb.group({
      toCardNumber: ['', Validators.required],
      fromCardNumber: ['', Validators.required],
      fromPin: ['', Validators.required]
    });
    this.whitelistForm = this.fb.group({
      status: ['', Validators.required]
    });
    this.pCategory = [
      { name: 'Email' },
      { name: 'Loyalty Card' },
      { name: 'Restaurants' }
    ];
    this.statuses = [
      { name: 'Approve' },
      { name: 'Decline' }
    ];
    this.items = [
      {
        label: 'Edit Profile', icon: 'pi pi-pencil', command: () => {
          this.editProfile();
        }
      },
      {
        label: 'Subscribe to Listrak', icon: 'pi pi-external-link', command: () => {
          this.unsubscribeProfile();
        }
      },
      {
        label: 'Reset Password', icon: 'pi pi-cog', command: () => {
          this.resetPassword();
        }
      },
      {
        label: 'Delete Profile', icon: 'pi pi-trash', command: () => {
          this.deleteProfile();
        }
      }
    ]
    this.actions = [
      {
        label: 'Edit', icon: 'pi pi-pencil', command: () => {
          this.editSvCard();
        }
      },
      {
        label: 'Delete', icon: 'pi pi-trash', command: () => {
          this.deleteStoredCard();
        }
      },
      {
        label: 'Transfer balance to this card', icon: 'pi pi-credit-card', command: () => {
          this.transferBalance();
        }
      }
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

  editSvCard() {
    this.editSvCardDialog = true;
  }

  transferBalance() {
    this.transferBalanceDialog = true;
  }

  resetPassword() {
    this.resetPasswordDialog = true;
  }

  Whitelist(){
    this.whitelistDialog = true;
  }

  deleteProfile() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete JohnSmith@gmail.com?',
      header: 'Confirm Account Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageShow = [
          { severity: 'success', summary: 'Success', detail: `JohnSmith@gmail.com deleted successfully`, life: 1000 }
        ];
        setTimeout(() => {
          this.messageShow = [];
        }, 3000);
      }
    });
  }

  deleteStoredCard() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageShow = [
          { severity: 'success', summary: 'Success', detail: `Card deleted successfully`, life: 1000 }
        ];
        setTimeout(() => {
          this.messageShow = [];
        }, 3000);
      }
    });
  }

  unsubscribeProfile() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Unsubscribe?',
      header: 'Confirm Unsubscribe',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageShow = [
          { severity: 'success', summary: 'Success', detail: `Unsubscribe successfully`, life: 1000 }
        ];
        setTimeout(() => {
          this.messageShow = [];
        }, 3000);
      }
    });
  }

  hideDialog() {
    this.editProfileDialog = false;
    this.resetPasswordDialog = false;
    this.editSvCardDialog = false;
    this.transferBalanceDialog = false;
    this.whitelistDialog = false;
  }

  get form() {
    return this.editProfileForm?.controls;
  }

  submit() {
    console.log(this.editProfileForm?.getRawValue());
    this.hideDialog();
  }

  reset() {
    console.log(this.resetPasswordForm?.getRawValue());
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