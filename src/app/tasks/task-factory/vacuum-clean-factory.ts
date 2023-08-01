import { VacuumCleanFields } from '../../core/tasks-api/v1';
import { Task } from './task.interface';
import { TaskFactory } from './task-factory.interface';

export class VacuumCleanFactory implements TaskFactory {
  createTask(name: string, fields: VacuumCleanFields): Task {
    return {
      type: 'vacuum-clean',
      name,
      fields: {
        room: fields?.room || '',
        who: fields?.who || '',
      },
    };
  }
}
