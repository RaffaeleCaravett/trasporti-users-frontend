import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SocketIoService {

  public socketAdvicer:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])
  constructor() {}

 socketEmiter(room:number,username:string,message?:any){
  this.socketAdvicer.next([room,username,message||null])
 }

}
