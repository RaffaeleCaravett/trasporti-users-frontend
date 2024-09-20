import { Component, Input, OnChanges } from '@angular/core';

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


setButtonBg(index:number){
let div:HTMLCollection = document.getElementsByClassName('btn-personal')as HTMLCollection
for(let i = 0; i <=div.length-1;i++){
if(i==index){
  let singleDiv=  document.getElementsByClassName('btn-personal')[index] as HTMLDivElement
  singleDiv.style.background='gray'
}else{
  (document.getElementsByClassName('btn-personal')[i] as HTMLDivElement).style.background='rgb(245, 245, 245)'
  console.log(document.getElementsByClassName('btn-personal')[i])
}
}

}
}
