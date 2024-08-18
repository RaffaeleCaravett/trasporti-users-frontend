import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { environment } from "src/app/core/environment";

@Injectable({
  providedIn: 'root'
})
export class OfficeService{

private annuncio:string = '/annuncio'
private azienda:string = '/azienda'
private annuncioAzienda:string = '/azienda/annuncio'
private byAzienda:string ='/byAzienda'
private byRetribuzione:string ='/byRetribuzione'
private byData:string ='/byData'
private spedizione:string = '/spedizione'
private spedizioneAzienda:string = '/azienda/spedizione'
private andStato:string = 'AndStato'
constructor(private httpClient:HttpClient){}

publicAnnuncio(annuncioDTO:any){
  return this.httpClient.post(environment.API_URL+this.annuncioAzienda,annuncioDTO)
}
putAnnuncioByAzienda(annuncioDTO:any,annuncioId:number,aziendaId:number){
  return this.httpClient.put(environment.API_URL+this.annuncioAzienda+`/${aziendaId}/${annuncioId}`,annuncioDTO)
}
putSpedizioneByAzienda(spedizioneDTO:any,spedizioneId:number){
  return this.httpClient.put(environment.API_URL+this.spedizioneAzienda+`/${spedizioneId}`,spedizioneDTO)
}
deleteAnnuncioByAzienda(annuncioId:number,aziendaId:number){
  return this.httpClient.delete(environment.API_URL+this.annuncioAzienda+this.byAzienda+`/${aziendaId}/${annuncioId}`)
}
getByRetribuzione(retribuzione1:number,retribuzione2:number,page:number,size:number,orderBy:string){
  return this.httpClient.get(environment.API_URL+this.annuncioAzienda+this.byRetribuzione+`/${retribuzione1}/${retribuzione2}?page=${page}&size=${size}&orderBy=${orderBy}`)
}
getByData(anno1:number,mese1:number,giorno1:number,anno2:number,mese2:number,giorno2:number,page:number,size:number,orderBy:string){
  return this.httpClient.get(environment.API_URL+this.annuncioAzienda+this.byData+`/${anno1}/${mese1}/${giorno1}/${anno2}/${mese2}/${giorno2}?page=${page}&size=${size}&orderBy=${orderBy}`)
}
postSpedizione(spedizioneDTO:any){
  return this.httpClient.post(environment.API_URL+this.spedizioneAzienda,spedizioneDTO)
}
getAnnunciByAziendaId(aziendaId:number,page?:number,size?:number,orderBy?:string){
  return this.httpClient.get(environment.API_URL+this.annuncioAzienda+this.byAzienda+`Id/${aziendaId}?page=${page||0}&size=${size||10}&orderBy=${orderBy||"id"}`)
}
getAnnunciByAziendaIdAndStato(aziendaId:number,stato:string){
  return this.httpClient.get(environment.API_URL+this.annuncioAzienda+this.byAzienda+'Id'+this.andStato+`/${aziendaId}/${stato}`)
}
getAnnunciByAziendaIdAndStatoPubblicata(aziendaId:number){
  return this.httpClient.get(environment.API_URL+this.annuncioAzienda+this.byAzienda+'Id'+this.andStato+`Pubblicata/${aziendaId}`)
}
putAziendaById(aziendaId:number,aziendaDTO:{}){
  return this.httpClient.patch(environment.API_URL+this.azienda+"/me",aziendaDTO)
}
}

