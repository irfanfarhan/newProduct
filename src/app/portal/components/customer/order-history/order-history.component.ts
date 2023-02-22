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

  refund() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to refund?',
      header: 'Confirm Refund',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onSucessMessageEvent.emit(SuccessMessages.RefundSuccessMessage);
      }
    });
  }
}
