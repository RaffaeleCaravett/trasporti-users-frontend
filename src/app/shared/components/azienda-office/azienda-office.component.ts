import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-azienda-office',
  templateUrl: './azienda-office.component.html',
  styleUrls: ['./azienda-office.component.scss']
})
export class AziendaOfficeComponent {
@Input() toDo:string=''
@Input() azioni:string[]=[]


}
