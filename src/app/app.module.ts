import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ReactorComponent } from './reactor/reactor.component';
import { TemperaturePipePipe } from './temperature-pipe.pipe';
import { MainWidgetComponent } from './main-widget/main-widget.component';
import { PowergridComponent } from './powergrid/powergrid.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactorComponent,
    TemperaturePipePipe,
    MainWidgetComponent,
    PowergridComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
