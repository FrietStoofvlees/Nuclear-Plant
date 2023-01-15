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

  add(): void {
    this.data.addReactor();
  }

  reset(): void {
    this.data.reset();
  }

  onChange(newValue: string): void {
    this.unit = newValue;
    this.unitChanged.emit(this.unit);
  }

  getAverageTemp(): number {
    let powerlines = this.data.getPowerGrid();
    let activeReactors: IReactor[] = [];
    powerlines.forEach(powerline => {
      powerline.reactors.forEach(reactor => {
        if (reactor.state == ReactorState.running) {
          activeReactors.push(reactor);
        }
      });
    });

    let avgTemp = 0;

    activeReactors.forEach(reactor => {
      avgTemp += reactor.temperature;
    });

    if (avgTemp == 0) {
      return 0;
    }
    return Math.round(((avgTemp / activeReactors.length) + Number.EPSILON) * 100) / 100;
  }

  getAlerts() {
    let powerlines = this.data.getPowerGrid();
    let alerts: string[] = [];
    powerlines.forEach(powerline => {
      powerline.reactors.forEach(reactor => {
        if (reactor.state == ReactorState.meltdown) {
          alerts.push(` Reactor ${reactor.name}`);
        }
      });
    });

    if (alerts.length) {
      return alerts + " in meltdown";
    } else {
      return alerts;
    }
  }
}
