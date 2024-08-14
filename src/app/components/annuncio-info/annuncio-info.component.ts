import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-annuncio-info',
  templateUrl: './annuncio-info.component.html',
  styleUrls: ['./annuncio-info.component.scss']
})
export class AnnuncioInfoComponent implements OnInit{


constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }


ngOnInit():void{
  console.log(this.data)
}
}
