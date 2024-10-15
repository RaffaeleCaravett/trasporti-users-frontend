import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "./home-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { UserInfoModule } from "../../shared/components/user-info/user-info.module";
import { AziendaOfficeComponent } from "src/app/shared/components/azienda-office/azienda-office.component";

@NgModule({
  declarations:[
HomeComponent
  ],
 imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    UserInfoModule
  ],
 providers: [
  AziendaOfficeComponent
],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
