import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { TasksService } from '../../core/tasks-api/v1';
import { Task, TypeEnum } from '../task-factory/task.interface';
import { TaskManager } from '../task-factory/task-manager';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDialogComponent implements OnDestroy {
  @Input({ required: true }) isDialogVisible = false;
  @Output() isDialogVisibleChange = new EventEmitter<boolean>();

  @Input({ required: true }) tasksData: Task[] = [];
  @Output() tasksDataChange = new EventEmitter<Task[]>();

  @Input({ required: true }) task!: Task;

  typeOptions = Object.values(TypeEnum);

  private subscriptions = new Subscription();

  constructor(
    private taskManger: TaskManager,
    private taskService: TasksService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onTypeChange() {
    if (!this.task._id) {
      this.task = this.taskManger.createTask(this.task.type, this.task.name, this.task.fields);
      this.task = { ...this.task };
    } else {
      const taskTemplate = this.taskManger.createTask(this.task.type, this.task.name, this.task.fields);
      taskTemplate._id = this.task._id;
      this.task = { ...taskTemplate };
    }
  }

  onFieldInputChange(event: any, field: any) {
    const fieldParsedValue = this.parseValueBasedOnTaskFieldType(field.valueType, event.target.value);
    (this.task.fields as any)[field.key] = fieldParsedValue;
    field.value = fieldParsedValue;
    this.task = { ...this.task };
  }

  hideDialog() {
    this.isDialogVisible = false;
    this.isDialogVisibleChange.emit(false);
  }

  saveTask() {
    if (!this.task._id) {
      const createSubscription = this.taskService.appControllerCreate(this.task).subscribe(() => {
        this.tasksData = [...this.tasksData, this.task];
        this.tasksDataChange.emit(this.tasksData);
        this.isDialogVisibleChange.emit(false);
        this.cdr.detectChanges();
      });
      this.subscriptions.add(createSubscription);
    } else {
      const updateSubscription = this.taskService.appControllerUpdate(this.task._id, this.task).subscribe(() => {
        const taskToRemove = this.tasksData.findIndex((task: Task) => task._id === this.task._id);
        if (taskToRemove !== -1) {
          this.tasksData.splice(taskToRemove, 1, this.task);
          this.tasksDataChange.emit(this.tasksData);
          this.isDialogVisibleChange.emit(false);
          this.cdr.detectChanges();
        }
      });
      this.subscriptions.add(updateSubscription);
    }
  }

  private parseValueBasedOnTaskFieldType(taskFieldType: string, taskFieldValue: string) {
    switch (taskFieldType) {
      case 'number':
        return Number(taskFieldValue);
      case 'string':
        return String(taskFieldValue);
      case 'boolean':
        return Boolean(taskFieldValue);
      case 'date':
        return new Date(taskFieldValue);
      default:
        return taskFieldValue;
    }
  }
}
