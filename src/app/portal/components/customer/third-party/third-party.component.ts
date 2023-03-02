import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListrakOptions, StatusesDropDown, SuccessMessages } from 'src/app/portal/constants/customer.constants';
import { CustomerService } from 'src/app/portal/services/customers.service';

@Component({
  selector: 'app-third-party',
  templateUrl: './third-party.component.html',
  styleUrls: ['./third-party.component.scss']
})
export class ThirdPartyComponent implements OnInit {
  @Input() profileDetails: any;
  listrakOptions: any[] = ListrakOptions;
  statuses: any[] = StatusesDropDown;
  listrak: any;
  whitelist: any;
  loading: boolean = true;
  @Output() onSucessMessageEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getKountStatus();
    this.getListrakSubState();
  }

  getKountStatus = () => {
    //this.customerService.getKountStatus(this.profileDetails?.email).subscribe(data => {
    // console.log(data);
    const data1 = {
      "result": {
        "result": "review"
      }
    };
    this.whitelist = data1?.result?.result ?? 'NA';
    this.loading = false;
    //});
  }

  getListrakSubState = () => {
    //this.customerService.getListrakSubState(this.profileDetails?.email).subscribe(data => {
    // console.log(data);
    this.listrak = 'Subscribed';
    this.loading = false;
    //});
  }

  selectedListrack = (event: any) => {
    console.log(event);
    const payload = {
      email: this.profileDetails?.email,
      listrak: event?.option.code
    }
    //this.customerService.updateListrakSubState(payload).subscribe(data => {
    // console.log(data);
    this.loading = false;
    this.onSucessMessageEvent.emit(SuccessMessages.UpdateListrackSuccessMessage);
    //});
  }

  selectedKount = (event: any) => {
    console.log(event);
    const payload = {
      email: this.profileDetails?.email,
      SelectedStatus: event?.option.code
    }
    //this.customerService.updateKountStatus(payload).subscribe(data => {
    // console.log(data);
    this.loading = false;
    this.onSucessMessageEvent.emit(SuccessMessages.KountUpdateSuccessMessage);
    //});
  }
}
