import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserInfoModule } from '../../shared/components/user-info/user-info.module';
import { AziendaOfficeComponent } from 'src/app/shared/components/azienda-office/azienda-office.component';
import { ChatComponent } from './chat/chat.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [HomeComponent, ChatComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    UserInfoModule,
    MatProgressSpinnerModule
  ],
  providers: [AziendaOfficeComponent],
  bootstrap: [HomeComponent],
  exports: [ChatComponent],
})
export class HomeModule {}
