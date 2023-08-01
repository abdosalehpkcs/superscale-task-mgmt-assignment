import { Task } from './task.interface';
import { TaskFields } from './task-field.interface';

export interface TaskFactory {
  createTask(name: string, fields: TaskFields): Task;
}
