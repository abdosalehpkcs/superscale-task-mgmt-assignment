import { JsonToTaskFieldsPipe } from './json-to-task-fields.pipe';

describe('JsonToTaskFieldsPipe', () => {
  it('create an instance', () => {
    const pipe = new JsonToTaskFieldsPipe();
    expect(pipe).toBeTruthy();
  });
});
