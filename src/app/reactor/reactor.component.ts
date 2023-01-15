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
  @Input() state!: ReactorState;
  @Output() stateChanged = new EventEmitter<IReactor>();
  @Input() temperature!: number;

  @Input() unit!: string;
  btnText: string = "Start";

  constructor() { }

  ngOnInit(): void {
  }

  getState(): string {
    return ReactorState[this.state];
  }

  changeState(): void {
    if (this.getState() == "stopped") {
      this.state = ReactorState.running;
      this.btnText = "Stop";
    } else {
      this.state = ReactorState.stopped;
      this.btnText = "Start";
    }

    this.sendEvent();
    //let reactor: IReactor = { name: parseInt(this.name.replace(/\D/g, '')), temperature: this.temperature, state: this.state }
    //this.stateChanged.emit(reactor);
  }

  remove(): void {
    console.log(this);
    this.state = ReactorState.destruct;
    this.sendEvent();
  }

  sendEvent(): void {
    let reactor: IReactor = { name: parseInt(this.name.replace(/\D/g, '')), temperature: this.temperature, state: this.state }
    this.stateChanged.emit(reactor);
  }
}
