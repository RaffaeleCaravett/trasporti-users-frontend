import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  private user:any
  private tAccess:string='/AccessTToken'
  private azAccess:string ='/AccessAzToken'
  private tRefresh:string='/RefreshTToken'
  private azRefresh:string ='/RefreshAzToken'
  private resetPassword:string ='/resetPassword'
  private testSecretCode:string = '/testSecretCode'
  private changePassBySecretCode:string = '/changePassBySecretCode'
  isAuthenticatedUser:BehaviorSubject<boolean> =new BehaviorSubject<boolean>(false)
  private profileImagePreview:string='/profileImagePreview'

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
TsignUp(body:any,file:File){
  let formData = new FormData();
  formData.append('trasportatoreDTO',new Blob([JSON.stringify(body)],{ type: 'application/json' }))
  formData.append('profile_image',file)
  return this.http.post(environment.API_URL+this.auth+this.Tsignup,formData)
}
AzsignUp(body:any,file:File){
  let formData = new FormData();
  formData.append('aziendaDTO',body)
  formData.append('profileImage',file)
  return this.http.post(environment.API_URL+this.auth+this.Azsignup,formData,{headers : new HttpHeaders({ 'Content-Type': 'multipart/form-data' })})
}
getToken(){
  return this.token;
}
setToken(token:string){
 this.token=token;
}
getUser(){
  return this.user;
}
setUser(user:any){
 this.user=user;
}
authenticateUser(boolean:any){
  this.isAuthenticatedUser.next(boolean)
  this.authGuard.authenticateUser(boolean)
}

verifyAziendaToken(token:string){
  return this.http.get(environment.API_URL+this.auth+this.azAccess+`/${token}`)
}
verifyTrasportatoreToken(token:string){
  return this.http.get(environment.API_URL+this.auth+this.tAccess+`/${token}`)
}
verifyAziendaRToken(token:string){
  return this.http.get(environment.API_URL+this.auth+this.azRefresh+`/${token}`)
}
verifyTrasportatoreRToken(token:string){
  return this.http.get(environment.API_URL+this.auth+this.tRefresh+`/${token}`)
}
verifyEmail(email:any){
return this.http.post(environment.API_URL+this.auth+this.resetPassword,email)
}
verifyCode(code:any){
  return this.http.post(environment.API_URL+this.auth+this.testSecretCode,code)
}
changePassword(newPsw:string,email:string,code:string){
  return this.http.get(environment.API_URL+this.auth+this.changePassBySecretCode+`/${newPsw}/${email}/${code}`)
}
getProfileImagePreview(userId:string,type:string):Observable<Object>{
  return this.http.get(environment.API_URL+this.auth+this.profileImagePreview+`/${userId}/${type}`)
}
}
