import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/shared/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

user:any
isTrasportatore:boolean=false
notifications:any
constructor(private homeService:HomeService,private toastr:ToastrService){}

ngOnInit():void{
    localStorage.setItem('location','/home')
this.user=JSON.parse(localStorage.getItem('Trasportatore')!)||JSON.parse(localStorage.getItem('Azienda')!)
if(this.user&&this.user.cognome){
  this.isTrasportatore=true
}

if(this.isTrasportatore){
this.homeService.getNotificationByTransporterIdAndNotificationStateAndSender(this.user.id,'Emessa','az').subscribe({
  next:(data:any)=>{
    this.notifications=data
  },
  error:(error:any)=>{
    this.toastr.error(error.error.message||error.error.messageList[0]||"E' stato impossibile recuperare le notifiche.")
  },
  complete:()=>{}
})
}else{
  this.homeService.getNotificationByAziendaIdAndNotificationStateAndSender(this.user?.id,'Emessa','tr').subscribe({
    next:(data:any)=>{
      this.notifications=data
    },
    error:(error:any)=>{
      this.toastr.error(error.error.message||error.error.messageList[0]||"E' stato impossibile recuperare le notifiche.")
    },
    complete:()=>{}
  })

}
  }
}
