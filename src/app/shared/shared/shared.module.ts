import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { JsonToTaskFieldsPipe } from '../../pipes/json-to-task-fields.pipe';

@NgModule({
  declarations: [JsonToTaskFieldsPipe],
  imports: [CommonModule, MessageModule, DialogModule, TableModule, ConfirmDialogModule, ToolbarModule, ToastModule, ButtonModule, HttpClientModule],
  exports: [
    MessageModule,
    DialogModule,
    TableModule,
    ConfirmDialogModule,
    ToolbarModule,
    ToastModule,
    ButtonModule,
    JsonToTaskFieldsPipe,
    HttpClientModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class SharedModule {}
