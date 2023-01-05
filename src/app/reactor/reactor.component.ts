import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IReactor } from '../ireactor';
import { ReactorState } from '../reactor-state';

@Component({
  selector: 'app-reactor',
  templateUrl: './reactor.component.html',
  styleUrls: ['./reactor.component.scss']
})
export class ReactorComponent implements OnInit {

  @Input() name!: string;
  state: ReactorState = ReactorState.stopped;
  @Output() stateChanged = new EventEmitter<IReactor>();
  @Input() temperature!: number;

  @Input() unit!: string;
  btnText: string = "Start";

  constructor() { }

  ngOnInit(): void {
  }

  changeState(): void {
    if (this.getState() == "stopped") {
      this.state = ReactorState.running;
      this.btnText = "Stop";
    } else {
      this.state = ReactorState.stopped;
      this.btnText = "Start";
    }
    console.log(this.btnText);

    let reactor: IReactor = { name: parseInt(this.name.replace(/\D/g, '')), temperature: this.temperature, state: this.state }
    this.stateChanged.emit(reactor);
  }

  getState(): string {
    return ReactorState[this.state];
  }
}
