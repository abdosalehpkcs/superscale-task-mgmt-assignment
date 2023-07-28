import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

import { SharedModule } from '../shared/shared/shared.module';
import { TasksComponent } from './tasks.component';
import { TasksRoutes } from './tasks.routing';

@NgModule({
  declarations: [TasksComponent],
  imports: [RouterModule.forChild(TasksRoutes), CommonModule, SharedModule, InputTextModule, TableModule],
  providers: [ConfirmationService],
})
export class TasksModule {}
