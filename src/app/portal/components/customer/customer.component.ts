import { Component, OnInit } from '@angular/core';
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
  searchValue: any;
  profileDetails: any;
  loading: boolean = true;
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void { }

  search = () => {
    console.log(this.searchValue);
    this.customerService.getProfileDetails(this.searchValue).subscribe(data => {
      console.log(data);
      this.profileDetails = data?.result;
      this.loading = false;
    });
  }
}