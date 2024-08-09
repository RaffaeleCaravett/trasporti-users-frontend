import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/core/environment';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  private auth:string = '/auth'
  private citta:string = '/citta'
  private settori:string = '/settori'
  private regione:string='/regione'

  constructor(private http:HttpClient) { }

getCities(){
  return this.http.get(environment.API_URL+this.auth+this.citta)
}
getSettori(){
  return this.http.get(environment.API_URL+this.auth+this.settori)
}
getRegionByCity(city:string){
  return this.http.get(environment.API_URL+this.auth+this.regione+`/city`)
}

}
