import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "src/app/core/environment"

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  private notifica:string = '/notifica'
  private trasportatore:string ='/tr'
  private azienda:string ='/az'


  constructor(private http:HttpClient) { }

getNotificationByTransporterIdAndNotificationState(transporterId:number,notificationState:string){
  return this.http.get(environment.API_URL+this.notifica+this.trasportatore+`/${transporterId}/${notificationState}`)
}
getNotificationByAziendaIdAndNotificationState(aziendaId:number,notificationState:string){
  return this.http.get(environment.API_URL+this.notifica+this.azienda+`/${aziendaId}/${notificationState}`)
}
}
