import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  recensioneTForm!:FormGroup
  poli:string[]=['Positiva','Negativa']

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
  }

inviaRecensione(){

}
}
