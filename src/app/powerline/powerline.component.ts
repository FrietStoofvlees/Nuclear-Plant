import { Component, Input, OnInit } from '@angular/core';
import { IReactor, IPowerline } from '../ireactor';
import { ReactorDataService } from '../reactor-data.service';

@Component({
  selector: 'app-powerline',
  templateUrl: './powerline.component.html',
  styleUrls: ['./powerline.component.scss']
})
export class PowerlineComponent implements OnInit {

  @Input() unit!: string;
  @Input() powerline!: IPowerline;

  constructor(private data: ReactorDataService) { }

  ngOnInit(): void {
  }

  getReactors(): IReactor[] {
    return this.powerline.reactors;
  }

  setState(reactor: IReactor): void {
    this.data.updateArray(reactor);
    console.log(reactor);
  }
}
