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

    return Array.from(this.map.keys()).map((key) => ({
      key: key,
      value: this.map.get(key),
      valueType: typeof this.map.get(key),
    }));
  }
}
