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
  private chat:string = '/chat'
  private messaggi:string = '/messaggi'
  private chatByAzienda:string ='/byAzId'
  private chatByTrasportatore:string ='/byTId'
  private chatByAziendaAndTr:string = '/byAziendaIdAndTrasportatoreId'

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
getChatsByAziendaId(azId:number){
  return this.http.get(environment.API_URL+this.azienda+this.chat+this.chatByAzienda+`/${azId}`)
}
getChatsByTrId(azId:number){
  return this.http.get(environment.API_URL+this.trasportatore+this.chat+this.chatByTrasportatore+`/${azId}`)
}
getChatsByAziendaIdAndTId(azId:number,tId:number){
  return this.http.get(environment.API_URL+this.azienda+this.chat+this.chatByAziendaAndTr+`/${azId}/${tId}`)
}
postChat(aziendaId:number,trasportatoreId:number){
  let chatDTO = {
azienda_id:aziendaId,
trasportatore_id:trasportatoreId
  }
return this.http.post(environment.API_URL+this.azienda+this.chat,chatDTO)
}

sendMessage(message:any){
  if(message&&message.senderType=='Azienda'){
return this.http.post(environment.API_URL+this.azienda+this.messaggi,message)
  }else{
    return this.http.post(environment.API_URL+this.trasportatore+this.messaggi,message)
  }
}
getChatById(role:string,id:number,type:string){
if(role=='Azienda'){
return this.http.get(environment.API_URL+this.azienda+this.chat+`/${id}`)
}else{
  return this.http.get(environment.API_URL+this.trasportatore+this.chat+`/${id}`)
}
}
}
