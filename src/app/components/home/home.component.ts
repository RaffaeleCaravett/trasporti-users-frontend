import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';
import { HomeService } from 'src/app/shared/services/home.service';
import { OfficeComponent } from '../office/office.component';
import { AziendaOfficeComponent } from 'src/app/shared/components/azienda-office/azienda-office.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

user:any
isTrasportatore:boolean=false
notifications:any
page:number=0;
size:number=0;
orderBy:string='id';
  transporters: any;
  isTLoading:boolean=false
  aOfficeComponent:AziendaOfficeComponent = inject(AziendaOfficeComponent);
constructor(private homeService:HomeService,private toastr:ToastrService){}

ngOnInit():void{
    localStorage.setItem('location','/home')
this.user=JSON.parse(localStorage.getItem('trasportatore')!)||JSON.parse(localStorage.getItem('azienda')!)
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
  this.getT(this.page,this.size,this.orderBy)
}
  }

  getT(page:number,size:number,orderBy:string){
    this.isTLoading=true;
this.homeService.getTrasportatori(page,size,orderBy).pipe(delay(2000)).subscribe({
  next:(data:any)=>{
    this.transporters=data
    this.isTLoading=false;
    console.log(this.transporters)
  },
  error:(error:any)=>{
    this.toastr.error(error.error.message||error.error.messageList[0]||"E' stato impossibile recuperare le notifiche.")
  },
  complete:()=>{}
})
  }

  openT(t:any){
this.aOfficeComponent.openT(t)
  }
}
