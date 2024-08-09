import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormsService } from 'src/app/shared/services/forms.service';

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
settori:any[]=[]
typeFormValue:string=''
trasportatoreForm!:FormGroup
aziendaForm!:FormGroup
submitted:boolean=false
submittedLogin:boolean=false

constructor(private formsService:FormsService,private toastr:ToastrService){}

ngOnInit():void{
this.loginForm=new FormGroup({
  email:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
  password:new FormControl('',[Validators.required,Validators.minLength(6)])
})
this.signupForm=new FormGroup({
  citta:new FormControl('',Validators.required),
  regione:new FormControl('',Validators.required),
  indirizzo:new FormControl('',Validators.required),
  cap:new FormControl('',Validators.required),
  email:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
  password:new FormControl('',[Validators.required,Validators.minLength(6)]),
  type:new FormControl('',Validators.required)
})
this.trasportatoreForm= new FormGroup({
  nome:new FormControl('',Validators.required),
  cognome:new FormControl('',Validators.required),
  eta:new FormControl('',[Validators.required,Validators.min(18)]),
  codiceFiscale:new FormControl('',[Validators.required,Validators.pattern('^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$')]),
  partitaIva:new FormControl('',[Validators.required,Validators.minLength(11)]),
  flottaMezzi:new FormControl('',Validators.required)
})
this.aziendaForm=  new FormGroup({
  nomeAzienda:new FormControl('',Validators.required),
  fatturatoMedio:new FormControl('',Validators.required),
  numeroDipendenti:new FormControl('',Validators.required),
  settore:new FormControl('',[Validators.required]),
  partitaIva:new FormControl('',[Validators.required,Validators.minLength(11)])
})


this.formsService.getCities().subscribe({
  next:(cities:any)=>{
this.cities=cities
  },
  error:(err:any)=>{
    this.toastr.error(err.error.message||err.error.messageList[0])
  },
  complete:()=>{}
})
this.formsService.getSettori().subscribe({
  next:(settori:any)=>{
this.settori=settori
  },
  error:(err:any)=>{
    this.toastr.error(err.error.message||err.error.messageList[0])
  },
  complete:()=>{}
})
}

login(){
this.submittedLogin=true
if(this.loginForm.valid){

}else{
this.toastr.error("Assicurati di completare il form prima di accedere.");
}
}
signup(){
  this.submitted=true
if(this.signupForm.valid){

}else{
  this.toastr.error("Assicurati di inserire tutti i valori nei rispettivi campi.");
}
}

getRegioneByCity(city:string){
  let regione ;
   this.formsService.getRegionByCity(city).subscribe({
    next:(regione:any)=>{
      regione=regione;
      this.signupForm.controls['regione'].setValue(regione)
      this.signupForm.controls['cap'].setValue("87050")
      this.signupForm.updateValueAndValidity()
      console.log(regione)
    },
    error:(err:any)=>{
      console.log(err)
      this.toastr.error(err.error.message||err.error.messageList[0])
    },
    complete:()=>{}
  })
}


sectionChange(value:string){
  this.section=''
  setTimeout(()=>{
this.section=value
  },2000)
}
}
