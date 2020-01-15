import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ObservableCreateComponent} from './observable-create/observable-create.component';
import {ObservableOperatorComponent} from './observable-operator/observable-operator.component';

const routes: Routes = [
  { path: 'observable-create', component: ObservableCreateComponent },
  { path: 'observable-operator', component: ObservableOperatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
