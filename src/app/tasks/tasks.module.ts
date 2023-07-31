import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

import { JsonToTaskFieldsPipe } from '../pipes/json-to-task-fields.pipe';
import { SharedModule } from '../shared/shared/shared.module';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { TasksRoutes } from './tasks.routing';
import { TasksComponent } from './tasks/tasks.component';

@NgModule({
  declarations: [TasksComponent, TaskDialogComponent],
  exports: [JsonToTaskFieldsPipe],
  imports: [
    RouterModule.forChild(TasksRoutes),
    CommonModule,
    SharedModule,
    FormsModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextModule,
    TableModule,
    DropdownModule,
  ],
  providers: [ConfirmationService],
})
export class TasksModule {}
