import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent  implements OnInit{
  user:any
  isTrasportatore:boolean=false
  azioni:string[]=['Aggiungi un annuncio','Monitora un annuncio','Modifica il profilo','Blocca un Trasportatore','Monitora le tue statistiche']
  ngOnInit():void{
    localStorage.setItem('location','/office')

        this.user=JSON.parse(localStorage.getItem('trasportatore')!)||JSON.parse(localStorage.getItem('azienda')!)
        if(this.user&&this.user.cognome){
          this.isTrasportatore=true
        }

      }

      setBackground(i:number){
        let p = document.getElementsByClassName(`p-${i}`)[0] as HTMLElement
for(let a = 6 ;a<=10;a++){

  if(a==i){
  p.style.borderRadius='.3rem'
  p.style.background='red'
  p.style.color='white'
}else{
let otherP = document.getElementsByClassName(`p-${a}`)[0] as HTMLElement
  otherP.style.background='white'
  otherP.style.color='black'
}
}
      }
    }
