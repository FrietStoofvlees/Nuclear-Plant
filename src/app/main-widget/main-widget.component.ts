import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IReactor } from '../ireactor';
import { ReactorDataService } from '../reactor-data.service';
import { ReactorState } from '../reactor-state';

@Component({
  selector: 'app-main-widget',
  templateUrl: './main-widget.component.html',
  styleUrls: ['./main-widget.component.scss']
})
export class MainWidgetComponent implements OnInit {

  unit: string = "K";
  @Output() unitChanged = new EventEmitter<string>();

  constructor(private data: ReactorDataService) { }

  ngOnInit(): void {
  }

  onChange(newValue: string): void {
    this.unit = newValue;
    this.unitChanged.emit(this.unit);
  }

  getAverageTemp(): number {
    let array = this.data.getReactorArray();
    console.log(array);
    let activeReactors: IReactor[] = [];
    if (Array.isArray(array)) {
      array.forEach(reactor => {
        if (reactor.state == ReactorState.running) {
          console.log('t');
          activeReactors.push(reactor);
        }
      });
    }
    console.log(activeReactors);

    let avgTemp = 0;
    activeReactors.forEach(reactor => {
      avgTemp += reactor.temperature;
    });
    console.log(avgTemp);
    return avgTemp / activeReactors.length;
  }
}
