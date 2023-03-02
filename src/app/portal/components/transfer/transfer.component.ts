import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransferService } from '../../services/transfer.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  transferBalanceForm: FormGroup = this.fb.group({});
  multiBalanceTransfer: any[] = [];
  total: any = 12;
  balance = 0;
  disabled = false;
  constructor(private fb: FormBuilder,
    private transferService: TransferService) { }

  ngOnInit(): void {
    this.transferBalanceForm = this.fb.group({
      number: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$")]),
      pin: new FormControl('', [
        Validators.required,
        Validators.pattern(/[0-9]{5}/)]),
    });
    this.multiBalanceTransfer = [{ id: 0 }]
  }

  add() {
    this.multiBalanceTransfer.push({
      id: this.multiBalanceTransfer.length + 1
    });
    this.total = 12 * this.multiBalanceTransfer.length;
  }

  transferBalance = () => {
    const form = this.transferBalanceForm.getRawValue();
    this.transferService.getTransferBalance(form).subscribe(data => {
      console.log(data);
      this.balance = data;
      this.disabled = true;
    });
  }

  clear = () => {
    this.disabled = false;
    this.balance = 0;
  }

  delete() {
    this.multiBalanceTransfer.pop();
    this.total = this.total - 12;
  }
}
