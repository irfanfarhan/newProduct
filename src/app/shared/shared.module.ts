import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MsalModule } from '@azure/msal-angular';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CardModule, } from 'primeng/card';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CommonComponent } from './components/common/common.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ImageModule } from 'primeng/image';
import { MonthPipePipe } from './pipes/month-pipe.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { MenuModule } from 'primeng/menu';
import { TabViewModule } from 'primeng/tabview'
import { CheckboxModule } from 'primeng/checkbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { KeyFilterModule } from 'primeng/keyfilter';

export const sharedModule = [
  CommonModule,
  HttpClientModule,
  MsalModule,
  TabMenuModule,
  TableModule,
  TableModule,
  CalendarModule,
  SliderModule,
  DialogModule,
  MultiSelectModule,
  ContextMenuModule,
  DropdownModule,
  ButtonModule,
  ToastModule,
  InputTextModule,
  ProgressBarModule,
  MessagesModule,
  MessageModule,
  CardModule,
  DynamicDialogModule,
  InputNumberModule,
  DividerModule,
  FormsModule,
  ConfirmDialogModule,
  ImageModule,
  ReactiveFormsModule,
  MenuModule,
  TabViewModule,
  CheckboxModule,
  SelectButtonModule,
  KeyFilterModule];

@NgModule({
  declarations: [CommonComponent, MonthPipePipe, LoadingComponent],
  imports: [
    ...sharedModule
  ],
  exports: [
    ...sharedModule,
    CommonComponent, MonthPipePipe, LoadingComponent
  ]
})
export class SharedModule { }
