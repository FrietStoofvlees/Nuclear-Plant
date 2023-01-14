import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { IReactor, IPowerline } from './ireactor';
import { ReactorState } from './reactor-state';

@Injectable({
  providedIn: 'root'
})
export class ReactorDataService {
  reactors: number = 7;
  powergrid!: IPowerline[];

  constructor() {
    this.createPowergrid();

    const source = timer(2500, 2500);
    const subscribe = source.subscribe(val => {
      this.powergrid.forEach(powerline => {
        powerline.reactors.forEach(reactor => {
          if (reactor.state == ReactorState.running) {
            reactor.temperature = this.updateTemp(reactor.temperature);
            if (reactor.temperature <= 400) {
              reactor.state = ReactorState.stopped;
            } else if (reactor.temperature >= 600) {
              reactor.state = ReactorState.meltdown;
            }
            console.log(reactor);
          };
        });
      });
    })
  }

  getPowerGrid(): IPowerline[] {
    return this.powergrid;
  }

  getNumberOfPowerlines(): number {
    return Math.ceil(this.reactors / 3);
  }

  createPowergrid(): void {
    this.powergrid = [];
    let name = 1;
    for (let p = 1; p <= this.getNumberOfPowerlines(); p++) {
      let powerline: IPowerline = { reactors: [] };
      if (p == this.getNumberOfPowerlines()) {
        for (let r = 0; r < Math.floor(this.reactors / 3); r++) {
          let reactor: IReactor = { name: name++, temperature: 0, state: ReactorState.stopped };
          powerline.reactors.push(reactor);
        }
      } else {
        for (let r = 0; r < 3; r++) {
          let reactor: IReactor = { name: name++, temperature: 0, state: ReactorState.stopped };
          powerline.reactors.push(reactor);
        }
      }
      this.powergrid.push(powerline);
    }
  }

  setReactors(newValue: number): void {
    this.reactors = newValue;
    this.createPowergrid();
  }

  updateArray(reactor: IReactor): void {
    this.powergrid.forEach(powerline => {
      powerline.reactors.forEach(r => {
        if (reactor.name == r.name) {
          r.state = reactor.state;
          if (r.state == ReactorState.running) {
            r.temperature = this.genRandomTemp();
          } else {
            r.temperature = 0;
          }
        }
      })
    });
    console.log(this.powergrid);
  }

  genRandomTemp(): number {
    return Math.round(((Math.random() * (540 - 400) + 400) + Number.EPSILON) * 100) / 100;
  }

  updateTemp(temp: number): number {
    let max = temp + 5 * 20;
    let min = temp - 5 * 10;
    return Math.round(((Math.random() * (max - min) + min) + Number.EPSILON) * 100) / 100;
  }
}
