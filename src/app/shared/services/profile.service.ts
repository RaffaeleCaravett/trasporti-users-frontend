import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "src/app/core/environment"

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  private T:string = '/trasportatore'
  private Az:string = '/azienda'
  private recensione:string = '/recensione'
  private paginated:string = '/paginated'

  constructor(private http:HttpClient) { }

getAzRecensioni(azId:number,stato:string,page:number,size:number,orderBy:string){
  return this.http.get(environment.API_URL+this.Az+this.recensione+this.paginated+`/${azId+'/'+stato+'?page='}`+page+'&size='+size+'&orderBy='+orderBy)
}
getSettori(){
  return this.http.get(environment.API_URL+this.settori)
}
}
