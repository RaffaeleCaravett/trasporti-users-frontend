import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/core/environment';

@Injectable()
export class ChatService {
  private selectedChat: any = null;
  private chats: any = null;
  private trasportatore: string = '/trasportatore';
  private azienda: string = '/azienda';
  private chat: string = '/chat';
  private messaggi: string = '/messaggi';
  private chatByAzienda: string = '/byAzId';
  private chatByTrasportatore: string = '/byTId';
  private chatByAziendaAndTr: string = '/byAziendaIdAndTrasportatoreId';

  constructor(private http: HttpClient) {}

  getChatsByAziendaId(azId: number) {
    return this.http.get(
      environment.API_URL +
        this.azienda +
        this.chat +
        this.chatByAzienda +
        `/${azId}`
    );
  }
  getChatsByTrId(azId: number) {
    return this.http.get(
      environment.API_URL +
        this.trasportatore +
        this.chat +
        this.chatByTrasportatore +
        `/${azId}`
    );
  }
  getChatsByAziendaIdAndTId(azId: number, tId: number) {
    return this.http.get(
      environment.API_URL +
        this.azienda +
        this.chat +
        this.chatByAziendaAndTr +
        `/${azId}/${tId}`
    );
  }
  postChat(aziendaId: number, trasportatoreId: number, role: string) {
    let chatDTO = {
      azienda_id: aziendaId,
      trasportatore_id: trasportatoreId,
    };
    if (role == 'Trasportatore') {
      return this.http.post(
        environment.API_URL + this.trasportatore + this.chat,
        chatDTO
      );
    } else {
      return this.http.post(
        environment.API_URL + this.azienda + this.chat,
        chatDTO
      );
    }
  }

  sendMessage(message: any) {
    if (message && message.senderType == 'Azienda') {
      return this.http.post(
        environment.API_URL + this.azienda + this.messaggi,
        message
      );
    } else {
      return this.http.post(
        environment.API_URL + this.trasportatore + this.messaggi,
        message
      );
    }
  }
  getChatById(role: string, id: number, type: string) {
    if (role == 'Azienda') {
      return this.http.get(
        environment.API_URL + this.azienda + this.chat + `/${id}`
      );
    } else {
      return this.http.get(
        environment.API_URL + this.trasportatore + this.chat + `/${id}`
      );
    }
  }
  setSelectedChat(chat: any): void {
    this.selectedChat = chat;
  }
  getSelectedChat(): any {
    return this.selectedChat;
  }
  setChats(chats: any): void {
    this.chats = chats;
  }
  getChats(): any {
    return this.chats;
  }
}
