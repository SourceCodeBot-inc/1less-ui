import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { HomePageComponent } from './pages/home/home.page-component';
import { VisualizeModule } from '@modules/visualize/visualize.module';
import { PointOfSellComponent } from './components/point-of-sell/point-of-sell.component';
import { SmartBinComponent } from './components/smart-bin/smart-bin.component';
import { IconPipe } from './pipes/icon.pipe';
import { ThrowControlComponent } from './components/throw-control/throw-control.component';


@NgModule({
  declarations: [
    HomePageComponent,
    PointOfSellComponent,
    SmartBinComponent,
    IconPipe,
    ThrowControlComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    VisualizeModule
  ]
})
export class DashboardModule { }
