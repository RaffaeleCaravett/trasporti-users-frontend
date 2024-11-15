import { Component, OnInit } from '@angular/core';
import { FormsService } from './shared/services/forms.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SocketIoService } from './shared/services/socket-io.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'trasporti-users';
  room: number = 0;
  username: string = '';
  socket: any;
  constructor(
    private formsService: FormsService,
    private router: Router,
    private socketService: SocketIoService
  ) {
    this.socketService.socketAdvicer.subscribe((data) => {
      if (data && data != undefined && data != null) {
        this.emitSocketMessage(data);
      }
    });
  }

  ngOnInit(): void {
    let trasportatore = localStorage.getItem('TrAccessToken');
    let azienda = localStorage.getItem('AzAccessToken');
    let location = localStorage.getItem('location');
    if (trasportatore) {
      this.formsService.verifyTrasportatoreToken(trasportatore).subscribe({
        next: (t: any) => {
          localStorage.setItem('trasportatore', JSON.stringify(t));
          this.formsService.setToken(trasportatore!);
          this.formsService.authenticateUser(true);
          this.formsService.setUser(
            JSON.parse(localStorage.getItem('trasportatore')!)
          );
          this.router.navigate([`${location || '/home'}`]);
        },
        error: () => {},
        complete: () => {},
      });
    }
    if (azienda) {
      this.formsService.verifyAziendaToken(azienda).subscribe({
        next: (a: any) => {
          localStorage.setItem('azienda', JSON.stringify(a));
          this.formsService.setToken(azienda!);
          this.formsService.authenticateUser(true);
          this.formsService.setUser(
            JSON.parse(localStorage.getItem('azienda')!)
          );
          this.router.navigate([`${location || '/home'}`]);
        },
        error: () => {},
        complete: () => {},
      });
    }
  }

  emitSocketMessage(message?: any) {
    if (message && message != null) {
      this.socketService.getSocket().emit('send_message', message);
    }
  }
}
