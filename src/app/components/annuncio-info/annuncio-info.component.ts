import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-annuncio-info',
  templateUrl: './annuncio-info.component.html',
  styleUrls: ['./annuncio-info.component.scss']
})
export class AnnuncioInfoComponent implements OnInit{

  annuncioForm!:FormGroup
  year:number=0
constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }


ngOnInit():void{
this.year=new Date().getFullYear()
console.log(this.data)
this.annuncioForm = new FormGroup({
  retribuzione: new FormControl(this.data.retribuzione?.value||this.data.retribuzione,Validators.required),
  da:new FormControl(this.data.da?.value||this.data.da,Validators.required),
  a:new FormControl(this.data.a?.value||this.data.a,Validators.required),
  data:new FormControl(this.data.data?.value||this.data.data,[Validators.required,Validators.max(this.year+1),Validators.min(this.year)]),
  testo:new FormControl(this.data.testo?.value||this.data.testo,Validators.required),
  numeroPedane:new FormControl(this.data.testo?.value||this.data.testo,Validators.required)
})


}
}
