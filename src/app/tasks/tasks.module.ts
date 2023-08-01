import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

import { SharedModule } from '../shared/shared.module';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { TasksRoutes } from './tasks.routing';
import { TasksComponent } from './tasks/tasks.component';

@NgModule({
  declarations: [TasksComponent, TaskDialogComponent],
  imports: [RouterModule.forChild(TasksRoutes), CommonModule, SharedModule, FormsModule, InputTextModule, DropdownModule],
})
export class TasksModule {}
