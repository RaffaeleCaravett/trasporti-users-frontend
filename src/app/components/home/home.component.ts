import { Component, OnInit } from '@angular/core';
import { FormsService } from 'src/app/shared/services/forms.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

user:any
isTrasportatore:boolean=false

constructor(private formsService:FormsService){}

ngOnInit():void{
    localStorage.setItem('location','/home')
this.user=JSON.parse(localStorage.getItem('trasportatore')!)||JSON.parse(localStorage.getItem('azienda')!)
if(this.user&&this.user.cognome){
  this.isTrasportatore=true
}


if(this.isTrasportatore){

}else{

}
  }
}
