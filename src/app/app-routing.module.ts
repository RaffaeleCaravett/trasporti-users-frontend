import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './components/forms/forms.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './core/AuthGuard';

const routes: Routes = [
  {
    path:':id',
    component:FormsComponent
  },
  {
    path:'home',
    component:HomeComponent, canActivate: [AuthGuard]
  },
  {
    path:'**',
    component:FormsComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
