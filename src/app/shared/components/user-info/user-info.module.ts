import { NgModule } from "@angular/core";
import { UserInfoComponent } from "./user-info.component";
import { CommonModule } from "@angular/common";
import { AppComponent } from "src/app/app.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
 providers: [
],
exports:[
  UserInfoComponent
],
bootstrap:[
  AppComponent
]
})
export class UserInfoModule { }
