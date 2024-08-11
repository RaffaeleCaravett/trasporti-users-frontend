import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideToastr } from "ngx-toastr";
import { AuthTokenInterceptor } from "src/app/core/token.interceptor";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
 providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenInterceptor,
    multi: true,
  },
    provideAnimations(),
    provideToastr()
],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
