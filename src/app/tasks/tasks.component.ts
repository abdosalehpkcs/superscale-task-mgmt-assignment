import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

import { TasksService } from '../core/tasks-api/v1';
import { Task } from '../shared/task-factory/task.interface';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements OnInit {
  tasks$!: Observable<Task[]>;

  constructor(
    private tasksService: TasksService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.tasks$ = this.tasksService.appControllerFindAll();
  }

  editTask(task: Task) {
    this.messageService.add({ severity: 'info', summary: 'Task Selected', detail: task.name });
  }

  //TO-DO change any to Task
  deleteTask(task: Task) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + task.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // TO-DO remove task, send call to api
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: `Task ${task.name} Deleted`,
          life: 3000,
        });
      },
    });
  }
}
