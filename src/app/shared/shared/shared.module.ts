import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { JsonToTaskFieldsPipe } from '../../pipes/json-to-task-fields.pipe';
@NgModule({
  declarations: [JsonToTaskFieldsPipe],
  imports: [CommonModule, MessageModule, ToolbarModule, ToastModule, ButtonModule],
  exports: [ToastModule, MessageModule, ToolbarModule, ButtonModule, JsonToTaskFieldsPipe],
  providers: [MessageService, ConfirmationService],
})
export class SharedModule {}
