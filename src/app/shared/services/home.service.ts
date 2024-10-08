import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "src/app/core/environment"

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private notifica:string = '/notifica'
  private trasportatore:string ='/trasportatore'
  private azienda:string ='/azienda'


  constructor(private http:HttpClient) { }

getNotificationByTransporterIdAndNotificationStateAndSender(transporterId:number,notificationState:string,sender:string){
  return this.http.get(environment.API_URL+this.trasportatore+this.notifica+`/${transporterId}/${notificationState}/${sender}`)
}
getNotificationByAziendaIdAndNotificationStateAndSender(aziendaId:number,notificationState:string,sender:string){
  return this.http.get(environment.API_URL+this.azienda+this.notifica+`/${aziendaId}/${notificationState}/${sender}`)
}
getAnnunciByCity(){}
getAnnunci(){}
getAnnunciByPrice(){}
getAnnunciByCategoria(){}
}
