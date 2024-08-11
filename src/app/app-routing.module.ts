import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './components/forms/forms.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './core/AuthGuard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OfficeComponent } from './components/office/office.component';

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
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) ,canActivate:[AuthGuard]
  },
  {
    path:'office',
    component:OfficeComponent,canActivate:[AuthGuard]
  },
  {
    path:'',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
