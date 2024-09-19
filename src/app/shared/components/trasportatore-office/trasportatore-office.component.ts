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

ngOnChanges():void{
  console.log(this.toDo)
}
}
