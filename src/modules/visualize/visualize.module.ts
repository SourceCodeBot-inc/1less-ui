import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotlyExampleComponent } from './components/plotly-example/plotly-example.component';



import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    PlotlyExampleComponent
  ],
  exports: [PlotlyExampleComponent],
  imports: [
    CommonModule,
    PlotlyModule
  ]
})
export class VisualizeModule { }
