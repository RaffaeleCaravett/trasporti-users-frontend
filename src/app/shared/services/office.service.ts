import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { environment } from "src/app/core/environment";

@Injectable({
  providedIn: 'root'
})
export class OfficeService{

private annuncio:string = '/annuncio'
private byAzienda:string ='/byAzienda'
private byRetribuzioneId:string ='/byRetribuzioneId'
private byData:string ='/byData'

constructor(private httpClient:HttpClient){}

publicAnnuncio(annuncioDTO:any){
  return this.httpClient.post(environment.API_URL+this.annuncio,annuncioDTO)
}
putAnnuncioByAzienda(annuncioDTO:any,annuncioId:number,aziendaId:number){
  return this.httpClient.put(environment.API_URL+this.annuncio+`/${aziendaId}/${annuncioId}`,annuncioDTO)
}
deleteAnnuncioByAzienda(annuncioId:number,aziendaId:number){
  return this.httpClient.delete(environment.API_URL+this.annuncio+this.byAzienda+`/${aziendaId}/${annuncioId}`)
}
}
