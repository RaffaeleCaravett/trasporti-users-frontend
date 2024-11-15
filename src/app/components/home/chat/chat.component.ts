import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { FormsService } from 'src/app/shared/services/forms.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
user:any;
selectedChat:any;
chats:any[]=[];
isThereaSelectedChat:boolean=false;
constructor(private route:ActivatedRoute,private formsService:FormsService){
 this.user=this.formsService.getUser()
 this.selectedChat=JSON.parse(this.route.snapshot.paramMap.get('chat')!)
 this.chats=JSON.parse(this.route.snapshot.paramMap.get('chats')!)
 console.log(this.user,this.selectedChat,this.chats)
 if(this.selectedChat!=null){
  this.isThereaSelectedChat=true;
 }

}
}
