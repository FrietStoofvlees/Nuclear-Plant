import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ReactorComponentComponent } from './reactor-component/reactor-component.component';
import { TemperaturePipePipe } from './temperature-pipe.pipe';
import { MainWidgetComponent } from './main-widget/main-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactorComponentComponent,
    TemperaturePipePipe,
    MainWidgetComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
