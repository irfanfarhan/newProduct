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
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void { }

  search = () => {
    this.customerService.getProfileDetails(this.searchValue.value).subscribe(data => {
      console.log(data);
      this.profileDetails = data?.result;
      this.loading = false;
    });
  }

  changeProfileSearch = () => {
    if (this.selectedValue === ProfileSearchDropDown[0]) {
      this.searchValue = new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
    } else if (this.selectedValue === ProfileSearchDropDown[1]) {
      this.searchValue = new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$")]);
    }
  }
}