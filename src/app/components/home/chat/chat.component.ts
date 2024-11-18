import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';
import { ChatService } from 'src/app/shared/services/chat.service';
import { FormsService } from 'src/app/shared/services/forms.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  user: any;
  selectedChat: any;
  chats: any = null;
  isLoading: boolean = false;
  isThereaSelectedChat: boolean = false;
  sendMessageForm: FormGroup = new FormGroup({
    testo: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });
  constructor(
    private formsService: FormsService,
    private chatService: ChatService,
    private toastr: ToastrService
  ) {
    this.user = this.formsService.getUser();
    this.selectedChat = this.chatService.getSelectedChat();
    this.chats = this.chatService.getChats();
    debugger
  }
  ngAfterViewChecked(): void {
    if (this.selectedChat != null) {
      this.isThereaSelectedChat = true;
      this.scrollToBottom();
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('userId')) {
      this.user?.role == 'Azienda'
        ? this.getChatsByAziendaId()
        : this.getChatsByTrasportatoreId();
    }
    if (localStorage.getItem('selectedChatId')) {
      this.isThereaSelectedChat = true;
      this.chatService
        .getChatById(
          this.user.role,
          JSON.parse(localStorage.getItem('selectedChatId')!)
        )
        .subscribe({
          next: (sc: any) => {
            this.selectedChat = sc;
            localStorage.setItem(
              'selectedChatId',
              JSON.stringify(this.selectedChat.id)
            );
            this.scrollToBottom();
          },
        });
    }
    localStorage.setItem('userId', JSON.stringify(this.user.id));
    localStorage.setItem('location', '/home/chat');
  }
  ngOnDestroy(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('selectedChatId');
    this.chatService.setChats(null);
    this.chatService.setSelectedChat(null);
  }

  getChatsByAziendaId() {
    this.isLoading = true;
    this.chatService
      .getChatsByAziendaId(this.user?.id)
      .pipe(delay(1000))
      .subscribe({
        next: (data: any) => {
          this.chats = data;
          this.isLoading = false;
        },
      });
  }
  getChatsByTrasportatoreId() {
    this.isLoading = true;
    this.chatService
      .getChatsByTrId(this.user?.id)
      .pipe(delay(1000))
      .subscribe({
        next: (data: any) => {
          this.chats = data;
          this.isLoading = false;
        },
      });
  }
  assignChat(chat: any) {
    this.selectedChat = chat;
    this.chatService.setSelectedChat(chat);
    this.isThereaSelectedChat = true;
    localStorage.setItem('selectedChatId', this.selectedChat.id);
    this.scrollToBottom();
  }

  scrollToBottom() {
    let chatContainer = document.getElementsByClassName(
      'chats-container'
    )[1] as HTMLDivElement;
    if (chatContainer != null) {
      chatContainer.style.scrollBehavior = 'smooth';
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  sendMessage() {
    if (this.sendMessageForm.valid) {
      let message: any = {
        testo: this.sendMessageForm.controls['testo'].value,
        chat_id: this.selectedChat.id,
        sender_id: this.user.id,
        receiver_id:
          this.user.role == 'Azienda'
            ? this.selectedChat.trasportatore.id
            : this.selectedChat.azienda.id,
        receiverType:
          this.user.role == 'Trasportatore' ? 'Azienda' : 'Trasportatore',
        senderType:
          this.user.role == 'Trasportatore' ? 'Trasportatore' : 'Azienda',
        room: this.selectedChat.id,
      };
      this.chatService.sendMessage(message).subscribe({
        next:(mess:any)=>{
          this.selectedChat.messaggiList.push(mess)
          let chatContainer = document.getElementsByClassName(
            'chats-container'
          )[1] as HTMLDivElement;
            chatContainer.style.scrollBehavior = 'smooth';
            chatContainer.scrollTop = chatContainer.scrollHeight;
        this.sendMessageForm.reset()
          }
      });
    } else {
      this.toastr.error('Scrivi qualcosa.');
    }
  }
}
