import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonToTaskFields',
})
export class JsonToTaskFieldsPipe implements PipeTransform {
  map = new Map<string, any>();

  transform(input: any): any[] {
    if (!input || typeof input !== 'object') {
      return [];
    }

    this.map.clear();

    for (const key in input) {
      this.map.set(key, input[key]);
    }

    return Array.from(this.map.entries()).map(([key, value]) => ({
      key,
      value,
      valueType: value instanceof Date && value.valueOf() > 0 ? 'date' : typeof value,
    }));
  }
}
