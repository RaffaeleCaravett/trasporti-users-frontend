import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { delay, throttleTime } from 'rxjs';
import { HomeService } from 'src/app/shared/services/home.service';
import { AziendaOfficeComponent } from 'src/app/shared/components/azienda-office/azienda-office.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SocketIoService } from 'src/app/shared/services/socket-io.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';
import { ShowSpedizioneComponent } from '../show-spedizione/show-spedizione.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  user: any;
  isTrasportatore: boolean = false;
  notifications: any[] = [];
  page: number = 0;
  size: number = 0;
  orderBy: string = 'id';
  transporters: any;
  isTLoading: boolean = false;
  aOfficeComponent: AziendaOfficeComponent = inject(AziendaOfficeComponent);
  displayChat: boolean = false;
  chats: any[] = [];
  selectedChat: any;
  reduce: boolean = false;
  messageForm!: FormGroup;
  aziende: any;
  notificheDaLeggere: any[] = [];

  constructor(
    private homeService: HomeService,
    private toastr: ToastrService,
    private router: Router,
    private socketIoService: SocketIoService,
    private cdr: ChangeDetectorRef,
    private matDialog:MatDialog
  ) {
    this.socketIoService.signleMessageFromSocket.subscribe((data: any) => {
      if (data) {
        for (let c of this.chats) {
          if (c.id == data.room) {
            this.homeService
              .getChatById(this.user.role, c.id, 'receiver')
              .subscribe({
                next: (chat: any) => {
                  c = chat;
                  this.cdr.detectChanges();
                },
                error: (error: any) => {
                  this.toastr.error(
                    error?.error?.message ||
                      error?.error?.messageList[0] ||
                      "E' successo un problema nell'elaborazione della richiesta."
                  );
                },
              });
            if (
              !this.selectedChat ||
              (this.selectedChat && !this.selectedChat.id == c.id)
            ) {
              this.toastr.show('Ti è arrivato un messaggio');
            }
          }
        }
      }
    });
  }

  ngOnInit(): void {
    localStorage.setItem('location', '/home');
    this.user =
      JSON.parse(localStorage.getItem('trasportatore')!) ||
      JSON.parse(localStorage.getItem('azienda')!);
    if (this.user && this.user.cognome) {
      this.isTrasportatore = true;
    }

    this.getNotifiche();

    if (!this.isTrasportatore) {
      this.getT(this.page, this.size, this.orderBy);
    } else {
      this.getAz(this.page, this.size, this.orderBy);
    }
    this.getChats(this.user.id);
    let chatContainer = document.getElementsByClassName(
      'chat-container'
    )[0] as HTMLDivElement;
    if (window.innerWidth < 700) {
      this.displayChat = false;
      if (chatContainer) {
        chatContainer.style.height = '0';
        chatContainer.style.transition = '2s';
        chatContainer.style.overflow = 'hidden';
        chatContainer.classList.remove('border');
      }
    }
    this.messageForm = new FormGroup({
      message: new FormControl('', Validators.required),
    });
  }

  getT(page: number, size: number, orderBy: string) {
    this.isTLoading = true;
    this.homeService
      .getTrasportatori(page, size, orderBy)
      .pipe(delay(2000))
      .subscribe({
        next: (data: any) => {
          this.transporters = data;
          this.isTLoading = false;
        },
        error: (error: any) => {
          this.toastr.error(
            error.error.message ||
              error.error.messageList[0] ||
              "E' stato impossibile recuperare i trasportatori."
          );
        },
        complete: () => {},
      });
  }

  openT(t: any) {
    this.aOfficeComponent.openT(t);
  }
  showChat(resize?: string) {
    let chatContainer = document.getElementsByClassName(
      'chat-container'
    )[0] as HTMLDivElement;
    let singleChat = document.getElementsByClassName(
      'single-chat'
    )[0] as HTMLDivElement;
    if (window.innerWidth <= 700) {
      if (resize) {
        this.displayChat = false;
        if (chatContainer) {
          chatContainer.style.height = '0';
          chatContainer.style.transition = '2s';
          chatContainer.style.overflow = 'hidden';
          chatContainer.classList.remove('border');
        }
        setTimeout(() => {
          singleChat.classList.add('d-none');
        }, 200);
      } else {
        this.router.navigate([
          '/home/chat',
          { user: JSON.stringify(this.user), chat: null },
        ]);
      }
    } else {
      if (!resize && chatContainer) {
        this.displayChat = !this.displayChat;
        if (this.displayChat) {
          chatContainer.style.height = '60vh';
          chatContainer.style.transition = '2s';
          chatContainer.classList.add('overflow-auto', 'border');
        } else {
          chatContainer.style.height = '30px';
          chatContainer.style.transition = '2s';
          chatContainer.classList.remove('overflow-auto');
        }
      } else {
        if (!this.displayChat && chatContainer) {
          chatContainer.style.height = '30px';
          chatContainer.style.transition = '2s';
          chatContainer.classList.remove('overflow-auto');
          chatContainer.classList.add('border');
        }
      }
    }
  }

  getChats(userId: number) {
    if (!this.isTrasportatore) {
      this.homeService
        .getChatsByAziendaId(userId)
        .pipe(delay(1000))
        .subscribe({
          next: (dataChats: any) => {
            this.chats = dataChats;
          },
          error: (error: any) => {
            this.toastr.error(
              error.error.message ||
                error.error.messageList[0] ||
                "E' stato impossibile recuperare le chats."
            );
          },
          complete: () => {},
        });
    } else {
      this.homeService
        .getChatsByTrId(userId)
        .pipe(delay(1000))
        .subscribe({
          next: (dataChats: any) => {
            this.chats = dataChats;
          },
          error: (error: any) => {
            this.toastr.error(
              error.error.message ||
                error.error.messageList[0] ||
                "E' stato impossibile recuperare le chats."
            );
          },
          complete: () => {},
        });
    }
    //Establish a socket connection for each chat
    // setTimeout(() => {
    //   for (let c of this.chats) {
    //     this.socketIoService.connectToRoom(
    //       c.id,
    //       this.isTrasportatore
    //         ? this.user.nome + ' ' + this.user.cognome
    //         : this.user.nomeAzienda
    //     );
    //   }
    // }, 5000);
  }
  openChat(userId: number, chatMember: any) {
    this.chats.forEach((c) => {
      if (
        (this.isTrasportatore &&
          c.trasportatore.id == userId &&
          c.azienda.id == chatMember.id) ||
        (!this.isTrasportatore &&
          c.azienda.id == userId &&
          c.trasportatore.id == chatMember.id)
      ) {
        this.selectedChat = c;
        this.selectedChat?.messaggiList?.sort(
          (m1: any, m2: any) => m1.id - m2.id
        );
      }
    });
    if (this.selectedChat == null) {
      this.homeService
        .postChat(
          this.isTrasportatore ? chatMember.id : userId,
          this.isTrasportatore ? userId : chatMember.id,
          this.user.role
        )
        .pipe(throttleTime(1000))
        .subscribe({
          next: (chat: any) => {
            this.selectedChat = chat;
            this.selectedChat?.messaggiList?.sort(
              (m1: any, m2: any) => m1.id - m2.id
            );
            this.getChats(userId);
          },
          error: (error: any) => {
            this.toastr.error(
              error.error.message ||
                error.error.messageList[0] ||
                "E' stato impossibile creare la chat."
            );
          },
          complete: () => {},
        });
    }

    if (window.innerWidth >= 700) {
      setTimeout(() => {
        let singleChat = document.getElementsByClassName(
          'single-chat'
        )[0] as HTMLDivElement;
        singleChat.classList.add('border', 'd-block');
        singleChat.classList.remove('d-none');
        singleChat.style.overflowY = 'auto';
        singleChat.style.height = '450px';
        singleChat.style.width = '340px';
        let chatContainer = singleChat.childNodes[1] as HTMLDivElement;
        chatContainer.style.scrollBehavior = 'smooth';
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 500);
    } else {
      this.router.navigate([
        '/home/chat',
        { user: JSON.stringify(this.user), chat: this.selectedChat },
      ]);
    }
  }
  downgradeChat() {
    this.reduce = !this.reduce;
    setTimeout(() => {
      let singleChat = document.getElementsByClassName(
        'single-chat'
      )[0] as HTMLDivElement;
      let chatFooter = document.getElementsByClassName(
        'chat-footer'
      )[0] as HTMLDivElement;
      if (this.reduce) {
        singleChat.style.transition = '1s';
        singleChat.style.height = '50px';
        singleChat.style.overflowY = 'hidden';
        chatFooter.style.display = 'none';
      } else {
        singleChat.style.transition = '1s';
        singleChat.classList.add('border', 'd-block');
        singleChat.classList.remove('d-none');
        singleChat.style.overflowY = 'auto';
        singleChat.style.height = '450px';
        singleChat.style.width = '340px';
        chatFooter.style.display = 'block';
      }
    }, 500);
  }

  sendMessage(chat: any, user: any) {
    if (this.messageForm.valid) {
      let message = {
        chat_id: this.selectedChat?.id,
        sender_id: this.user?.id,
        receiver_id: this.isTrasportatore
          ? this.selectedChat.azienda.id
          : this.selectedChat.trasportatore.id,
        receiverType: this.isTrasportatore ? 'Azienda' : 'Trasportatore',
        senderType: this.isTrasportatore ? 'Trasportatore' : 'Azienda',
        testo: this.messageForm.controls['message'].value,
        room: String(this.selectedChat?.id),
      };
      //When decommenting this, remember to comment the send message part itself
      // this.socketIoService.socketEmiter(message);
      this.messageForm.reset();
      this.homeService
        .getChatById(this.user.role, this.selectedChat.id, 'sender')
        .subscribe({
          next: (data: any) => {
            this.selectedChat = data;
          },
          error: (error: any) => {
            this.toastr.error(
              error.error.message ||
                error.error.messageList[0] ||
                "C'è stato un problema nell'elaborazione della richiesta."
            );
          },
          complete: () => {},
        });
      this.homeService
        .sendMessage(message)
        .pipe(delay(1000))
        .subscribe({
          next: (messaggio: any) => {
            this.messageForm.reset();
            this.selectedChat.messaggiList.push(messaggio);
            let singleChat = document.getElementsByClassName(
              'single-chat'
            )[0] as HTMLDivElement;
            let chatContainer = singleChat.childNodes[1] as HTMLDivElement;
            setTimeout(() => {
              chatContainer.style.scrollBehavior = 'smooth';
              chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 500);
          },
          error: (error: any) => {
            this.toastr.error(
              error.error.message ||
                error.error.messageList[0] ||
                "E' stato impossibile inviare il messaggio."
            );
          },
          complete: () => {},
        });
    }
  }
  getAz(page: number, size: number, orderBy: string) {
    this.homeService
      .getAziende(page, size, orderBy)
      .pipe(delay(1000))
      .subscribe({
        next: (azs: any) => {
          this.aziende = azs;
        },
        error: (error: any) => {
          this.toastr.error(
            error.error.message ||
              error.error.messageList[0] ||
              "C'è stato un problema nell'elaborazione della richiesta."
          );
        },
        complete: () => {},
      });
  }

  getNotifiche() {
    if (this.isTrasportatore) {
      this.homeService
        .getNotificationByTransporterIdAndNotificationStateAndSender(
          this.user.id,
          'Emessa',
          'az'
        )
        .subscribe({
          next: (data: any) => {
            for (let n of data?.content) {
              this.notifications.push(n);
            }
          },
          error: (error: any) => {
            this.toastr.error(
              error.error.message ||
                error.error.messageList[0] ||
                "E' stato impossibile recuperare le notifiche."
            );
          },
          complete: () => {},
        });
      this.homeService.getNotificheRecensioneRicevuta(this.user?.id).subscribe({
        next: (data: any) => {
          for (let n of data?.content) {
            this.notifications.push(n);
          }
        },
        error: (error: any) => {
          this.toastr.error(
            error.error.message ||
              error.error.messageList[0] ||
              "E' stato impossibile recuperare le notifiche."
          );
        },
        complete: () => {},
      });
      return;
    }
    this.homeService
      .getNotificationByAziendaIdAndNotificationStateAndSender(
        this.user?.id,
        'Emessa',
        'tr'
      )
      .subscribe({
        next: (data: any) => {
          for (let n of data?.content) {
            this.notifications.push(n);
          }
        },
        error: (error: any) => {
          this.toastr.error(
            error.error.message ||
              error.error.messageList[0] ||
              "E' stato impossibile recuperare le notifiche."
          );
        },
        complete: () => {},
      });
  }

  readNotification(notifica: any) {
    if(notifica&&!notifica.spedizione){
      this.notificheDaLeggere.push(notifica);
    }
  }

  ngOnDestroy(): void {
      if(this.notificheDaLeggere.length>0){
        this.isTrasportatore?
        this.homeService.readTNotifications(this.notificheDaLeggere).subscribe()
        :
        this.homeService.readNotifications(this.notificheDaLeggere,this.user?.id).subscribe()
       }
  }
  showProfile(t:any){
    const dialogRef = this.matDialog.open(ProfileComponent,{data:t})
    dialogRef.afterClosed().subscribe((data:any)=>{})
  }
  showSpedition(s:any){
    const dialogRef = this.matDialog.open(ShowSpedizioneComponent,{data:s})
    dialogRef.afterClosed().subscribe((data:any)=>{})
  }
  putNotification(notification:any){

  }
}
