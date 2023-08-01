import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { catchError, map, of, startWith, Subscription } from 'rxjs';

import { TasksService } from '../../core/tasks-api/v1';
import { Task } from '../task-factory/task.interface';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  tasksData: Task[] = [];
  loading = false;
  taskDialog = false;
  task: Task = {} as Task;

  constructor(
    private tasksService: TasksService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const tasksSubscription = this.tasksService
      .appControllerFindAll()
      .pipe(
        map((value: Task[]) => ({ loading: false, value: value })),
        startWith({
          loading: true,
          value: [],
        }),
        catchError(() => {
          return of({ loading: false, value: [] });
        }),
      )
      .subscribe((response: { loading: boolean; value: Task[] }) => {
        this.tasksData = response.value;
        this.loading = response.loading;
        this.cdr.detectChanges();
      });

    this.subscription.add(tasksSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createTask() {
    this.task = {} as Task;
    this.taskDialog = true;
  }

  editTask(task: Task) {
    this.task = { ...task };
    this.taskDialog = true;
  }

  deleteTask(taskToRemove: Task) {
    const taskIdToRemove = taskToRemove._id!;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + taskToRemove.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const tasksDeleteSubscription = this.tasksService.appControllerRemove(taskIdToRemove).subscribe(() => {
          this.tasksData = this.tasksData.filter((task) => task._id !== taskToRemove._id);
          this.cdr.detectChanges();
        });
        this.subscription.add(tasksDeleteSubscription);
      },
    });
  }
}
