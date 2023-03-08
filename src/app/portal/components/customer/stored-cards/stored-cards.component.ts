import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, Message } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AmountDropdown, SuccessMessages } from 'src/app/portal/constants/customer.constants';
import { CustomerService } from 'src/app/portal/services/customers.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-stored-cards',
  templateUrl: './stored-cards.component.html',
  styleUrls: ['./stored-cards.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class StoredCardsComponent implements OnInit, OnChanges {
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
  thresholdDropdown: any[] = [];
  amountDropdown: any[] = AmountDropdown;
  @Output() onSucessMessageEvent: EventEmitter<any> = new EventEmitter<any>();
  selectedSvCard: any;
  creditCards: any;
  constructor(private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private customerService: CustomerService, private _loading: LoadingService) { }

  ngOnInit(): void {
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
      number: ['', Validators.required],
      autoreloadflag: ['', Validators.required],
      paymentMethod: [''],
      amount: [''],
      threshold: ['']
    });
    this.transferBalanceForm = this.fb.group({
      toCardNumber: ['', Validators.required],
      fromCardNumber: ['', Validators.required],
      fromPin: ['', Validators.required]
    });
  }


  ngOnChanges(changes: SimpleChanges) {
    this.storedCards = this.profileDetails?.storedvaluecards?.list;
    this.creditCards = this.profileDetails?.creditcards?.list;
    this.loading = false;
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
    this._loading.toggleLoading(true);
    this.customerService.deleteSvCard(payload).subscribe(data => {
      console.log(data);
      this.loading = false;
      this._loading.toggleLoading(false);
      this.onSucessMessageEvent.emit(SuccessMessages.SvCardDeleteSuccessMessage);
    }), (error: any) => {
      this._loading.toggleLoading(false);
      console.log(error);
      this.loading = false;
      this.customerService.handleError(error);
    };
  }

  editSvCard = () => {
    this.editSvCardDialog = true;
    this.thresholdDropdown = [...AmountDropdown];
    this.thresholdDropdown.unshift(5);
    if (this.selectedSvCard?.autoreload?.active) {
      this.editSvCardForm.controls['paymentMethod'].setValidators([Validators.required]);
      this.editSvCardForm.controls['amount'].setValidators([Validators.required]);
      this.editSvCardForm.controls['threshold'].setValidators([Validators.required]);
    }
    this.editSvCardForm.updateValueAndValidity();
    this.editSvCardForm.setValue({
      number: this.selectedSvCard?.number,
      autoreloadflag: this.selectedSvCard?.autoreload?.active,
      paymentMethod: '',
      amount: this.selectedSvCard?.autoreload?.amount,
      threshold: this.selectedSvCard?.autoreload?.threshold
    });
  }

  autoreloadflagEvent = (event: any) => {
    if (event.checked) {
      this.editSvCardForm.controls['paymentMethod'].setValidators([Validators.required]);
      this.editSvCardForm.controls['amount'].setValidators([Validators.required]);
      this.editSvCardForm.controls['threshold'].setValidators([Validators.required]);
    } else {
      this.editSvCardForm.controls['paymentMethod'].clearValidators();
      this.editSvCardForm.controls['amount'].clearValidators();
      this.editSvCardForm.controls['threshold'].clearValidators();
    }
    this.editSvCardForm.controls['paymentMethod'].updateValueAndValidity();
    this.editSvCardForm.controls['amount'].updateValueAndValidity();
    this.editSvCardForm.controls['threshold'].updateValueAndValidity();
  }

  updateSvc = () => {
    const form = this.editSvCardForm.getRawValue();
    const payload = {
      threshold: form.threshold?.toString(),
      amount: form.amount?.toString(),
      ccid: form.paymentMethod?.uuid,
      uuid: this.selectedSvCard?.uuid,
      number: this.selectedSvCard?.number,
      pin: this.selectedSvCard?.pin,
      value: this.selectedSvCard?.value,
      userId: this.profileDetails?.uuid,
      isdefault: this.selectedSvCard?.isdefault,
      isprimary: this.selectedSvCard?.isprimary,
      design: this.selectedSvCard?.design,
      autoreloadflag: form.autoreloadflag,
    };
    this._loading.toggleLoading(true);
    this.customerService.updateSvc(payload).subscribe(data => {
      console.log(data);
      this.loading = false;
      this.hideDialog();
      this._loading.toggleLoading(false);
      this.onSucessMessageEvent.emit(SuccessMessages.UpdateSvCardSuccessMessage);
    }), (error: any) => {
      this._loading.toggleLoading(false);
      console.log(error);
      this.loading = false;
      this.customerService.handleError(error);
    };
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
    this._loading.toggleLoading(true);
    this.customerService.addSvc(payload).subscribe(data => {
      console.log(data);
      this.loading = false;
      this.hideDialog();
      this._loading.toggleLoading(false);
      this.onSucessMessageEvent.emit(SuccessMessages.AddSvCardSuccessMessage);
    }), (error: any) => {
      this._loading.toggleLoading(false);
      console.log(error);
      this.loading = false;
      this.customerService.handleError(error);
    };
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

  getCC = (source: any) => {
    if (source) {
      const value = this.creditCards.find((element: any) => element.token === source);
      if(value) {
        return value?.cardnumber;
      }
    }
  }
}
