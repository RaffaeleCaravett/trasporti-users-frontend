import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
 imports: [
    CommonModule,
    HomeRoutingModule
  ],
 providers: [
],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
