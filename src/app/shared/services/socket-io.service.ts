import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import io, { Socket } from 'socket.io-client';
import { FormsService } from './forms.service';

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  private socket: any;
  public socketAdvicer: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private fService:FormsService) {}

  socketEmiter(message: any) {
    this.socketAdvicer.next(message);
  }
  connectToRoom(room: number, username: string) {
    if (room != undefined && username != undefined) {
      this.socket = io(
        `ws://192.168.1.60:3032?room=${room}&username=${username}`,
        { transports: ['websocket'] }
      );
      this.socket.on('connection', function () {
        console.log('client connected');
      });

      this.socket.on('connect_error', function (err: any) {
        console.log('client connect_error: ', err);
      });

      this.socket.on('connect_timeout', function (err: any) {
        console.log('client connect_timeout: ', err);
      });
     let user = this.fService.getUser()
     let username1 = user.email


      this.socket.on(username1, (data: any) => {
        console.log('data: ', data);
      });
    }
  }

  getSocket():Socket{
    return this.socket;
  }
}
