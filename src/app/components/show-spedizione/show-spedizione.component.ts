import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-spedizione',
  templateUrl: './show-spedizione.component.html',
  styleUrls: ['./show-spedizione.component.scss']
})
export class ShowSpedizioneComponent {
  spedizione:any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    console.log(data)
  }

  ngOnInit(): void {
  this.spedizione=this.data
  }
}
