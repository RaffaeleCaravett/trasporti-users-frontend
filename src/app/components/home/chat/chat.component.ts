import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { delay } from 'rxjs';
import { ChatService } from 'src/app/shared/services/chat.service';
import { FormsService } from 'src/app/shared/services/forms.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  user: any;
  selectedChat: any;
  chats: any = null;
  isLoading:boolean = false
  isThereaSelectedChat: boolean = false;
  constructor(
    private formsService: FormsService,
    private chatService: ChatService
  ) {
    this.user = this.formsService.getUser();
    this.selectedChat = this.chatService.getSelectedChat();
    this.chats = this.chatService.getChats();
    if (this.selectedChat != null) {
      this.isThereaSelectedChat = true;
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('userId')) {
      this.user?.role == 'Azienda'
        ? this.getChatsByAziendaId()
        : this.getChatsByTrasportatoreId();
    }
    if (localStorage.getItem('selectedChatId')) {
      this.isThereaSelectedChat=true;
    }
    if (this.isThereaSelectedChat) {
      localStorage.setItem(
        'selectedChatId',
        JSON.stringify(this.selectedChat.id)
      );
    }
    localStorage.setItem('userId', JSON.stringify(this.user.id));
    localStorage.setItem('location', '/home/chat');
  }
  ngOnDestroy(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('selectedChatId');
  }

  getChatsByAziendaId() {
    this.isLoading=true
    this.chatService
      .getChatsByAziendaId(this.user?.id)
      .pipe(delay(1000))
      .subscribe({
        next: (data: any) => {
          this.chats = data;
          this.isLoading=false
        },
      });
  }
  getChatsByTrasportatoreId() {
    this.isLoading=true
    this.chatService
      .getChatsByTrId(this.user?.id)
      .pipe(delay(1000))
      .subscribe({
        next: (data: any) => {
          this.chats = data;
          this.isLoading=false
        },
      });
  }
  assignChat(chat:any){
    this.selectedChat=chat;
    this.isThereaSelectedChat=true;
    localStorage.setItem('selectedChatId',this.selectedChat.id)
  }
}
