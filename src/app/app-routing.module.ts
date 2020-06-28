import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ObservableCreateComponent} from './observable-create/observable-create.component';
import {ObservableOperatorComponent} from './observable-operator/observable-operator.component';
import {MultipleComponent} from './multiple/multiple.component';

const routes: Routes = [
  { path: 'observable-create', component: ObservableCreateComponent },
  { path: 'observable-operator', component: ObservableOperatorComponent },
  { path: 'multiple', component: MultipleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
