import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObservableCreateComponent } from './observable-create/observable-create.component';
import { ObservableOperatorComponent } from './observable-operator/observable-operator.component';
import { MonitorControlComponent } from './monitor-control/monitor-control.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { ObservableMonitorComponent } from './observable-monitor/observable-monitor.component';
import { MultipleComponent } from './multiple/multiple.component';
import { SubjectComponent } from './subject/subject.component';

@NgModule({
  declarations: [
    AppComponent,
    ObservableCreateComponent,
    ObservableOperatorComponent,
    MonitorControlComponent,
    ObservableMonitorComponent,
    MultipleComponent,
    SubjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
