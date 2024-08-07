import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './components/forms/forms.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path:'',
    component:FormsComponent
  },
  {
    path:'forms:id',
    component:FormsComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'**',
    component:FormsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
