import { CreateTaskDto, UpdateTaskDto } from '../../core/tasks-api/v1';

// export interface Task {
//   _id?: string;
//   name: string;
//   type: string;
//   fields: TaskFields;
// }

export type Task = (CreateTaskDto | UpdateTaskDto) & { _id?: string };
export const TypeEnum = {
  ...CreateTaskDto.TypeEnum,
  ...UpdateTaskDto.TypeEnum,
};
