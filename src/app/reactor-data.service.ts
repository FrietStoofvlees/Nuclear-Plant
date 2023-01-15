import { Injectable } from '@angular/core';
import { elementAt, timer } from 'rxjs';
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
              this.meltdownSequence(powerline);
            }
          };
        });
      });
    })
  }

  getPowerGrid(): IPowerline[] {
    return this.powergrid;
  }

  getNumberOfPowerlines(): number {
    if (this.powergrid.length > 0) {
      let name = 0;
      this.powergrid.forEach(powerline => {
        powerline.reactors.forEach(r => {
          if (r.name > name) {
            name = r.name;
          }
        });
      });
      return Math.ceil(name / 3);
    }
    return 0;
  }

  addReactor(): void {
    let done = 0;
    this.powergrid.forEach((powerline, index) => {
      let length = powerline.reactors.length;
      if (!done) {
        if (length < 3) {
          let name = 0;
          powerline.reactors.forEach(r => {
            name += r.name
          });
          if (length == 2) {
            name = (index * 9 + 6) - name;
          } else {
            let sum = (index + 1) * 3
            switch (sum - name) {
              case 0:
                name = name - 2;
                break;
              case 1:
                name = name - 1;
                break;
              case 2:
                name = name + 1;
                break;
              default:
                break;
            }
          }
          let reactor: IReactor = { name: name, temperature: 0, state: ReactorState.stopped };
          powerline.reactors.push(reactor);
          this.reactors++;
          done = 1;
        }
      }
      powerline.reactors.sort((x, y) => x.name - y.name);
    });

    if (!done) {
      let powerline: IPowerline = { reactors: [] }
      this.reactors++;
      let reactor: IReactor = { name: this.reactors, temperature: 0, state: ReactorState.stopped };
      powerline.reactors.push(reactor);
      this.powergrid.push(powerline);
    }
  }

  createPowergrid(): void {
    this.powergrid = [];
    let name = 1;
    let powerlines = Math.ceil(this.reactors / 3);
    for (let p = 1; p <= powerlines; p++) {
      let powerline: IPowerline = { reactors: [] };
      if (p == powerlines) {
        let leftoverReactors = 3 - (powerlines * 3 - this.reactors);
        for (let r = 1; r <= leftoverReactors; r++) {
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
          } else if (r.state == ReactorState.destruct) {
            if (powerline.reactors.length < 2) {
              let index = this.powergrid.indexOf(powerline);
              this.powergrid.splice(index, 1);
            } else {
              let index = powerline.reactors.indexOf(r);
              powerline.reactors.splice(index, 1);
            }
            this.reactors--;
          } else {
            r.temperature = 0;
          }
        }
        powerline.reactors.sort((x, y) => x.name - y.name);
      })
    });
  }

  genRandomTemp(): number {
    return Math.round(((Math.random() * (540 - 400) + 400) + Number.EPSILON) * 100) / 100;
  }

  updateTemp(temp: number): number {
    let max = temp + 5 * 20;
    let min = temp - 5 * 10;
    return Math.round(((Math.random() * (max - min) + min) + Number.EPSILON) * 100) / 100;
  }

  meltdownSequence(powerline: IPowerline): void {
    powerline.reactors.forEach(reactor => {
      if (reactor.state == ReactorState.running) {
        if (Math.random() < 0.5) {
          reactor.state = ReactorState.meltdown;
        } else {
          reactor.state = ReactorState.stopped;
        }
      }
    });
  }

  reset(): void {
    this.createPowergrid();
  }
}
