import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObservableCreateComponent } from './observable-create/observable-create.component';
import { ObservableOperatorComponent } from './observable-operator/observable-operator.component';

@NgModule({
  declarations: [
    AppComponent,
    ObservableCreateComponent,
    ObservableOperatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
