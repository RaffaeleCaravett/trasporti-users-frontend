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
  private chatByAzienda:string ='/byAzId'

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
getTrasportatori(page:number,size:number,orderBy:string){
  return this.http.get(environment.API_URL+this.azienda+this.trasportatore+`?page=${page||0}&size=${size||10}&orderBy=${orderBy||'id'}`)
}
getChatsByAziendaId(azId:number){
  return this.http.get(environment.API_URL+this.azienda+this.chatByAzienda+`/${azId}`)
}
getChatsByAziendaIdAndTId(azId:number,tId:number){
  return this.http.get(environment.API_URL+this.azienda+this.chatByAzienda+`/${azId}/${tId}`)
}
}
