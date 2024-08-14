import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { environment } from "src/app/core/environment";

@Injectable({
  providedIn: 'root'
})
export class OfficeService{

private annuncio:string = '/annuncio'
private byAzienda:string ='/byAzienda'

constructor(private httpClient:HttpClient){}

publicAnnuncio(annuncioDTO:any){
  return this.httpClient.post(environment.API_URL+this.annuncio,annuncioDTO)
}
putAnnuncioByAzienda(annuncioDTO:any,annuncioId:number,aziendaId:number){
  return this.httpClient.post(environment.API_URL+this.annuncio,annuncioDTO)
}

}
