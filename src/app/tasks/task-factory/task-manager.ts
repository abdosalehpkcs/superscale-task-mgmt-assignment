import { Injectable } from '@angular/core';

import { CreateTaskDto } from '../../core/tasks-api/v1';
import { Task } from './task.interface';
import { TaskFactory } from './task-factory.interface';
import { TaskFields } from './task-field.interface';
import { VacuumCleanFactory } from './vacuum-clean-factory';
import { WashDishesFactory } from './wash-dishes-factory';

@Injectable({
  providedIn: 'root',
})
export class TaskManager {
  private taskFactories: Record<string, TaskFactory> = {};

  constructor() {
    this.registerTaskFactory(CreateTaskDto.TypeEnum.WashDishes, new WashDishesFactory());
    this.registerTaskFactory(CreateTaskDto.TypeEnum.VacuumClean, new VacuumCleanFactory());
  }

  private registerTaskFactory(type: string, factory: TaskFactory) {
    this.taskFactories[type] = factory;
  }

  getRegisterdTaskFactory(type: string) {
    return this.taskFactories[type];
  }

  createTask(type: string, name: string, fields: TaskFields): Task {
    const taskFactory = this.taskFactories[type];

    if (!taskFactory) {
      throw new Error(`Task type '${type}' is not supported.`);
    }

    const task = taskFactory.createTask(name, fields);

    return task;
  }
}
