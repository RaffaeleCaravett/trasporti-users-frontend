import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "src/app/core/environment"

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private notifica:string = '/notifica'
  private notificaRecensione:string = '/notificaRecensione'
  private trasportatore:string ='/trasportatore'
  private azienda:string ='/azienda'
  private jasper:string = '/jasper'
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
getAziende(page:number,size:number,orderBy:string){
  return this.http.get(environment.API_URL+this.trasportatore+this.azienda+`?page=${page||0}&size=${size||10}&orderBy=${orderBy||'id'}`)
}
getNotificheRecensioneRicevuta(trasportatoreId:number){
return this.http.get(environment.API_URL+this.trasportatore+this.notificaRecensione+`/TId/${trasportatoreId}`)
}
readTNotifications(notifiche:any[]){
  return this.http.post(environment.API_URL+this.trasportatore+this.notificaRecensione+`/leggi`,notifiche)
}
readNotifications(notifiche:any[],aziendaId:number){
return this.http.post(environment.API_URL+this.azienda+this.notifica+`/leggi/${aziendaId}`,notifiche)
}
acceptNotification(notificationId:number,aziendaId:number){
  return this.http.get(environment.API_URL+this.azienda+this.notifica+`/accetta/${notificationId}/${aziendaId}`, {responseType: 'blob' as 'json' })
}
rejectNotification(notificationId:number,aziendaId:number){
  return this.http.get(environment.API_URL+this.azienda+this.notifica+`/rifiuta/${notificationId}/${aziendaId}`)
}
downloadRequestDocument(spedizioneId:number,trasportatoreId:number){
  return this.http.get(environment.API_URL+this.trasportatore+this.jasper+`/${spedizioneId}/${trasportatoreId}`, {responseType: 'blob' as 'json' })
}
}
