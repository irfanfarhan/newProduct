import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, Message } from 'primeng/api';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  providers: [ConfirmationService]
})
export class TransferComponent implements OnInit {
  transferBalanceForm: FormGroup = this.fb.group({});
  multiBalanceTransfer: any[] = [];
  messageShow: Message[] = [];
  total: any = 12;
  constructor(private fb: FormBuilder,
    private confirmationService: ConfirmationService) { }

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
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageShow = [
          { severity: 'success', summary: 'Success', detail: `Deleted successfully`, life: 1000 }
        ];
        setTimeout(() => {
          this.messageShow = [];
        }, 3000);
        this.multiBalanceTransfer.pop();
        this.total = this.total - 12;
      }
    });
  }
}
