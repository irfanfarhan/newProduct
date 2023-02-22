import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void { 
    this.searchOption = ProfileSearchDropDown[0].code;
  }

  search = () => {
    this.customerService.getProfileDetails(this.searchValue.value, this.searchOption).subscribe(data => {
      console.log(data);
      this.profileDetails = data;
      this.loading = false;
    });
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