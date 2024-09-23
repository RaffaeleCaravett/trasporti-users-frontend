import { Component, Input, OnChanges } from '@angular/core';
import { OfficeService } from '../../services/office.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { errors } from 'src/app/core/errors';

@Component({
  selector: 'app-trasportatore-office',
  templateUrl: './trasportatore-office.component.html',
  styleUrls: ['./trasportatore-office.component.scss']
})
export class TrasportatoreOfficeComponent implements OnChanges{
@Input() user:any
@Input() toDo:string=''
@Input() azioni:string[]=[]
filters:string[]=[]
isLoading:boolean=false
annunci: any
annunciCopy:any[]=[]
annunciOption:any[]=[false,0]

constructor(private officeService:OfficeService,private toastr:ToastrService){}

ngOnChanges():void{
if(this.toDo=='Cerca un annuncio'){
this.filters=[
  'Tutti',
  'Retribuzione',
  'Data annuncio',
  'Data spedizione',
  'Nome azienda',
  'Numero pedane'
]
}else{
  this.filters=[]
}
}


setButtonBg(index:number,action:string){
let div:HTMLCollection = document.getElementsByClassName('btn-personal')as HTMLCollection
for(let i = 0; i <=div.length-1;i++){
if(i==index){
  let singleDiv=  document.getElementsByClassName('btn-personal')[index] as HTMLDivElement
  singleDiv.style.background='rgb(212, 212, 212)'
}else{
  (document.getElementsByClassName('btn-personal')[i] as HTMLDivElement).style.background='rgb(245, 245, 245)'
}
}
this.isLoading=true
switch(action){
  case('Tutti'):
  this.getAllAnnunci()
  break;
  case('Retribuzione'):
  break;
  case('Data annuncio'):
  break;
  case('Data spedizione'):
  break;
  case('Nome azienda'):
  break;
  case('Numero pedane'):
  break;
  default:
    break;
}
setTimeout(()=>{
this.isLoading=false
},1000)

}

getAllAnnunci(){
this.officeService.getAllAnnunci().subscribe({
  next:(data:any)=>{
this.annunci = data
this.annunciCopy=this.annunci?.content
  },
  error:(error:any)=>{
this.toastr.error(error?.message||error?.error?.message||errors.request_error)
  },
  complete:()=>{
    this.isLoading=false
  }
})
}

changeAnnunciOption(value:boolean,id:number){
this.annunciOption=[!value,id]
}
openAnnunciInfo(annuncio:any){

}
}
