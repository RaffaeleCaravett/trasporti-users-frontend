import { Component, OnInit } from '@angular/core';
import { FormsService } from './shared/services/forms.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'trasporti-users';

constructor(private formsService:FormsService,private toastr:ToastrService,private router:Router){}

  ngOnInit(): void {
    let trasportatore = localStorage.getItem('TAccessToken')
    let azienda = localStorage.getItem('AzAccessToken')
    let trasportatoreR = localStorage.getItem('TrRefreshToken')
    let aziendaR = localStorage.getItem('AzRefreshToken')
    if(trasportatore){
      this.formsService.verifyTrasportatoreToken(trasportatore).subscribe({
        next:(t:any)=>{
          localStorage.setItem('trasportatore',JSON.stringify(t))
        },
        error:(error:any)=>{
this.formsService.verifyTrasportatoreRToken(trasportatoreR!).subscribe({
  next:(tokens:any)=>{
localStorage.setItem('TrAccessToken',tokens.accessToken)
localStorage.setItem('TrRefreshToken',tokens.refreshToken)
this.formsService.setToken(tokens.accessToken)
this.formsService.authenticateUser(true)

},
  error:(error:any)=>{
    this.toastr.error("Non è stato possibile verificare la tua identità.")
  },
  complete:()=>{}
})
        },
        complete:()=>{}
      })
    }
if(azienda){
  this.formsService.verifyAziendaToken(azienda).subscribe({
    next:(a:any)=>{
      localStorage.setItem('azienda',JSON.stringify(a))
    },
    error:(error:any)=>{
this.formsService.verifyAziendaRToken(aziendaR!).subscribe({
next:(tokens:any)=>{
localStorage.setItem('AzAccessToken',tokens.accessToken)
localStorage.setItem('AzRefreshToken',tokens.refreshToken)
this.formsService.setToken(tokens.accessToken)
this.formsService.authenticateUser(true)

},
error:(error:any)=>{
this.toastr.error("Non è stato possibile verificare la tua identità.")
},
complete:()=>{}
})
    },
    complete:()=>{}
  })
}
  }
}
