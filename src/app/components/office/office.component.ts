import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OfficeService } from 'src/app/shared/services/office.service';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent  implements OnInit{
  user:any
  isTrasportatore:boolean=false
  azioni:string[]=['Aggiungi un annuncio','Monitora un annuncio','Modifica il profilo','Blocca un Trasportatore','Monitora le tue statistiche']
  toDo:string=''
  aggiungiAnnuncioForm!:FormGroup

constructor(private toastr:ToastrService,private officeService:OfficeService,private matDialog:MatDialog){}

  ngOnInit():void{
    localStorage.setItem('location','/office')

        this.user=JSON.parse(localStorage.getItem('trasportatore')!)||JSON.parse(localStorage.getItem('azienda')!)
        if(this.user&&this.user.cognome){
          this.isTrasportatore=true
        }

this.aggiungiAnnuncioForm= new FormGroup({
  retribuzione: new FormControl('',Validators.required),
  da:new FormControl('',Validators.required),
  a:new FormControl('',Validators.required),
  giorno:new FormControl('',Validators.required),
  mese:new FormControl('',Validators.required),
  anno:new FormControl('',Validators.required),
  testo:new FormControl('',Validators.required),
  numeroPedane:new FormControl('',Validators.required)
})

      }

      setBackground(i:number,toDo:string){
        this.toDo=toDo
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


      addAnnuncio(){
if(this.aggiungiAnnuncioForm.valid){

}else{

}

      }
    }
