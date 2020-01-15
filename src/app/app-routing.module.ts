import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ObservableCreateComponent} from './observable-create/observable-create.component';

const routes: Routes = [
  { path: 'observable-create', component: ObservableCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
