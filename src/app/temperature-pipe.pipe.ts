import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperaturePipe'
})
export class TemperaturePipePipe implements PipeTransform {

  transform(value: number, unit: string): number {
    let temp!: number;
    if (!isNaN(value)) {
      switch (unit) {
        case '°C':
          temp = value;
          break;
        case '°F':
          temp = (value - 32) / 1.8;
          break;
        case 'K':
          temp = value + 273.15;
          break;
        default:
          break;
      }
    }
    return temp;
  }
}
