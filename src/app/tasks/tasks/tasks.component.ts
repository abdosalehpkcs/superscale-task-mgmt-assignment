import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BehaviorSubject, catchError, map, Observable, of, startWith, switchMap } from 'rxjs';

import { TasksService } from '../../core/tasks-api/v1';
import { Task } from '../../shared/task-factory/task.interface';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements OnInit {
  private refresh$ = new BehaviorSubject<void>(undefined);
  tasks$!: Observable<{ loading: boolean; value: Task[] }>;

  taskDialog = false;

  task: Task = {} as Task;

  submitted = false;

  constructor(
    private tasksService: TasksService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.tasks$ = this.refresh$.pipe(
      switchMap(() =>
        this.tasksService.appControllerFindAll().pipe(
          map((value: Task[]) => ({ loading: false, value: value })),
          startWith({
            loading: true,
            value: [],
          }),
          catchError(() => {
            return of({ loading: false, value: [] });
          }),
        ),
      ),
    );
  }

  createTask() {
    this.task = {} as Task;
    this.taskDialog = true;
  }

  editTask(task: Task) {
    this.task = { ...task };
    this.taskDialog = true;
    this.messageService.add({ severity: 'info', summary: 'Task Selected', detail: task.name });
  }

  deleteTask(task: Task) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + task.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tasksService.appControllerRemove(task._id!).subscribe((response: unknown) => {
          //TO-DO move to interceptor

          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: `Task ${task.name} Deleted`,
            life: 3000,
          });
          this.refresh$.next();
        });
      },
    });
  }
}
