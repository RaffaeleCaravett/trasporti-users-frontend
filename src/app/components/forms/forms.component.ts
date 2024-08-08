import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit{
section:string = 'signup'
loginForm!:FormGroup
signupForm!:FormGroup
cities:any[]=[]
typeFormValue:string=''
trasportatoreForm!:FormGroup
aziendaForm!:FormGroup
ngOnInit():void{
this.loginForm=new FormGroup({
  email:new FormControl('',Validators.required),
  password:new FormControl('',[Validators.required,Validators.minLength(6)])
})
this.signupForm=new FormGroup({
  citta:new FormControl('',Validators.required),
  regione:new FormControl('',Validators.required),
  indirizzo:new FormControl('',Validators.required),
  cap:new FormControl('',Validators.required),
  email:new FormControl('',Validators.required),
  password:new FormControl('',[Validators.required,Validators.minLength(6)]),
  type:new FormControl('',Validators.required)
})
this.trasportatoreForm= new FormGroup({
  nome:new FormControl('',Validators.required),
  cognome:new FormControl('',Validators.required),
  eta:new FormControl('',Validators.required),
  codiceFiscale:new FormControl('',[Validators.required]),
  partitaIva:new FormControl('',[Validators.required]),
  flottaMezzi:new FormControl('',Validators.required)
})
this.aziendaForm=  new FormGroup({
  nomeAzienda:new FormControl('',Validators.required),
  fatturatoMedio:new FormControl('',Validators.required),
  numeroDipendenti:new FormControl('',Validators.required),
  settore:new FormControl('',[Validators.required]),
  partitaIva:new FormControl('',[Validators.required])
})
}
login(){

}
signup(){

}
}
