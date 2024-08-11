import { Component, OnInit } from '@angular/core';
import { FormsService } from './shared/services/forms.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'trasporti-users';

constructor(private formsService:FormsService){}

  ngOnInit(): void {
    let trasportatore = localStorage.getItem('TAccessToken')
    let azienda = localStorage.getItem('AzAccessToken')

    if(trasportatore){

    }

  }
}
