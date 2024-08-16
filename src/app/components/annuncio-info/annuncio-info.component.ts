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
  let input = document.getElementById('d') as HTMLInputElement
this.year=new Date().getFullYear()
this.annuncioForm = new FormGroup({
  retribuzione: new FormControl('',Validators.required),
  da:new FormControl('',Validators.required),
  a:new FormControl('',Validators.required),
  data:new FormControl('',[Validators.required,Validators.max(this.year+1),Validators.min(this.year)]),
  testo:new FormControl('',Validators.required),
  numeroPedane:new FormControl('',Validators.required)
})

  console.log(this.data)
}
}
