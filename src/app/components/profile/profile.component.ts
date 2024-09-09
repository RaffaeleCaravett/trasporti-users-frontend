import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OfficeService } from 'src/app/shared/services/office.service';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  recensioneTForm!:FormGroup
  poli:string[]=['Positiva','Negativa']

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private profileService:ProfileService, private toastr:ToastrService) {
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
  if(this.recensioneTForm.controls['polo'].valid){
if(this.data.role=='Trasportatore'){
this.profileService.postTRecensione(
  {

  }
)
}else{

}
}else{
this.toastr.show("Inserisci la valutazione")
}
}
}
