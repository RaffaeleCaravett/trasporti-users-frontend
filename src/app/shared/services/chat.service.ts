import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ChatService {
  constructor(private http: HttpClient) {}

  private selectedChat: any = null;
  private chats: any = null;

  setSelectedChat(chat: any):void {
    this.selectedChat = chat;
  }
  getSelectedChat(chat: any):any {
    return this.selectedChat;
  }
  setChats(chats: any):void {
    this.chats = chats;
  }
  getChats(chat: any):any {
    return this.chats;
  }
}
