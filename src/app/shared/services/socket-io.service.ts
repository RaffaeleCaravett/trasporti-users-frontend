import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';


@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  private socket: Socket;

  constructor() {
    this.socket = io('ws://192.168.1.60:3032');
  }

  emit(event: string, data: any,room:string) {
    this.socket = io('ws://192.168.1.60:3032=room='+room)
    this.socket.emit(event, data);
  }

  on(event: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.off(event);
      };
    });
  }
}
