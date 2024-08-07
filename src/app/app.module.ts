import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsComponent } from './components/forms/forms.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OfficeComponent } from './components/office/office.component';
import { AnnuncioInfoComponent } from './components/annuncio-info/annuncio-info.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    FormsComponent,
    HomeComponent,
    NotFoundComponent,
    OfficeComponent,
    AnnuncioInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
 providers: [
    provideAnimations(),
    provideToastr()
],
  bootstrap: [AppComponent]
})
export class AppModule { }
