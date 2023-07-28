import { WashDishesFields } from '../../core/tasks-api/v1';
import { Task } from './task.interface';
import { TaskFactory } from './task-factory.interface';

export class WashDishesFactory implements TaskFactory {
  createTask(name: string, fields: WashDishesFields): Task {
    return {
      type: 'wash-dishes',
      name,
      fields: {
        durationInHours: fields.durationInHours || 0,
      },
    };
  }
}
