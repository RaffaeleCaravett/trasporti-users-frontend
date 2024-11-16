import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
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
    if(localStorage.getItem('userId')){
    }
    if(localStorage.getItem('selectedChatId')){
    }
    if(this.isThereaSelectedChat){
      localStorage.setItem('selectedChatId',JSON.stringify(this.selectedChat.id))
    }
    localStorage.setItem('userId',JSON.stringify(this.user.id))
    localStorage.setItem('location', '/home/chat');
  }
  ngOnDestroy(): void {
   localStorage.removeItem('userId')
   localStorage.removeItem('selectedChatId')
  }
}
