import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() user: any;
  @Input() isTrasportatore!: boolean;
  poloRecensioni: string = '';
  recensioniNegative: any[] = [];
  recensioniPositive: any[] = [];
  recensioniClass: string = '';
  ngOnInit(): void {
    this.recensioniNegative = this.user.recensioniRicevute.filter((r: any) => {
      return r.poloRecensione == 'negativa';
    });
    this.recensioniPositive = this.user.recensioniRicevute.filter((r: any) => {
      return r.poloRecensione == 'positiva';
    });
    this.recensioniNegative > this.recensioniPositive
      ? (this.poloRecensioni = 'Ti valutano negativamente, mannaggia!')
      : this.recensioniNegative < this.recensioniPositive
      ? (this.poloRecensioni = 'Ti valutano positivamente, complimenti!')
      : (this.recensioniNegative == this.recensioniPositive)||(this.recensioniNegative.length==0&&this.recensioniPositive.length==0)
      ? (this.poloRecensioni = 'Il giudizio non pende da nessuna parte.')
      : '';
    switch (this.poloRecensioni) {
      case 'Ti valutano negativamente, mannaggia!':
        {
          this.recensioniClass = 'text-danger';
        }
        break;
      case 'Ti valutano positivamente, complimenti!':
        {
          this.recensioniClass = 'text-success';
        }
        break;
      case 'Il giudizio non pende da nessuna parte.':
        {
          this.recensioniClass = 'text-success';
        }
        break;
      default:
        {
          this.recensioniClass=''
        }
        break;
    }
  }
}
