import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { delay, throttleTime } from 'rxjs';
import { HomeService } from 'src/app/shared/services/home.service';
import { AziendaOfficeComponent } from 'src/app/shared/components/azienda-office/azienda-office.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: any;
  isTrasportatore: boolean = false;
  notifications: any;
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
  messageForm!:FormGroup
  constructor(
    private homeService: HomeService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.setItem('location', '/home');
    this.user =
      JSON.parse(localStorage.getItem('trasportatore')!) ||
      JSON.parse(localStorage.getItem('azienda')!);
    if (this.user && this.user.cognome) {
      this.isTrasportatore = true;
    }

    if (this.isTrasportatore) {
      this.homeService
        .getNotificationByTransporterIdAndNotificationStateAndSender(
          this.user.id,
          'Emessa',
          'az'
        )
        .subscribe({
          next: (data: any) => {
            this.notifications = data;
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
    } else {
      this.homeService
        .getNotificationByAziendaIdAndNotificationStateAndSender(
          this.user?.id,
          'Emessa',
          'tr'
        )
        .subscribe({
          next: (data: any) => {
            this.notifications = data;
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
      this.getT(this.page, this.size, this.orderBy);
      this.getChats(this.user.id);
    }
    let chatContainer = document.getElementsByClassName(
      'chat-container'
    )[0] as HTMLDivElement;
    if (window.innerWidth < 700) {
      this.displayChat = false;
      chatContainer.style.height = '0';
      chatContainer.style.transition = '2s';
      chatContainer.style.overflow = 'hidden';
      chatContainer.classList.remove('border');
    }
    this.messageForm = new FormGroup({
      message: new FormControl('',Validators.required)
    })
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
        chatContainer.style.height = '0';
        chatContainer.style.transition = '2s';
        chatContainer.style.overflow = 'hidden';
        chatContainer.classList.remove('border');
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
      if (!resize) {
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
        if (!this.displayChat) chatContainer.style.height = '30px';
        chatContainer.style.transition = '2s';
        chatContainer.classList.remove('overflow-auto');
        chatContainer.classList.add('border');
      }
    }
  }

  getChats(userId: number) {
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
      }
    });
    if (this.selectedChat == null) {
      this.homeService
        .postChat(
          this.isTrasportatore ? chatMember.id : userId,
          this.isTrasportatore ? userId : chatMember.id
        )
        .pipe(throttleTime(1000))
        .subscribe({
          next: (chat: any) => {
            this.selectedChat = chat;
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
      }, 500);
    } else {
      this.router.navigate([
        '/home/chat',
        { user: JSON.stringify(this.user), chat: this.selectedChat },
      ]);
    }
    console.log(this.selectedChat);
  }
  downgradeChat() {
    this.reduce = !this.reduce;
    setTimeout(() => {
      let singleChat = document.getElementsByClassName(
        'single-chat'
      )[0] as HTMLDivElement;
      if (this.reduce) {
        singleChat.style.transition = '1s';
        singleChat.style.height = '50px';
        singleChat.style.overflowY = 'hidden';
      } else {
        singleChat.style.transition = '1s';
        singleChat.classList.add('border', 'd-block');
        singleChat.classList.remove('d-none');
        singleChat.style.overflowY = 'auto';
        singleChat.style.height = '450px';
        singleChat.style.width = '280px';
      }
    }, 500);
  }

  sendMessage(chat:any,user:any){

  }
}
