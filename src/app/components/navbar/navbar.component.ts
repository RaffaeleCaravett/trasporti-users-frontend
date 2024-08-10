import { Component } from '@angular/core';
import { FormsService } from 'src/app/shared/services/forms.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

isUserAuthenticated:boolean=false

constructor(private formsService:FormsService){
  this.formsService.isAuthenticatedUser.subscribe((value:boolean)=>{
    this.isUserAuthenticated=value
  })
}
logout(){

}
}
