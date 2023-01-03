import { Component, Input, OnInit } from '@angular/core';
import { IReactor } from '../ireactor';
import { ReactorDataService } from '../reactor-data.service';

@Component({
  selector: 'app-powergrid',
  templateUrl: './powergrid.component.html',
  styleUrls: ['./powergrid.component.scss']
})
export class PowergridComponent implements OnInit {

  @Input() plants!: number;
  @Input() unit!: string;
  reactors!: number;

  constructor(private data: ReactorDataService) { }

  ngOnInit(): void {
  }

  getPowerlines(): number {
    return this.data.getNumberOfPowerlines();
  }

  getReactorSet(index: number): IReactor[] {
    let array = this.data.getReactorArray();
    if (Array.isArray(array)) {
      array = array.slice(index * 3, (index + 1) * 3)
      console.log(array);
    }
    return array;
  }
}
