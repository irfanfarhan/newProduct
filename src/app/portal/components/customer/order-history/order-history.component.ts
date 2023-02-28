import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/api';
import { SuccessMessages } from 'src/app/portal/constants/customer.constants';
import { CustomerService } from 'src/app/portal/services/customers.service';

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
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getOrderHistory();
  }

  getOrderHistory = () => {
    this.customerService.getOrderHistory(this.email).subscribe(data => {
      this.orderHistory = data;
      this.loading = false;
    });
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
      uuid: this.profileDetails?.uuid,
      txRefNum: "6336F4ACDCE6E19B48595C108DFB4EA8B085548B",
      amount: order?.amount,
      orderID: order?.salesId,
      svCard: order?.storedValueNumber
    };

    this.customerService.refundOder(payload).subscribe(data => {
      console.log(data);
      this.loading = false;
      this.onSucessMessageEvent.emit(SuccessMessages.RefundSuccessMessage);
    });
  }
}
