import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TasksService } from '../../core/tasks-api/v1';
import { Task, TypeEnum } from '../../shared/task-factory/task.interface';
import { TaskManager } from '../../shared/task-factory/task-manager';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDialogComponent {
  @Input({ required: true }) isDialogVisible = false;
  @Output() isDialogVisibleChange = new EventEmitter<boolean>();

  // @Input({ required: true }) submitted = false;
  // @Output() submittedChange = new EventEmitter<boolean>();

  @Input({ required: true }) task!: Task;

  typeOptions = Object.values(TypeEnum);

  constructor(
    private taskManger: TaskManager,
    private taskService: TasksService,
  ) {}

  onTypeChange() {
    this.task = this.taskManger.createTask(this.task.type, this.task.name, this.task.fields);
    this.task = { ...this.task };
  }

  onFieldInputChange(eve: any, field: any) {
    // TO-DO fields type optmization
    const fieldParsedValue = this.parseValueBasedOnTaskFieldType(field.valueType, eve.target.value);
    (this.task.fields as any)[field.key] = fieldParsedValue;
    field.value = fieldParsedValue;
    this.task = { ...this.task };
  }

  hideDialog() {
    this.isDialogVisible = false;
    this.isDialogVisibleChange.emit(false);
    // this.submitted = false;
  }

  saveTask() {
    if (!this.task._id) {
      // Create a new Task

      this.taskService.appControllerCreate(this.task).subscribe((response) => {
        console.log(response);
      });
    } else {
      // Update a task
      this.taskService.appControllerUpdate(this.task._id, this.task).subscribe((response) => {
        console.log(response);
      });
    }
    console.log(this.task);
  }

  parseValueBasedOnTaskFieldType(taskFieldType: string, taskFieldValue: any) {
    console.log(taskFieldType);
    if (taskFieldType === 'number') {
      return Number(taskFieldValue);
    } else {
      return taskFieldValue;
    }
  }
}
