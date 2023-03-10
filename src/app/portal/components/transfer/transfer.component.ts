import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { TransferService } from '../../services/transfer.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  transferBalanceForm: FormGroup = this.fb.group({});
  multiTransferBalanceForm: FormGroup = this.fb.group({});
  total = 0;
  balance = 0;
  messageShow: Message[] = [];
  constructor(private fb: FormBuilder,
    private transferService: TransferService, private _loading: LoadingService) { }

  ngOnInit(): void {
    this.transferBalanceForm = this.fb.group({
      number: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$")]),
      pin: new FormControl('', [
        Validators.required,
        Validators.pattern(/[0-9]{6}/)])
    });
    this.getMultiBalanceTransferForm();
  }

  getMultiBalanceTransferForm = () => {
    this.multiTransferBalanceForm = this.fb.group({
      transfer: this.fb.array([])
    });
    this.addNewMultiTransferForm();
  }

  newMultiTransferForm = () => {
    return this.fb.group({
      number: new FormControl({ value: '', disabled: false }, [
        Validators.required,
        Validators.pattern("^[0-9]*$")]),
      pin: new FormControl({ value: '', disabled: false }, [
        Validators.required,
        Validators.pattern(/[0-9]{6}/)]),
      balance: new FormControl({ value: 0, disabled: false })
    })
  }

  addNewMultiTransferForm = () => {
    return this.transferForm.push(this.newMultiTransferForm());
  }

  get transferForm(): FormArray {
    return this.multiTransferBalanceForm.get('transfer') as FormArray;
  }

  add() {
    this.addNewMultiTransferForm();
    this.disabledAll();
  }

  disabledAll = () => {
    this.transferForm.controls.forEach((element, index: any) => {
      if (index !== (this.transferForm.controls.length - 1))
        element.disable();
    });
  }

  transferBalance = () => {
    const form = this.transferBalanceForm.getRawValue();
    this.getTransferBalance(form, 'single', null);
  }

  getTransferBalance(payload: any, type: any, index: any) {
    this._loading.toggleLoading(true);
    this.transferService.getTransferBalance(payload).subscribe(data => {
      if (data?.message) {
        this.errorMessage(data?.message);
      } else {
        if (type === 'single') {
          this.balance = data;
          this.transferBalanceForm.disable();
        }
        if (type === 'multiple') {
          this.transferForm.controls[index].disable();
          this.transferForm.controls[index].get('balance')?.setValue(data);
          this.updateTotalBalance();
        }
      }
      this._loading.toggleLoading(false);
    }), (error: any) => {
      this._loading.toggleLoading(false);
      console.log(error);
      this.transferService.handleError(error);
    };
  }

  errorMessage = (message: any) => {
    this.messageShow = [
      { severity: 'error', summary: 'Error', detail: message, life: 3000 }
    ];
    const el: any = document.getElementById('mainId');
    el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    setTimeout(() => {
      this.messageShow = [];
    }, 3000);
  }

  updateTotalBalance = () => {
    this.total = 0;
    this.transferForm.controls.forEach((element) => {
      console.log({ element });
      this.total += Number(element?.value.balance);
    });
  }

  clear = () => {
    this.transferBalanceForm.enable();
  }

  checkBalance = (index: any) => {
    const form = this.transferForm.controls[index].getRawValue();
    console.log(this.transferForm.controls[index].getRawValue());
    this.getTransferBalance(form, 'multiple', index);
  }

  delete(index: number) {
    this.transferForm.removeAt(index);
    this.transferForm.controls[index - 1].enable();
    this.updateTotalBalance();
  }

  transfer = () => {
    this.transferForm.controls.forEach((element, index: any) => {
      this.totalBalanceTransfer(element);
    });
    this.transferForm.clear();
    this.getMultiBalanceTransferForm();
    this.total = 0;
  }

  totalBalanceTransfer = (form: any) => {
    this._loading.toggleLoading(true);
    const transferTo = this.transferBalanceForm.getRawValue();
    const transferFrom = form.getRawValue();
    const payload = {
      tocardNumber: transferTo?.number,
      toPin: transferTo?.pin,
      fromcardNumber: transferFrom?.number,
      fromPin: transferFrom?.pin
    }
    console.log(payload);
    this.transferService.transferBalance(payload).subscribe(data => {
      console.log(data);
      this._loading.toggleLoading(false);
    }), (error: any) => {
      this._loading.toggleLoading(false);
      console.log(error);
      this.transferService.handleError(error);
    };
  }
}
