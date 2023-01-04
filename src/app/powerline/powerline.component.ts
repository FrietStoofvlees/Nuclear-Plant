import { Component, Input, OnInit } from '@angular/core';
import { IReactor } from '../ireactor';
import { ReactorDataService } from '../reactor-data.service';

@Component({
  selector: 'app-powerline',
  templateUrl: './powerline.component.html',
  styleUrls: ['./powerline.component.scss']
})
export class PowerlineComponent implements OnInit {

  @Input() unit!: string;
  @Input() reactors!: IReactor[];

  constructor(private data: ReactorDataService) { }

  ngOnInit(): void {
  }

  setState(reactor: IReactor): void {
    this.data.updateArray(reactor);
  }
}
