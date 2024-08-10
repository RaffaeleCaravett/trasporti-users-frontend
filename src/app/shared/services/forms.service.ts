import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthGuard } from 'src/app/core/AuthGuard';
import { environment } from 'src/app/core/environment';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  private auth:string = '/auth'
  private citta:string = '/citta'
  private settori:string = '/settori'
  private regione:string='/regione'
  private Tlogin:string = '/TLogin'
  private Alogin:string = '/AzLogin'
  private Tsignup:string = '/trasportatore'
  private Azsignup:string = '/azienda'
  private token:string =''


  constructor(private http:HttpClient,private authGuard:AuthGuard) { }

getCities(){
  return this.http.get(environment.API_URL+this.auth+this.citta)
}
getSettori(){
  return this.http.get(environment.API_URL+this.auth+this.settori)
}
getRegionByCity(city:string){
  return this.http.get(environment.API_URL+this.auth+this.regione+`/${city}`,{ responseType: 'text' })
}
TlogIn(body:any){
  return this.http.post(environment.API_URL+this.auth+this.Tlogin,body)
}
AlogIn(body:any){
  return this.http.post(environment.API_URL+this.auth+this.Alogin,body)
}
TsignUp(body:any){
  return this.http.post(environment.API_URL+this.auth+this.Tsignup,body)
}
AzsignUp(body:any){
  return this.http.post(environment.API_URL+this.auth+this.Azsignup,body)
}
getToken(){
  return this.token;
}
setToken(token:string){
 this.token=token;
}
authenticateUser(boolean:any){
  this.authGuard.authenticateUser(boolean)
}
}
