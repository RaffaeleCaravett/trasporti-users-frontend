import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit{
@Input() user:any
@Input() isTrasportatore!:boolean
poloRecensioni:string=''
recensioniNegative:any[]=[]
recensioniPositive:any[]=[]
recensioniClass:string =''
ngOnInit(): void {
    this.recensioniNegative= this.user.recensioniRicevute.filter((r:any)=>{return r.poloRecensione=='negativa'})
    this.recensioniPositive= this.user.recensioniRicevute.filter((r:any)=>{return r.poloRecensione=='positiva'})
  this.recensioniNegative>this.recensioniPositive?this.poloRecensioni="Gli utenti ti hanno reputato negativamente":this.recensioniNegative<this.recensioniPositive?this.poloRecensioni="Gli utenti ti hanno reputato positivamente":this.recensioniNegative==this.recensioniPositive?this.poloRecensioni="Il giudizio non pende ad nessuna parte.":"";
switch(this.poloRecensioni){
  case "":{

  }
  break;
  case "":{

  }
  break;
  case "":{

  }
  break;
  default:{

  }
  break;
}
}
}
