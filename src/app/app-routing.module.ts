import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ObservableCreateComponent} from './observable-create/observable-create.component';
import {ObservableOperatorComponent} from './observable-operator/observable-operator.component';
import {MultipleComponent} from './multiple/multiple.component';
import {SubjectComponent} from './subject/subject.component';
import {HighObservableComponent} from './high-observable/high-observable.component';
import {ErrorHandleComponent} from './error-handle/error-handle.component';

const routes: Routes = [
  { path: 'observable-create', component: ObservableCreateComponent },
  { path: 'observable-operator', component: ObservableOperatorComponent },
  { path: 'multiple', component: MultipleComponent },
  { path: 'subject', component: SubjectComponent },
  { path: 'high-observable', component: HighObservableComponent },
  { path: 'error-handle', component: ErrorHandleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
