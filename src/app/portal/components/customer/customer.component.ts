import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ProfileSearchDropDown } from '../../constants/customer.constants';
import { CustomerService } from '../../services/customers.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent implements OnInit {
  profileSearchValues: any = ProfileSearchDropDown;
  selectedValue: any;
  searchValue = new FormControl('', [
    Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  profileDetails: any;
  loading: boolean = true;
  searchOption: any;
  messageShow: Message[] = [];
  constructor(private customerService: CustomerService, private _loading: LoadingService) { }

  ngOnInit(): void {
    this.searchOption = ProfileSearchDropDown[0].code;
  }

  search = () => {
    this._loading.toggleLoading(true);
    this.profileDetails = null;
    this.customerService.getProfileDetails(this.searchValue.value, this.searchOption).subscribe(data => {
      if (data?.message) {
        this.errorMessage(data?.message);
      } else {
        this.profileDetails = data;
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

  errorMessage = (message: any) => {
    this.messageShow = [
      { severity: 'error', summary: 'Error', detail: message, life: 1000 }
    ];
    const el: any = document.getElementById('mainId');
    el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    setTimeout(() => {
      this.messageShow = [];
    }, 3000);
  }

  changeProfileSearch = () => {
    console.log(this.selectedValue);
    if (this.selectedValue === ProfileSearchDropDown[0].label) {
      this.searchOption = ProfileSearchDropDown[0].code;
      this.searchValue = new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
    } else if (this.selectedValue === ProfileSearchDropDown[1].label) {
      this.searchOption = ProfileSearchDropDown[1].code;
      this.searchValue = new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$")]);
    }
  }
}