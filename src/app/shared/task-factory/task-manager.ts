import { Injectable } from '@angular/core';

import { Task } from './task.interface';
import { TaskFactory } from './task-factory.interface';
import { TaskFields } from './task-field.interface';
import { WashDishesFactory } from './wash-dishes-factory';

@Injectable({
  providedIn: 'root',
})
export class TaskManager {
  private taskFactories: Record<string, TaskFactory> = {};

  constructor() {
    this.registerTaskFactory('wash-dishes', new WashDishesFactory());
  }

  private registerTaskFactory(type: string, factory: TaskFactory) {
    this.taskFactories[type] = factory;
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
