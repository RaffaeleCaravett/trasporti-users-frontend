import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent  implements OnInit{
  user:any
  isTrasportatore:boolean=false
  ngOnInit():void{
    localStorage.setItem('location','/office')

        this.user=JSON.parse(localStorage.getItem('trasportatore')!)||JSON.parse(localStorage.getItem('azienda')!)
        if(this.user&&this.user.cognome){
          this.isTrasportatore=true
        }

      }
    }
