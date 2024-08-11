import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OfficeComponent } from "./office.component";
import { OfficeRoutingModule } from "./office-routing.module";

@NgModule({
  imports: [
    CommonModule,
    OfficeRoutingModule
  ],
 providers: [
],
  bootstrap: [OfficeComponent]
})
export class OfficeModule { }
