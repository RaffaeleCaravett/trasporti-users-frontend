import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OfficeService } from 'src/app/shared/services/office.service';
import { AnnuncioInfoComponent } from '../annuncio-info/annuncio-info.component';

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
  data:new FormControl('',[Validators.required,Validators.max(this.year+1),Validators.min(this.year)]),
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
  let dataDaSpedire = this.aggiungiAnnuncioForm.controls['data'].value.split('-')
const dialog = this.matDialog.open(AnnuncioInfoComponent,{data:this.aggiungiAnnuncioForm.controls})
dialog.afterClosed().subscribe((data:any)=>{
  if(data){
this.officeService.postSpedizione({
da:this.aggiungiAnnuncioForm.controls['da'].value,
a:this.aggiungiAnnuncioForm.controls['a'].value,
daSpedireAnno:dataDaSpedire[0],
daSpedireMese:dataDaSpedire[1],
daSpedireGiorno:dataDaSpedire[2],
descrizione:this.aggiungiAnnuncioForm.controls['testo'].value,
numeroPedane:this.aggiungiAnnuncioForm.controls['numeroPedane'].value,
azienda_id:this.user.id
}).subscribe({
next:(data:any)=>{
this.officeService.publicAnnuncio({
  retribuzione:this.aggiungiAnnuncioForm.controls['retribuzione'].value,
  azienda_id:this.user.id,
  spedizione_id:data.id
}).subscribe({
  next:(data:any)=>{
    this.toastr.show("Annuncio inserito correttamente")
    this.aggiungiAnnuncioForm.reset()
    this.aggiungiAnnuncioSubmitted=false
  },
  error:(error:any)=>{
    this.toastr.error(error.error.message||error.error.messageList[0]||"Qualcosa è andato storto nell'elaborazione della richiesta.")
  },
  complete:()=>{}
})
},
error:(error:any)=>{
  this.toastr.error(error.error.message||error.error.messageList[0]||"Qualcosa è andato storto nell'elaborazione della richiesta.")
},
complete:()=>{}
})
  }else{
    this.toastr.error('Non è stato inserito nessun annuncio.')
  }
})
}else{
this.toastr.error('Completa correttamente il form prima di inserire l\'annuncio')
}

      }

    }
