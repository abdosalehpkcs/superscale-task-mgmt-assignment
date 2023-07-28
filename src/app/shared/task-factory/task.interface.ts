import { TaskFields } from './task-field.interface';

export interface Task {
  name: string;
  type: string;
  fields: TaskFields;
}
