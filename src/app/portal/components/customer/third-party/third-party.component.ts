import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListrakOptions, StatusesDropDown, SuccessMessages } from 'src/app/portal/constants/customer.constants';
import { CustomerService } from 'src/app/portal/services/customers.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

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
  @Output() onErrorMessageEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private customerService: CustomerService, private _loading: LoadingService) { }

  ngOnInit(): void {
    this.getKountStatus();
    this.getListrakSubState();
  }

  getKountStatus = () => {
    this._loading.toggleLoading(true);
    this.customerService.getKountStatus(this.profileDetails?.email).subscribe(data => {
      console.log(data);
      this.whitelist = data?.result?.result ?? 'NA';
      this.loading = false;
      this._loading.toggleLoading(false);
    }), (error: any) => {
      this._loading.toggleLoading(false);
      console.log(error);
      this.loading = false;
      this.customerService.handleError(error);
    };
  }

  getListrakSubState = () => {
    this._loading.toggleLoading(true);
    this.customerService.getListrakSubState(this.profileDetails?.email).subscribe(data => {
      console.log(data);
      this.listrak = data;
      this.loading = false;
      this._loading.toggleLoading(false);
    }), (error: any) => {
      this._loading.toggleLoading(false);
      console.log(error);
      this.loading = false;
      this.customerService.handleError(error);
    };
  }

  selectedListrack = (event: any) => {
    console.log(event);
    const payload = {
      email: this.profileDetails?.email,
      listrak: event?.option.code
    };
    this._loading.toggleLoading(true);
    this.customerService.updateListrakSubState(payload).subscribe(data => {
      if (data?.message) {
        this.onErrorMessageEvent.emit(data?.message);
      } else {
        this.getListrakSubState();
        const message = `${event?.option.value} to listrak`;
        this.onSucessMessageEvent.emit(message);
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

  selectedKount = (event: any) => {
    console.log(event);
    const payload = {
      email: this.profileDetails?.email,
      SelectedStatus: event?.option.code
    };
    this._loading.toggleLoading(true);
    this.customerService.updateKountStatus(payload).subscribe(data => {
      if (data?.message) {
        this.onErrorMessageEvent.emit(data?.message);
      } else {
        this.getKountStatus();
        const message = `${SuccessMessages.KountUpdateSuccessMessage} ${event?.option.label}`;
        this.onSucessMessageEvent.emit(message);
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
}
