import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { TasksService } from './core/tasks-api/v1';

interface Column {
  field: string;
  header: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  title = 'superscale-task-mgmt-assignment';
  tasks$;
  cols!: Column[];

  constructor(
    private tasksService: TasksService,
    private messageService: MessageService,
  ) {
    this.tasks$ = this.tasksService.appControllerFindAll();
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'type', header: 'Type' },
      { field: 'fields', header: 'Fields' },
    ];
  }

  editTask(task: any) {
    this.messageService.add({ severity: 'info', summary: 'Task Selected', detail: task.name });
  }
}
