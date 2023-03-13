import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, Message } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SuccessMessages } from 'src/app/portal/constants/customer.constants';
import { ProfileDetailModel } from 'src/app/portal/models/customer.model';
import { CustomerService } from 'src/app/portal/services/customers.service';
import { CustomValidators } from 'src/app/shared/pipes/custom-validators';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class ProfileDetailsComponent implements OnInit {
  @Input() profileDetails: any;
  profileDetailsItems: any;
  loading: boolean = true;
  editProfileForm: FormGroup = this.fb.group({});
  resetPasswordForm: FormGroup = this.fb.group({});
  editProfileDialog: boolean = false;
  resetPasswordDialog: boolean = false;
  selectedTabIndex = 0;
  messageShow: Message[] = [];
  @Output() getProfilesEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private fb: FormBuilder, private _loading: LoadingService,
    private confirmationService: ConfirmationService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getProfileDetails();
    this.getResetPasswordForm();
    this.loading = false;
  }

  getProfileDetails = () => {
    this.editProfileForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phone: new FormControl('', [
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      postalcode: new FormControl('', [
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

  get editProfileFormControl() {
    return this.editProfileForm?.controls;
  }

  getResetPasswordForm = () => {
    this.resetPasswordForm = this.fb.group({
      email: new FormControl('', [
        Validators.required]),
      password: [
        null,
        Validators.compose([
          Validators.required,
          CustomValidators.patternValidator(/\d/, {
            hasNumber: true
          }),
          CustomValidators.patternValidator(/[a-z]/, {
            hasSmallCase: true
          }),
          Validators.minLength(6)
        ])
      ],
      confirmPassword: [null, Validators.compose([Validators.required])]
    },
      {
        validator: CustomValidators.passwordMatchValidator
      });
  }

  get resetPasswordFormControl() {
    return this.resetPasswordForm?.controls;
  }

  editProfile() {
    this.editProfileDialog = true;
    this.profileDetails.birthday = new Date(this.profileDetails.birthday);
    this.editProfileForm.patchValue(this.profileDetails);
  }

  updateProfile() {
    const payload = new ProfileDetailModel({ ...this.profileDetails, ...this.editProfileForm?.getRawValue() });
    this._loading.toggleLoading(true);
    this.customerService.updateProfile(payload).subscribe(data => {
      if (data?.message) {
        this.onErrorMessage(data?.message);
      } else {
        this.profileDetails = data;
        this.onSucessMessage(SuccessMessages.ProfileUpdateSuccessMessage);
      }
      this.loading = false;
      this.hideDialog();
      this._loading.toggleLoading(false);
    }), (error: any) => {
      this._loading.toggleLoading(false);
      console.log(error);
      this.loading = false;
      this.customerService.handleError(error);
    };
  }

  resetPassword() {
    this.resetPasswordDialog = true;
    this.resetPasswordForm.reset();
    this.resetPasswordFormControl['email'].setValue(this.profileDetails.email);
  }

  updateProfilePassword() {
    const payload = this.resetPasswordForm?.getRawValue();
    this._loading.toggleLoading(true);
    this.customerService.resetPassword(payload).subscribe(data => {
      if (data?.message) {
        this.onErrorMessage(data?.message);
      } else {
        this.onSucessMessage(SuccessMessages.ProfilePasswordSuccessMessage);
      }
      this.loading = false;
      this.hideDialog();
      this._loading.toggleLoading(false);
    }), (error: any) => {
      this._loading.toggleLoading(false);
      console.log(error);
      this.loading = false;
      this.customerService.handleError(error);
    };
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
    this._loading.toggleLoading(true);
    this.customerService.deleteProfile(this.profileDetails?.email).subscribe(data => {
      if (data?.message) {
        this.onErrorMessage(data?.message);
      } else {
        this.profileDetails = null;
        this.onSucessMessage(SuccessMessages.ProfileDeleteSuccessMessage);
      }
      this.loading = false;
      this._loading.toggleLoading(false);
    }), (error: any) => {
      this._loading.toggleLoading(false);
      console.log(error);
      this.loading = false;
      this.customerService.handleError(error);
    };
  }

  hideDialog() {
    this.editProfileDialog = false;
    this.resetPasswordDialog = false;
  }

  handleChange(e: any) {
    this.selectedTabIndex = e.index;
  }

  onSucessMessage = (message: any) => {
    this.messageShow = [
      { severity: 'success', summary: 'Success', detail: message, life: 1000 }
    ];
    const el: any = document.getElementById('mainId');
    el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    setTimeout(() => {
      this.messageShow = [];
    }, 30000);
    this.getProfilesEvent.emit(true);
  }

  onErrorMessage = (message: any) => {
    this.messageShow = [
      { severity: 'error', summary: 'Error', detail: message, life: 1000 }
    ];
    const el: any = document.getElementById('mainId');
    el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    setTimeout(() => {
      this.messageShow = [];
    }, 30000);
  }
}
