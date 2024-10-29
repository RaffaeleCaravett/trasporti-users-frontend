import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import io, { Manager, Socket } from 'socket.io-client';
import { FormsService } from './forms.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/app/core/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  private socket: any;
  public socketAdvicer: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public signleMessageFromSocket: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);
  constructor(private fService: FormsService, private toastr: ToastrService) {}

  socketEmiter(message: any) {
    this.socketAdvicer.next(message);
  }
  connectToRoom(room: number, username: string) {
    if (room != undefined && username != undefined) {
      var options = {
        transports: ['websocket'],
        forceNew:true,
        reconnectionAttempts:3,
        timeout:2000,
        secure:true
      };
      const manager = new Manager(
        `${environment.NETLIFY_WEBSOCKET_API_URL}?room=${room}&username=${username}`,
        options
      );

      this.socket = manager.socket('/');
      manager.on('error', (error: any) => {
        console.log(error.message);
        console.log(error.description);
      });

      this.socket.on('connect_timeout', (err: any) => {
        this.toastr.error('client connect_timeout: ' + err);
      });
      let user = this.fService.getUser();
      let username1 = user.email;

      this.socket.on(username1, (data: any) => {
        this.signleMessageFromSocket.next(data);
      });
    }
  }

  getSocket(): Socket {
    return this.socket;
  }
}
