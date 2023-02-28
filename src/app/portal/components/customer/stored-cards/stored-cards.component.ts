import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, Message } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SuccessMessages } from 'src/app/portal/constants/customer.constants';
import { CustomerService } from 'src/app/portal/services/customers.service';

@Component({
  selector: 'app-stored-cards',
  templateUrl: './stored-cards.component.html',
  styleUrls: ['./stored-cards.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class StoredCardsComponent implements OnInit {
  @Input() profileDetails: any;
  storedCards: any[] = [];
  actions: any[] = [];
  editSvCardForm: FormGroup = this.fb.group({});
  transferBalanceForm: FormGroup = this.fb.group({});
  addSvCardForm: FormGroup = this.fb.group({}); editSvCardDialog: boolean = false;
  transferBalanceDialog: boolean = false;
  addSvCardDialog: boolean = false;
  messageShow: Message[] = [];
  loading: boolean = true;
  accountAmounts: any[] = [];
  @Output() onSucessMessageEvent: EventEmitter<any> = new EventEmitter<any>();
  selectedSvCard: any;
  constructor(private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.storedCards = this.profileDetails?.storedvaluecards?.list;
    this.loading = false;
    this.actions = [
      {
        label: 'Edit', icon: 'pi pi-pencil', command: () => {
          this.editSvCard();
        }
      },
      {
        label: 'Delete', icon: 'pi pi-trash', command: (value: any) => {
          console.log(value);
          this.deleteStoredCard();
        }
      },
      {
        label: 'Transfer balance to this card', icon: 'pi pi-credit-card', command: () => {
          this.transferBalance();
        }
      }
    ];

    this.addSvCardForm = this.fb.group({
      number: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$")]),
      pin: new FormControl('', [
        Validators.required,
        Validators.pattern(/[0-9]{5}/)]),
    });
    this.editSvCardForm = this.fb.group({
      cardNumber: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      automaticallyReload: ['', Validators.required],
      account: ['', Validators.required]
    });
    this.transferBalanceForm = this.fb.group({
      toCardNumber: ['', Validators.required],
      fromCardNumber: ['', Validators.required],
      fromPin: ['', Validators.required]
    });

    this.accountAmounts = [
      { name: '$5' },
      { name: '$10' },
      { name: '$15' },
      { name: '$20' },
      { name: '$25' },
      { name: '$30' },
      { name: '$35' },
      { name: '$40' },
      { name: '$45' },
      { name: '$50' },
      { name: '$55' },
      { name: '$60' },
      { name: '$65' },
      { name: '$70' },
      { name: '$75' },
      { name: '$80' },
      { name: '$85' },
      { name: '$90' },
      { name: '$95' },
      { name: '$100' }
    ];
  }

  deleteStoredCard = () => {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.confirmDeleteSvCard();
      }
    });
  }

  confirmDeleteSvCard = () => {
    const payload = {
      userid: this.profileDetails?.uuid,
      svid: this.selectedSvCard?.uuid
    };
    this.customerService.deleteSvCard(payload).subscribe(data => {
      console.log(data);
      this.loading = false;
      this.onSucessMessageEvent.emit(SuccessMessages.SvCardDeleteSuccessMessage);
    });
  }
  
  editSvCard = () => {
    this.editSvCardDialog = true;
  }

  addSvCard = () => {
    this.addSvCardDialog = true;
    this.addSvCardForm.reset();
  }

  addSvCardSubmit = () => {
    const payload = {
      uuid: this.profileDetails?.uuid,
      ...this.addSvCardForm?.getRawValue()
    };
    this.customerService.addSvc(payload).subscribe(data => {
      console.log(data);
      this.loading = false;
      this.hideDialog();
      this.onSucessMessageEvent.emit(SuccessMessages.AddSvCardSuccessMessage);
    });
  }

  selectedStoredCard = (card: any) => {
    this.selectedSvCard = card;
  }

  transferBalance = () => {
    this.transferBalanceDialog = true;
  }

  hideDialog = () => {
    this.editSvCardDialog = false;
    this.transferBalanceDialog = false;
    this.addSvCardDialog = false;
  }
}
