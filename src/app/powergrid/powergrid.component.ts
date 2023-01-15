import { Component, Input, OnInit } from '@angular/core';
import { IReactor, IPowerline } from '../ireactor';
import { ReactorDataService } from '../reactor-data.service';

@Component({
  selector: 'app-powergrid',
  templateUrl: './powergrid.component.html',
  styleUrls: ['./powergrid.component.scss']
})
export class PowergridComponent implements OnInit {

  @Input() plants!: number;
  @Input() unit!: string;

  constructor(private data: ReactorDataService) { }

  ngOnInit(): void {
  }

  getPowerlines(): number {
    return this.data.getNumberOfPowerlines();
  }

  getPowerline(index: number): IPowerline {
    let powerlines = this.data.getPowerGrid();
    return powerlines[index];
  }
}
