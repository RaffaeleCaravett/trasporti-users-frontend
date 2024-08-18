import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-annuncio-info',
  templateUrl: './annuncio-info.component.html',
  styleUrls: ['./annuncio-info.component.scss']
})
export class AnnuncioInfoComponent implements OnInit{

  annuncioForm!:FormGroup
  year:number=0
  today = new Date()
  today1 = new Date()
  todayPlusAYear = new Date(this.today1.setDate(this.today1.getDate()+365))
  readonly:boolean=false
  showConfirm:boolean=false
constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }


ngOnInit():void{
this.year=new Date().getFullYear()
this.annuncioForm = new FormGroup({
  retribuzione: new FormControl(this.data.retribuzione?.value||this.data.retribuzione,Validators.required),
  da:new FormControl(this.data.da?.value||this.data.spedizione?.da,Validators.required),
  a:new FormControl(this.data.a?.value||this.data.spedizione?.a,Validators.required),
  data:new FormControl(this.data.data?.value||this.data.spedizione?.daSpedire,[Validators.required,Validators.max(this.year+1),Validators.min(this.year)]),
  testo:new FormControl(this.data.testo?.value||this.data.spedizione?.descrizioneMerce,Validators.required),
  numeroPedane:new FormControl(this.data.numeroPedane?.value||this.data.spedizione?.numeroPedane,Validators.required)
})
if(this.data&&!this.data.spedizione&&this.data.da){
  this.readonly=true
}

}



}
