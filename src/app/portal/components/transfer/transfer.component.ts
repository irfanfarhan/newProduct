import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  transferBalanceForm: FormGroup = this.fb.group({});
  multiBalanceTransfer: any[] = [];
  total: any = 12;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.transferBalanceForm = this.fb.group({
      pcNumber: ['', Validators.required],
      pin: ['', Validators.required]
    });
    this.multiBalanceTransfer = [{ id: 0 }]
  }

  add() {
    this.multiBalanceTransfer.push({
      id: this.multiBalanceTransfer.length + 1
    });
    this.total = 12 * this.multiBalanceTransfer.length;
  }

  delete() {
    this.multiBalanceTransfer.pop();
    this.total = this.total - 12;
  }
}
