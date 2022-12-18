import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Nuclear-Plant';
  plants = 10;
  unit = "K";

  setUnit(unit: string) {
    this.unit = unit;
  }
}
