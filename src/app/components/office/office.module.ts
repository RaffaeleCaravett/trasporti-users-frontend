import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OfficeComponent } from "./office.component";
import { OfficeRoutingModule } from "./office-routing.module";
import { UserInfoModule } from "../user-info/user-info.module";
import { ReactiveFormsModule } from "@angular/forms";
import {MatSliderModule} from '@angular/material/slider';
import { SkeletonModuleModule } from "src/app/shared/modules/skeleton-module.module";

@NgModule({
  declarations: [
    OfficeComponent,
  ],
  imports: [
    CommonModule,
    OfficeRoutingModule,
    UserInfoModule,
    ReactiveFormsModule,
    MatSliderModule,
    SkeletonModuleModule
  ],
 providers: [
],
  bootstrap: [OfficeComponent]
})
export class OfficeModule { }
