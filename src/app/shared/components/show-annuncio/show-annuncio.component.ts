import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsService } from '../../services/forms.service';

@Component({
  selector: 'app-show-annuncio',
  templateUrl: './show-annuncio.component.html',
  styleUrls: ['./show-annuncio.component.scss']
})
export class ShowAnnuncioComponent implements OnInit{
user:any

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private formsService:FormsService){}

ngOnInit(): void {
  this.user=this.formsService.getUser()
}

richiedi(){}
}
