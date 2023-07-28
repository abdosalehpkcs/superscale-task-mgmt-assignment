import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
@NgModule({
  declarations: [],
  imports: [CommonModule, ToastModule, MessageModule, ToolbarModule, ButtonModule],
  exports: [ToastModule, MessageModule, ToolbarModule, ButtonModule],
  providers: [MessageService, ConfirmationService],
})
export class SharedModule {}
