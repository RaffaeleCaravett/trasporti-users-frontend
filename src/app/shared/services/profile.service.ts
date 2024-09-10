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

getAzRecensioniStated(azId:number,stato:string,page:number,size:number,orderBy:string){
  return this.http.get(environment.API_URL+this.T+this.recensione+'Az'+this.paginated+'AndStato'+`/${azId+'/'+stato+'?page='}`+page+'&size='+size+'&orderBy='+orderBy)
}
getAzRecensioni(azId:number,page:number,size:number,orderBy:string){
  return this.http.get(environment.API_URL+this.T+this.recensione+'Az'+this.paginated+`/${azId+'?page='}`+page+'&size='+size+'&orderBy='+orderBy)
}
postAzRecensione(recensione:any){
  return this.http.post(environment.API_URL+this.T+this.recensione,recensione)
}
putAzRecensioneById(azId:number,receId:number,recensione:any){
  return this.http.put(environment.API_URL+this.T+this.recensione+`/${azId}/${receId}`,recensione)
}
deleteAzRecensione(TId:number,receId:number){
  return this.http.delete(environment.API_URL+this.T+this.recensione+`/${TId}/${receId}`)
}
getTRecensioniStated(tId:number,stato:string,page:number,size:number,orderBy:string){
  return this.http.get(environment.API_URL+this.Az+this.recensione+'T'+this.paginated+'AndStato'+`/${tId+'/'+stato+'?page='}`+page+'&size='+size+'&orderBy='+orderBy)
}
getTRecensioni(tId:number,page:number,size:number,orderBy:string){
  return this.http.get(environment.API_URL+this.Az+this.recensione+'T'+this.paginated+`/${tId+'?page='}`+page+'&size='+size+'&orderBy='+orderBy)
}
postTRecensione(recensione:any){
  return this.http.post(environment.API_URL+this.Az+this.recensione,recensione)
}
putTRecensioneById(tId:number,receId:number,recensione:any){
  return this.http.put(environment.API_URL+this.Az+this.recensione+`/${tId}/${receId}`,recensione)
}
deleteTRecensione(azId:number,receId:number){
  return this.http.delete(environment.API_URL+this.Az+this.recensione+`/${azId}/${receId}`)
}
}
