import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserInfoModule } from '../../shared/components/user-info/user-info.module';
import { AziendaOfficeComponent } from 'src/app/shared/components/azienda-office/azienda-office.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from 'src/app/shared/services/chat.service';

@NgModule({
  declarations: [HomeComponent, ChatComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    UserInfoModule,
  ],
  providers: [AziendaOfficeComponent, ChatService],
  bootstrap: [HomeComponent],
  exports: [ChatComponent],
})
export class HomeModule {}
