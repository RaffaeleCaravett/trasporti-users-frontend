import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

user:any
isTrasportatore:boolean=false
  ngOnInit():void{
    localStorage.setItem('location','/home')
this.user=JSON.parse(localStorage.getItem('trasportatore')!)||JSON.parse(localStorage.getItem('azienda')!)
console.log(this.user
)
if(this.user&&this.user.cognome){
  this.isTrasportatore=true
}
  }
}
