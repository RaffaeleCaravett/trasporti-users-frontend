import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsComponent } from './components/forms/forms.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AnnuncioInfoComponent } from './components/annuncio-info/annuncio-info.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthTokenInterceptor } from './core/token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SkeletonLoaderComponent } from './shared/components/skeleton-loader/skeleton-loader.component';
import { TrasportatoreOfficeComponent } from './shared/components/trasportatore-office/trasportatore-office.component';
import { AziendaOfficeComponent } from './shared/components/azienda-office/azienda-office.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    FormsComponent,
    NotFoundComponent,
    AnnuncioInfoComponent,
    ResetPasswordComponent,
    ProfileComponent,
    TrasportatoreOfficeComponent,
    AziendaOfficeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
 providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenInterceptor,
    multi: true,
  },
    provideAnimations(),
    provideToastr()
],
  bootstrap: [AppComponent]
})
export class AppModule { }
