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
private spedizione:string = '/spedizione'

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
getByRetribuzioneId(retribuzione1:number,retribuzione2:number,page:number,size:number,orderBy:string){
  return this.httpClient.delete(environment.API_URL+this.annuncio+this.byRetribuzioneId+`/${retribuzione1}/${retribuzione2}?page=${page}&size=${size}&orderBy=${orderBy}`)
}
getByData(anno1:number,mese1:number,giorno1:number,anno2:number,mese2:number,giorno2:number,page:number,size:number,orderBy:string){
  return this.httpClient.delete(environment.API_URL+this.annuncio+this.byData+`/${anno1}/${mese1}/${giorno1}/${anno2}/${mese2}/${giorno2}?page=${page}&size=${size}&orderBy=${orderBy}`)
}
postSpedizione(spedizioneDTO:any){
  return this.httpClient.post(environment.API_URL+this.spedizione,spedizioneDTO)
}
}
