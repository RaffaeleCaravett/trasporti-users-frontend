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


setButtonBg(className:string){

}
}
