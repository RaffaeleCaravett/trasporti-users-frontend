import { Component, Input, OnChanges } from '@angular/core';
import { OfficeService } from '../../services/office.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { errors } from 'src/app/core/errors';
import { MatDialog } from '@angular/material/dialog';
import { ShowAnnuncioComponent } from '../show-annuncio/show-annuncio.component';
import { Router } from '@angular/router';
import { throttleTime } from 'rxjs';

@Component({
  selector: 'app-trasportatore-office',
  templateUrl: './trasportatore-office.component.html',
  styleUrls: ['./trasportatore-office.component.scss'],
})
export class TrasportatoreOfficeComponent implements OnChanges {
  @Input() user: any;
  @Input() toDo: string = '';
  @Input() azioni: string[] = [];
  filters: string[] = [];
  isLoading: boolean = false;
  annunci: any;
  annunciCopy: any[] = [];
  annunciOption: any[] = [false, 0];
  action: string = 'id';
  today = new Date();
  selectedChat: any = null;
  pages:number[]=[]
  constructor(
    private officeService: OfficeService,
    private toastr: ToastrService,
    private matDialog: MatDialog,
    private router: Router
  ) {}

  ngOnChanges(): void {
    if (this.toDo == 'Cerca un annuncio') {
      this.filters = [
        'Tutti',
        'Retribuzione',
        'Data annuncio',
        'Data spedizione',
        'Nome azienda',
        'Numero pedane',
      ];
    } else {
      this.filters = [];
    }
  }

  setButtonBg(index: number, action: string) {
    let div: HTMLCollection = document.getElementsByClassName(
      'btn-personal'
    ) as HTMLCollection;
    for (let i = 0; i <= div.length - 1; i++) {
      if (i == index) {
        let singleDiv = document.getElementsByClassName('btn-personal')[
          index
        ] as HTMLDivElement;
        singleDiv.style.background = 'rgb(212, 212, 212)';
      } else {
        (
          document.getElementsByClassName('btn-personal')[i] as HTMLDivElement
        ).style.background = 'rgb(245, 245, 245)';
      }
    }
    this.isLoading = true;
    switch (action) {
      case 'Tutti':
        this.action = 'id';
        this.getAllAnnunci('id');
        break;
      case 'Retribuzione':
        this.action = 'retribuzione';
        this.getAllAnnunci('retribuzione');
        break;
      case 'Data annuncio':
        this.action = 'dataPubblicazione';
        this.getAllAnnunci('dataPubblicazione');
        break;
      case 'Data spedizione':
        this.action = 'spedizione_DaSpedire';
        this.getAllAnnunci('spedizione_DaSpedire');
        break;
      case 'Nome azienda':
        this.action = 'azienda_nomeAzienda';
        this.getAllAnnunci('azienda_nomeAzienda');
        break;
      case 'Numero pedane':
        this.action = 'spedizione_NumeroPedane';
        this.getAllAnnunci('spedizione_NumeroPedane');
        break;
      default:
        this.getAllAnnunci('id');
        break;
    }
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  getAllAnnunci(orderBy: string, ordering?: string, page?: number|string) {
    this.officeService
      .getAllAnnunci(orderBy, ordering || 'ASC', Number(page) || 0)
      .subscribe({
        next: (data: any) => {
          this.annunci = data;
          this.pages=[]
          for (let i = 1; i <= this.annunci.totalPages; i++) {
            this.pages.push(i)
          }
          this.annunciCopy = this.annunci?.content;
        },
        error: (error: any) => {
          this.toastr.error(
            error?.message || error?.error?.message || errors.request_error
          );
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  changeAnnunciOption(value: boolean, id: number) {
    this.annunciOption = [!value, id];
  }
  openAnnunciInfo(annuncio: any) {
    const dialogRef = this.matDialog.open(ShowAnnuncioComponent, {
      data: annuncio,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (!data) {
        this.toastr.show(
          'Non è stato richiesto di assegnare nessuna spedizione.'
        );
      }
    });
  }
  checkDatePassed(date: any) {
    if (this.today.toISOString().split('T')[0] > date) {
      return true;
    } else {
      return false;
    }
  }
  checkDateEqual(date: any) {
    if (this.today.toISOString().split('T')[0] == date) {
      return true;
    } else {
      return false;
    }
  }
  openChat(userId: number, partecipant: any) {
    this.officeService
      .postChat(
        this.user.role == 'Trasportatore' ? partecipant.id : userId,
        this.user.role == 'Trasportatore' ? userId : partecipant.id,
        this.user.role
      )
      .pipe(throttleTime(1000))
      .subscribe({
        next: (chat: any) => {
          this.selectedChat = chat;
          this.selectedChat?.messaggiList?.sort(
            (m1: any, m2: any) => m1.id - m2.id
          );
        },
        error: (error: any) => {
          this.toastr.error(
            error.error.message ||
              error.error.messageList[0] ||
              "E' stato impossibile creare la chat."
          );
        },
        complete: () => {},
      });
    this.router.navigate([
      '/home/chat',
      { user: JSON.stringify(this.user), chat: this.selectedChat },
    ]);
  }
}
