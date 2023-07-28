import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

import { TasksService } from '../core/tasks-api/v1';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements OnInit {
  tasks$!: Observable<any>;

  constructor(
    private tasksService: TasksService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.tasks$ = this.tasksService.appControllerFindAll();
  }

  editTask(task: any) {
    this.messageService.add({ severity: 'info', summary: 'Task Selected', detail: task.name });
  }
}
