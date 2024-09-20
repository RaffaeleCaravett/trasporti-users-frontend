import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OfficeComponent } from "./office.component";
import { OfficeRoutingModule } from "./office-routing.module";
import { UserInfoModule } from "../../shared/components/user-info/user-info.module";
import { ReactiveFormsModule } from "@angular/forms";
import {MatSliderModule} from '@angular/material/slider';
import { SkeletonModuleModule } from "src/app/shared/modules/skeleton-module.module";
import { AziendaOfficeComponent } from "src/app/shared/components/azienda-office/azienda-office.component";
import { TrasportatoreOfficeComponent } from "src/app/shared/components/trasportatore-office/trasportatore-office.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    OfficeComponent,
    AziendaOfficeComponent,
    TrasportatoreOfficeComponent
  ],
  imports: [
    CommonModule,
    OfficeRoutingModule,
    UserInfoModule,
    ReactiveFormsModule,
    MatSliderModule,
    SkeletonModuleModule,
    MatProgressSpinnerModule
  ],
 providers: [
],
exports: [
  AziendaOfficeComponent,
  TrasportatoreOfficeComponent
],
  bootstrap: [OfficeComponent]
})
export class OfficeModule { }
