import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { IReactor } from './ireactor';
import { ReactorState } from './reactor-state';

@Injectable({
  providedIn: 'root'
})
export class ReactorDataService {
  reactors: number = 7;
  reactorArray!: IReactor[];

  constructor() {
    this.createReactors();

    const source = timer(2500, 2500);
    const subscribe = source.subscribe(val => {
      console.log(val);
      this.reactorArray.forEach(reactor => {
        if (reactor.state == ReactorState.running) {
          reactor.temperature = this.updateTemp(reactor.temperature);
          if (reactor.temperature <= 400) {
            reactor.state = ReactorState.stopped;
          }
        };
      });
    })
  }

  getReactors(): number {
    return this.reactors;
  }

  getReactorArray(): IReactor[] {
    return this.reactorArray;
  }

  getNumberOfPowerlines(): number {
    return Math.ceil(this.reactors / 3);
  }

  createReactors(): void {
    this.reactorArray = [];
    for (let index = 0; index < this.reactors; index++) {
      let reactor: IReactor = { name: index + 1, temperature: 0, state: ReactorState.stopped };
      this.reactorArray.push(reactor);
    }
  }

  setReactors(newValue: number): void {
    this.reactors = newValue;
    this.createReactors();
  }

  updateArray(reactor: IReactor): void {
    this.reactorArray.forEach(r => {
      if (reactor.name == r.name) {
        r.state = reactor.state;
        if (r.state == ReactorState.running) {
          r.temperature = this.genRandomTemp();
        } else {
          r.temperature = 0;
        }
      }
    });
    console.log(this.reactorArray);
  }

  genRandomTemp(): number {
    return Math.round(((Math.random() * (540 - 400) + 400) + Number.EPSILON) * 100) / 100;
  }

  updateTemp(temp: number): number {
    let max = temp + 5;
    let min = temp - 5 * 10;
    return Math.round(((Math.random() * (max - min) + min) + Number.EPSILON) * 100) / 100;
  }
}
