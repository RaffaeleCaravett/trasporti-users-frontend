import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  recensioneTForm!:FormGroup
  poli:string[]=['Positiva','Negativa']

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
  }

  ngOnInit(): void {
      console.log(this.data.role)
      this.recensioneTForm = new FormGroup({
        polo:new FormControl('',Validators.required),
        message:new FormControl('')
      })
  }

inviaRecensione(){

}
}
