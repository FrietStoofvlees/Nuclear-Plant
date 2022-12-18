import { Component, OnInit, Input } from '@angular/core';
import { ReactorState } from '../reactor-state';

@Component({
  selector: 'app-reactor',
  templateUrl: './reactor.component.html',
  styleUrls: ['./reactor.component.scss']
})
export class ReactorComponent implements OnInit {

  state: ReactorState = ReactorState.stopped;
  temperature: number = 300;
  @Input() unit!: string;
  @Input() name!: string;
  btnText: string = "Start";

  constructor() { }

  ngOnInit(): void {
  }

  changeState(): void {
    if (this.btnText == "Start") {
      this.state = ReactorState.running;
      this.btnText = "Stop";
    } else {
      this.state = ReactorState.stopped;
      this.btnText = "Start";
    }
  }

  getState(): string {
    return ReactorState[this.state];
  }
}
