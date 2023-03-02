import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/api';
import { SuccessMessages } from 'src/app/portal/constants/customer.constants';
import { CustomerService } from 'src/app/portal/services/customers.service';

@Component({
  selector: 'app-credit-cards',
  templateUrl: './credit-cards.component.html',
  styleUrls: ['./credit-cards.component.scss'],
  providers: [ConfirmationService]
})
export class CreditCardsComponent implements OnInit, OnChanges {
  @Input() profileDetails: any;
  loading: boolean = true;
  creditCards: any[] = [];
  messageShow: Message[] = [];
  @Output() onSucessMessageEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private confirmationService: ConfirmationService,
    private customerService: CustomerService) { }

  ngOnInit(): void { }

  
  ngOnChanges(changes: SimpleChanges) {
    this.creditCards = this.profileDetails?.creditcards?.list;
    this.loading = false;
  }

  deleteCreditCard = (card: any) => {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${card?.cardnumber}?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.confirmDeleteCreditCard(card);
      }
    });
  }

  confirmDeleteCreditCard = (card: any) => {
    const payload = {
      userid: this.profileDetails?.uuid,
      ccid: card?.uuid
    };
    this.customerService.deleteCreditCard(payload).subscribe(data => {
      console.log(data);
      this.loading = false;
      this.onSucessMessageEvent.emit(SuccessMessages.CreditCardDeleteSuccessMessage);
    });
  }
}
