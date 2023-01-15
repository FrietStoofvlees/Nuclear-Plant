import { Pipe, PipeTransform } from '@angular/core';
import { ReactorState } from './reactor-state';

@Pipe({
  name: 'buttonPipe'
})
export class ButtonPipePipe implements PipeTransform {

  transform(state: string): string {
    let string = "";
    switch (state) {
      case "running":
        string = "Stop";
        break;
      case "stopped":
      case "meltdown":
        string = "Start";
        break;
      default:
        break;
    }
    return string;
  }
}
