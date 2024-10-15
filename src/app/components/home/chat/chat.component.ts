import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
user:any

constructor(private route:ActivatedRoute){
 this.user=JSON.parse(this.route.snapshot.paramMap.get('user')!)
}
}
