import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, Message } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
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
  addSvCardForm: FormGroup = this.fb.group({});editSvCardDialog: boolean = false;
  transferBalanceDialog: boolean = false;
  addSvCardDialog: boolean = false;
  messageShow: Message[] = [];
  loading: boolean = true;
  accountAmounts: any[] = [];
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
        label: 'Delete', icon: 'pi pi-trash', command: () => {
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
      cardNumber: ['', Validators.required],
      pin: ['', Validators.required]
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

  deleteStoredCard() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageShow = [
          { severity: 'success', summary: 'Success', detail: `Card deleted successfully`, life: 1000 }
        ];
        const el: any = document.getElementById('mainId');
        el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        setTimeout(() => {
          this.messageShow = [];
        }, 3000);
      }
    });
  }

  editSvCard() {
    this.editSvCardDialog = true;
  }

  addSvCard() {
    this.addSvCardDialog = true;
  }

  transferBalance() {
    this.transferBalanceDialog = true;
  }

  hideDialog() {
    this.editSvCardDialog = false;
    this.transferBalanceDialog = false;
    this.addSvCardDialog = false;
  }
}
