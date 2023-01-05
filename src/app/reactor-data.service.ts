import { Injectable } from '@angular/core';
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
      let reactor: IReactor = { name: index + 1, temperature: this.genRandomTemp(), state: ReactorState.stopped };
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
      }
    });
    console.log(this.reactorArray);
  }

  genRandomTemp(): number {
    return Math.round(((Math.random() * (540 - 400) + 400) + Number.EPSILON) * 100) / 100;
  }
}
