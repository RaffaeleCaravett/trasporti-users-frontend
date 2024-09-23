import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-annuncio',
  templateUrl: './show-annuncio.component.html',
  styleUrls: ['./show-annuncio.component.scss']
})
export class ShowAnnuncioComponent implements OnInit{


  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

ngOnInit(): void {

}
}
