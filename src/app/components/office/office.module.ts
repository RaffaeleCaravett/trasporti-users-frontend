import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OfficeComponent } from "./office.component";
import { OfficeRoutingModule } from "./office-routing.module";
import { UserInfoModule } from "../user-info/user-info.module";
import { ReactiveFormsModule } from "@angular/forms";
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  declarations: [
    OfficeComponent,
  ],
  imports: [
    CommonModule,
    OfficeRoutingModule,
    UserInfoModule,
    ReactiveFormsModule,
    MatSliderModule
  ],
 providers: [
],
  bootstrap: [OfficeComponent]
})
export class OfficeModule { }
