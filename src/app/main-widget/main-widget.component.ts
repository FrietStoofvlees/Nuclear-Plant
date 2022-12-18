import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-main-widget',
  templateUrl: './main-widget.component.html',
  styleUrls: ['./main-widget.component.scss']
})
export class MainWidgetComponent implements OnInit {

  unit: string = "K";
  @Output() unitChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(newValue: string) {
    this.unit = newValue;
    this.unitChanged.emit(this.unit);
  }
}
