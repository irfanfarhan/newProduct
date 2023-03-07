import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { SuccessMessages } from 'src/app/portal/constants/customer.constants';
import { CustomerService } from 'src/app/portal/services/customers.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
  providers: [ConfirmationService]
})
export class OrderHistoryComponent implements OnInit {
  orderHistory: any[] = [];
  loading: boolean = true;
  @Input() email: any;
  @Input() profileDetails: any;
  @Output() onSucessMessageEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private customerService: CustomerService,
    private confirmationService: ConfirmationService, private _loading: LoadingService) { }

  ngOnInit(): void {
    this.getOrderHistory();
  }

  getOrderHistory = () => {
    this._loading.toggleLoading(true);
    this.customerService.getOrderHistory(this.email).subscribe(data => {
      this.orderHistory = data;
      this.loading = false;
      this._loading.toggleLoading(false);
    }), (error: any) => {
      this._loading.toggleLoading(false);
      console.log(error);
      this.loading = false;
      this.customerService.handleError(error);
    };
  }

  refund(order: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to refund?',
      header: 'Confirm Refund',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.confirmRefund(order);
      }
    });
  }

  confirmRefund = (order: any) => {
    const payload = {
      uuid: order?.customerUuid,
      txRefNum: order?.authReference,
      amount: order?.amount,
      orderID: order?.salesId,
      svCard: order?.storedValueNumber
    };
    this._loading.toggleLoading(true);
    this.customerService.refundOder(payload).subscribe(data => {
      console.log(data);
      this.loading = false;
      this._loading.toggleLoading(false);
      this.onSucessMessageEvent.emit(SuccessMessages.RefundSuccessMessage);
    }), (error: any) => {
      this._loading.toggleLoading(false);
      console.log(error);
      this.loading = false;
      this.customerService.handleError(error);
    };
  }
}
