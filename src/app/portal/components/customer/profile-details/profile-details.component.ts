import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, Message } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ProfileDetailModel } from 'src/app/portal/models/customer.model';
import { CustomerService } from 'src/app/portal/services/customers.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class ProfileDetailsComponent implements OnInit {
  @Input() profileDetails: any;
  profileDetailsItems: any;
  actions: any[] = [];
  storedCards: any[] = [];
  creditCards: any[] = [];
  loading: boolean = true;
  orderHistory: any[] = [];
  statuses: any[] = [];
  accountAmounts: any[] = [];
  editProfileForm: FormGroup = this.fb.group({});
  resetPasswordForm: FormGroup = this.fb.group({});
  editSvCardForm: FormGroup = this.fb.group({});
  transferBalanceForm: FormGroup = this.fb.group({});
  addSvCardForm: FormGroup = this.fb.group({});
  editProfileDialog: boolean = false;
  resetPasswordDialog: boolean = false;
  editSvCardDialog: boolean = false;
  transferBalanceDialog: boolean = false;
  addSvCardDialog: boolean = false;
  messageShow: Message[] = [];
  value1: number = 42723;
  listrakOptions: any[] = [];
  listrak: boolean = true;
  whitelist: string = 'approve';
  constructor(private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getProfileDetails();
    this.resetPasswordForm = this.fb.group({
      email: ['', Validators.required],
      resetPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

    this.addSvCardForm = this.fb.group({
      cardNumber: ['', Validators.required],
      pin: ['', Validators.required]
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
    this.statuses = [
      { label: 'Approve', value: 'approve' },
      { label: 'Review', value: 'review' },
      { label: 'Decline', value: 'decline' }
    ];
    this.accountAmounts = [
      { name: '$5' },
      { name: '$10' },
      { name: '$15' },
      { name: '$20' },
      { name: '$25' },
      { name: '$30' },
      { name: '$35' },
      { name: '$40' },
      { name: '$45' },
      { name: '$50' },
      { name: '$55' },
      { name: '$60' },
      { name: '$65' },
      { name: '$70' },
      { name: '$75' },
      { name: '$80' },
      { name: '$85' },
      { name: '$90' },
      { name: '$95' },
      { name: '$100' }
    ];

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
    ];
    this.listrakOptions = [{ label: 'Unsubscribe', value: false }, { label: 'Subscribe', value: true }];
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

  get editProfileFormControl() {
    return this.editProfileForm?.controls;
  }

  getProfileDetails = () => {
    this.editProfileForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      postalcode: new FormControl('', [
        Validators.required,
        Validators.pattern(/[0-9]{5}/)]),
      birthday: ['', Validators.required],
      emailOptIn: ['', Validators.required]
    });
    this.profileDetailsItems = [
      {
        label: 'Edit Profile', icon: 'pi pi-pencil', command: () => {
          this.editProfile();
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
    ];
  }

  editProfile() {
    this.editProfileDialog = true;
    this.profileDetails.birthday = new Date(this.profileDetails.birthday);
    this.editProfileForm.patchValue(this.profileDetails);
  }

  updateProfile() {
    console.log(this.editProfileForm?.getRawValue());
    const payload = new ProfileDetailModel({ ...this.profileDetails, ...this.editProfileForm?.getRawValue() });
    console.log(payload);
    this.customerService.updateProfile(payload).subscribe(data => {
      console.log(data);
      this.profileDetails = data;
      this.loading = false;
      this.messageShow = [
        { severity: 'success', summary: 'Success', detail: `Profile updated successfully`, life: 1000 }
      ];
      setTimeout(() => {
        this.messageShow = [];
      }, 3000);
      this.hideDialog();
    });
  }

  deleteProfile() {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${this.profileDetails?.email}?`,
      header: 'Confirm Account Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.confirmDeleteProfile();
      }
    });
  }

  confirmDeleteProfile = () => {
    this.customerService.deleteProfile(this.profileDetails?.email).subscribe(data => {
      console.log(data);
      this.profileDetails = null;
      this.loading = false;
      this.messageShow = [
        { severity: 'success', summary: 'Success', detail: `Profile has been deleted successfully`, life: 1000 }
      ];
      setTimeout(() => {
        this.messageShow = [];
      }, 3000);
    });
  }

  editSvCard() {
    this.editSvCardDialog = true;
  }

  addSvCard() {
    this.addSvCardDialog = true;
  }

  transferBalance() {
    this.transferBalanceDialog = true;
  }

  resetPassword() {
    this.resetPasswordDialog = true;
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

  refund() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to refund?',
      header: 'Confirm Refund',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageShow = [
          { severity: 'success', summary: 'Success', detail: `Refund successfully`, life: 1000 }
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
    this.addSvCardDialog = false;
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
