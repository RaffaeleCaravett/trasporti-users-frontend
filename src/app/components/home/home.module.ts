import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "./home-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { UserInfoModule } from "../../shared/components/user-info/user-info.module";

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
],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
