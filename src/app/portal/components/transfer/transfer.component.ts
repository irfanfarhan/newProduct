import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor(private fb: FormBuilder,
    private transferService: TransferService) { }

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
    this.transferForm.controls.forEach((element, index: any ) => {
      if(index !== (this.transferForm.controls.length - 1))
      element.disable();
    });
  }

  transferBalance = () => {
    const form = this.transferBalanceForm.getRawValue();
    this.getTransferBalance(form, 'single', null);
  }

  getTransferBalance(payload: any, type: any, index: any) {
    //this.transferService.getTransferBalance(payload).subscribe(data => {
    //console.log(data);
    if (type === 'single') {
      this.balance = 12;
      this.transferBalanceForm.disable();
    }
    if (type === 'multiple') {
      this.transferForm.controls[index].disable();
      this.transferForm.controls[index].get('balance')?.setValue(12);
      this.updateTotalBalance();
    }
    // });
  }

  updateTotalBalance = () => {
    this.total = 0;
    this.transferForm.controls.forEach((element) => {
      console.log({ element });
      this.total += element?.value.balance;
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
}
