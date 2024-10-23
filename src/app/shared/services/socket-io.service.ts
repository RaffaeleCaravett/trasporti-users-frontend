import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { config } from 'src/app/app.module';

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  constructor(private socket: Socket, private http: HttpClient) {}

  awaitMessageByRoom(room: string) {
    return this.http.get(config.url + `?room=${room}`);
  }

  newMessage(messaggio: any) {
    this.socket.emit('send_message', messaggio);
  }
}
