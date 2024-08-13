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
  toDo:string='Aggiungi un annuncio'
  aggiungiAnnuncioForm!:FormGroup
  aggiungiAnnuncioSubmitted:boolean=false
  year:number=0
  today = new Date()
  today1 = new Date()
  todayPlusAYear = new Date(this.today1.setDate(this.today1.getDate()+365))
  giorni : number[]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  mesi : number[]=[1,2,3,4,5,6,7,8,9,10,11,12]
  anni : number[]=[this.year,this.year+1]
constructor(private toastr:ToastrService,private officeService:OfficeService,private matDialog:MatDialog){}

  ngOnInit():void{
    localStorage.setItem('location','/office')
this.year = new Date().getFullYear()
        this.user=JSON.parse(localStorage.getItem('trasportatore')!)||JSON.parse(localStorage.getItem('azienda')!)
        if(this.user&&this.user.cognome){
          this.isTrasportatore=true
        }

this.aggiungiAnnuncioForm= new FormGroup({
  retribuzione: new FormControl('',Validators.required),
  da:new FormControl('',Validators.required),
  a:new FormControl('',Validators.required),
  anno:new FormControl('',[Validators.required,Validators.max(this.year+1),Validators.min(this.year)]),
  testo:new FormControl('',Validators.required),
  numeroPedane:new FormControl('',Validators.required)
})

      }

      setBackground(i:number,toDo:string){
        this.toDo=toDo
        this.aggiungiAnnuncioSubmitted=false
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
        this.aggiungiAnnuncioSubmitted=true
if(this.aggiungiAnnuncioForm.valid){

}else{
this.toastr.error('Completa correttamente il form prima di inserire l\'annuncio')
}

      }
      shw(value:string){
let array = value.split('-')
console.log(array)
      }
    }
