import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "src/app/core/environment"

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private T:string = '/trasportatore'
  private Az:string = '/azienda'
  private recensione:string = '/recensione'
  private paginated:string = '/paginated'

  constructor(private http:HttpClient) { }

getAzRecensioni(azId:number,stato:string,page:number,size:number,orderBy:string){
  return this.http.get(environment.API_URL+this.Az+this.recensione+this.paginated+`/${azId+'/'+stato+'?page='}`+page+'&size='+size+'&orderBy='+orderBy)
}
postAzRecensione(recensione:any){
  return this.http.post(environment.API_URL+this.Az+this.recensione,recensione)
}
putAzRecensioneById(azId:number,receId:number,recensione:any){
  return this.http.put(environment.API_URL+this.Az+this.recensione+`/${azId}/${receId}`,recensione)
}
deleteAzRecensione(TId:number,receId:number){
  return this.http.delete(environment.API_URL+this.Az+this.recensione+`/${TId}/${receId}`)
}
getTRecensioni(tId:number,stato:string,page:number,size:number,orderBy:string){
  return this.http.get(environment.API_URL+this.T+this.recensione+this.paginated+`/${tId+'/'+stato+'?page='}`+page+'&size='+size+'&orderBy='+orderBy)
}
postTRecensione(recensione:any){
  return this.http.post(environment.API_URL+this.T+this.recensione,recensione)
}
putTRecensioneById(tId:number,receId:number,recensione:any){
  return this.http.put(environment.API_URL+this.T+this.recensione+`/${tId}/${receId}`,recensione)
}
deleteTRecensione(azId:number,receId:number){
  return this.http.delete(environment.API_URL+this.T+this.recensione+`/${azId}/${receId}`)
}
}
