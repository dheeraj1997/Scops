import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ChartJSComponent } from './chartjs.component';
import { ChartJSRoutingModule } from './chartjs-routing.module';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    ChartJSRoutingModule,
    ChartsModule,
    HttpModule
  ],
  declarations: [ ChartJSComponent ]
})
export class ChartJSModule { }
