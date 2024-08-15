import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-annuncio-info',
  templateUrl: './annuncio-info.component.html',
  styleUrls: ['./annuncio-info.component.scss']
})
export class AnnuncioInfoComponent implements OnInit{

  annuncioForm!:FormGroup
constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }


ngOnInit():void{
  let input = document.getElementById('d') as HTMLInputElement

  console.log(this.data)
}
}
