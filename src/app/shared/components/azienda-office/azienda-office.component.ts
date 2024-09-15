import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsService } from '../../services/forms.service';
import { ToastrService } from 'ngx-toastr';
import { OfficeService } from '../../services/office.service';
import { AnnuncioInfoComponent } from 'src/app/components/annuncio-info/annuncio-info.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-azienda-office',
  templateUrl: './azienda-office.component.html',
  styleUrls: ['./azienda-office.component.scss']
})
export class AziendaOfficeComponent implements OnInit,OnChanges{
@Input() toDo:string=''
@Input() azioni:string[]=[]
@Input() user:any
@Input() aggiungiAnnuncioFormSubmitted:boolean=false
@Input() statistica:any
@Input() cities:string[]=[]
@Input() settori:string[]=[]
  aggiungiAnnuncioForm!: FormGroup;
  year: number = 0;
  today = new Date();
  today1 = new Date();
  todayPlusAYear = new Date(this.today1.setDate(this.today1.getDate() + 365));
  giorni: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  mesi: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  anni: number[] = [this.year, this.year + 1];
  annunciByAzienda: any;
  searchAnnunciByAzienda!: FormGroup;
  annunciByAziendaAndPubblicati: number = 0;
  annunciByAziendaPages: number[] = [];
  annunciByAziendaElementi: number[] = [];
  annunciByAziendaOrderBy: string[] = [];
  typeFormValue: string = '';
  searchAnnunciByAziendaRetrMax: number = 14000;
  searchAnnunciByAziendaRetrMin: number = 2000;
  modifyProfile!: FormGroup;
  changePasswordForm!: FormGroup;
  searchTrasportatori!: FormGroup;
  trasporters: any;
  trasportatoreLoader:boolean=false


constructor(private formsService:FormsService, private toastr:ToastrService,private officeService:OfficeService,private matDialog:MatDialog){}

  ngOnChanges(changes: SimpleChanges): void {
      if(this.toDo == 'Monitora un annuncio'){
        this.getAnnunci();
      }
  }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
    this.aggiungiAnnuncioForm = new FormGroup({
      retribuzione: new FormControl('', Validators.required),
      da: new FormControl('', Validators.required),
      a: new FormControl('', Validators.required),
      data: new FormControl('', [
        Validators.required,
        Validators.max(this.year + 1),
        Validators.min(this.year),
      ]),
      testo: new FormControl('', Validators.required),
      numeroPedane: new FormControl('', Validators.required),
    });
    this.searchAnnunciByAzienda = new FormGroup({
      page: new FormControl(''),
      size: new FormControl(''),
      orderBy: new FormControl(''),
      type: new FormControl(''),
      da: new FormControl(''),
      a: new FormControl(''),
    });
    this.searchTrasportatori = new FormGroup({
      citta: new FormControl(''),
      nome: new FormControl(''),
      cognome: new FormControl(''),
    });



  }



  addAnnuncio() {
    this.aggiungiAnnuncioFormSubmitted = true;
    if (this.aggiungiAnnuncioForm.valid) {
      let dataDaSpedire =
        this.aggiungiAnnuncioForm.controls['data'].value.split('-');
      const dialog = this.matDialog.open(AnnuncioInfoComponent, {
        data: this.aggiungiAnnuncioForm.controls,
      });
      dialog.afterClosed().subscribe((data: any) => {
        if (data && data == 'conferma') {
          this.officeService
            .postSpedizione({
              da: this.aggiungiAnnuncioForm.controls['da'].value,
              a: this.aggiungiAnnuncioForm.controls['a'].value,
              daSpedireAnno: dataDaSpedire[0],
              daSpedireMese: dataDaSpedire[1],
              daSpedireGiorno: dataDaSpedire[2],
              descrizione: this.aggiungiAnnuncioForm.controls['testo'].value,
              numeroPedane:
                this.aggiungiAnnuncioForm.controls['numeroPedane'].value,
              azienda_id: this.user.id,
            })
            .subscribe({
              next: (data: any) => {
                this.officeService
                  .publicAnnuncio({
                    retribuzione:
                      this.aggiungiAnnuncioForm.controls['retribuzione'].value,
                    aziendaId: this.user.id,
                    spedizioneId: data.id,
                  })
                  .subscribe({
                    next: (data: any) => {
                      this.toastr.show('Annuncio inserito correttamente');
                      this.aggiungiAnnuncioForm.reset();
                      this.aggiungiAnnuncioFormSubmitted = false;
                    },
                    error: (error: any) => {
                      this.toastr.error(
                        error.error.message ||
                          error.error.messageList[0] ||
                          "Qualcosa è andato storto nell'elaborazione della richiesta."
                      );
                    },
                    complete: () => {},
                  });
              },
              error: (error: any) => {
                this.toastr.error(
                  error.error.message ||
                    error.error.messageList[0] ||
                    "Qualcosa è andato storto nell'elaborazione della richiesta."
                );
              },
              complete: () => {},
            });
        } else {
          this.toastr.error('Non è stato inserito nessun annuncio.');
        }
      });
    } else {
      this.toastr.error(
        "Completa correttamente il form prima di inserire l'annuncio"
      );
    }
  }

  updateAnnunciByAzienda() {
    this.annunciByAziendaPages = [];
    this.annunciByAziendaElementi = [];
    this.annunciByAziendaOrderBy = [];
    if (this.searchAnnunciByAzienda.controls['type'].value == '') {
      this.officeService
        .getAnnunciByAziendaId(
          this.user.id,
          this.searchAnnunciByAzienda.controls['page'].value || 0,
          this.searchAnnunciByAzienda.controls['size'].value || 10,
          this.searchAnnunciByAzienda.controls['orderBy'].value || 'id'
        )
        .subscribe({
          next: (data: any) => {
            this.annunciByAzienda = data;
            for (let i = 0; i <= data.totalPages - 1; i++) {
              this.annunciByAziendaPages.push(i);
              this.annunciByAziendaElementi = [10, 50, 100];
              this.annunciByAziendaOrderBy = ['id', 'retribuzione'];
            }
          },
          error: (error: any) => {},
          complete: () => {},
        });
    } else if (
      this.searchAnnunciByAzienda.controls['type'].value == 'retribuzione'
    ) {
      this.officeService
        .getByRetribuzione(
          this.searchAnnunciByAziendaRetrMin,
          this.searchAnnunciByAziendaRetrMax,
          this.searchAnnunciByAzienda.controls['page'].value || 0,
          this.searchAnnunciByAzienda.controls['size'].value || 10,
          this.searchAnnunciByAzienda.controls['orderBy'].value || 'id'
        )
        .subscribe({
          next: (data: any) => {
            this.annunciByAzienda = data;
            for (let i = 0; i <= data.totalPages - 1; i++) {
              this.annunciByAziendaPages.push(i);
              this.annunciByAziendaElementi = [10, 50, 100];
              this.annunciByAziendaOrderBy = ['id', 'retribuzione'];
            }
          },
          error: (error: any) => {},
          complete: () => {},
        });
    } else if (
      this.searchAnnunciByAzienda.controls['type'].value ==
        'dataPubblicazione' &&
      this.searchAnnunciByAzienda.controls['da'].value &&
      this.searchAnnunciByAzienda.controls['a'].value
    ) {
      let da = this.searchAnnunciByAzienda.controls['da'].value.split('-');
      let a = this.searchAnnunciByAzienda.controls['a'].value.split('-');
      var fromDate = Date.parse(da);
      var toDate = Date.parse(a);
      if (fromDate < toDate) {
        this.officeService
          .getByData(
            da[0],
            da[1],
            da[2],
            a[0],
            a[1],
            a[2],
            this.searchAnnunciByAzienda.controls['page'].value || 0,
            this.searchAnnunciByAzienda.controls['size'].value || 10,
            this.searchAnnunciByAzienda.controls['orderBy'].value || 'id'
          )
          .subscribe({
            next: (data: any) => {
              this.annunciByAzienda = data;
              for (let i = 0; i <= data.totalPages - 1; i++) {
                this.annunciByAziendaPages.push(i);
                this.annunciByAziendaElementi = [10, 50, 100];
                this.annunciByAziendaOrderBy = ['id', 'retribuzione'];
              }
            },
            error: (error: any) => {},
            complete: () => {},
          });
      } else {
        this.toastr.error(
          "La data 'Da' non può essere superiore o uguale alla data 'A'"
        );
      }
    }
  }

  showAnnuncio(annuncio: any) {
    const dialog = this.matDialog.open(AnnuncioInfoComponent, {
      data: annuncio,
    });
    dialog.afterClosed().subscribe((data: any) => {
      if (data && data[0].da && data[0].retribuzione && data != 'elimina') {
        let dataDaSpedire = data[0].data.value.split('-');
        this.officeService
          .putSpedizioneByAzienda(
            {
              da: data[0].da.value,
              a: data[0].a.value,
              daSpedireAnno: dataDaSpedire[0],
              daSpedireMese: dataDaSpedire[1],
              daSpedireGiorno: dataDaSpedire[2],
              descrizione: data[0].testo.value,
              numeroPedane: data[0].numeroPedane.value,
              azienda_id: this.user.id,
            },
            data[1]
          )
          .subscribe({
            next: (spedizione: any) => {
              this.officeService
                .putAnnuncioByAzienda(
                  {
                    retribuzione: data[0].retribuzione.value,
                    aziendaId: this.user.id,
                    spedizioneId: spedizione.id,
                  },
                  data[2],
                  this.user.id
                )
                .subscribe({
                  next: (data: any) => {
                    this.toastr.show('Annuncio modificato correttamente');
                    this.updateAnnunciByAzienda();
                  },
                  error: (error: any) => {
                    this.toastr.error(
                      error.error.message ||
                        error.error.messageList[0] ||
                        "Qualcosa è andato storto nell'elaborazione della richiesta."
                    );
                  },
                  complete: () => {},
                });
            },
            error: (error: any) => {
              this.toastr.error(
                error.error.message ||
                  error.error.messageList[0] ||
                  "Qualcosa è andato storto nell'elaborazione della richiesta."
              );
            },
            complete: () => {},
          });
      } else if (data && data == 'elimina') {
        this.officeService
          .deleteAnnuncioByAzienda(annuncio.id, this.user.id)
          .subscribe({
            next: (data: any) => {
              if (data) {
                this.toastr.show('Annuncio eliminato correttamente');
                this.updateAnnunciByAzienda();
              } else {
                this.toastr.error(
                  "Non è stato possibile eliminare l'annuncio. Lavoreremo per risolvere il problema."
                );
              }
            },
            error: (error: any) => {
              this.toastr.error(
                error.error.message ||
                  error.error.messageList[0] ||
                  "Qualcosa è andato storto nell'elaborazione della richiesta."
              );
            },
            complete: () => {},
          });
      } else {
        this.toastr.error(
          'Non è stato modificato nè eliminato nessun annuncio.'
        );
      }
    });
  }
  getAnnunci() {
    this.officeService
      .getAnnunciByAziendaIdAndStatoPubblicata(this.user.id)
      .subscribe({
        next: (data: any) => {
          this.annunciByAziendaAndPubblicati = data;
        },
        error: (error: any) => {},
        complete: () => {},
      });

    this.updateAnnunciByAzienda();
  }
  updateSlider(event: any, from: string) {
    switch (from) {
      case 'da':
        {
          this.searchAnnunciByAziendaRetrMin =
            event?.target?.value || this.searchAnnunciByAziendaRetrMin;
        }
        break;
      case 'a':
        {
          this.searchAnnunciByAziendaRetrMax =
            event?.target?.value || this.searchAnnunciByAziendaRetrMax;
        }
        break;
      default: {
      }
    }
  }



  searchT(page: number, size: number, orderBy: string) {
    if (
      !this.searchTrasportatori.controls['citta'].value &&
      !this.searchTrasportatori.controls['nome'].value &&
      !this.searchTrasportatori.controls['cognome'].value
    ) {
      this.toastr.error('Non hai inserito nessun valore di ricerca');
    } else {
      let citta = this.searchTrasportatori.controls['citta'].value;
      let nome = this.searchTrasportatori.controls['nome'].value;
      let cognome = this.searchTrasportatori.controls['cognome'].value;
      this.trasportatoreLoader=true
      if (citta && !nome && !cognome) {
        this.officeService.getTrByCitta(citta, page, size, orderBy).subscribe({
          next: (tr: any) => {
            this.trasporters = tr;
          },
          error: (error: any) => {
            this.toastr.error(
              error.error.message ||
                error.error.messageList[0] ||
                "Qualcosa è successo nell'elaborazione della richiesta."
            );
          },
          complete: () => {      this.trasportatoreLoader=true
setTimeout(()=>{this.trasportatoreLoader=false},1000)
          },
        });
      } else if (!citta && nome && cognome) {
        this.officeService
          .getTrByNomeAndCognome(nome, cognome, page, size, orderBy)
          .subscribe({
            next: (tr: any) => {
              this.trasporters = tr;
            },
            error: (error: any) => {
              this.toastr.error(
                error.error.message ||
                  error.error.messageList[0] ||
                  "Qualcosa è successo nell'elaborazione della richiesta."
              );
            },
            complete: () => {      this.trasportatoreLoader=true
setTimeout(()=>{this.trasportatoreLoader=false},1000)
            },
          });
      } else if (citta && nome && cognome) {
        this.officeService
          .getTrByNomeAndCognomeAndCitta(
            nome,
            cognome,
            citta,
            page,
            size,
            orderBy
          )
          .subscribe({
            next: (tr: any) => {
              this.trasporters = tr;
            },
            error: (error: any) => {
              this.toastr.error(
                error.error.message ||
                  error.error.messageList[0] ||
                  "Qualcosa è successo nell'elaborazione della richiesta."
              );
            },
            complete: () => {      this.trasportatoreLoader=true
setTimeout(()=>{this.trasportatoreLoader=false},1000)
            },
          });
      } else {
        this.toastr.error(
          'Inserisci la città o nome e cognome o città,nome e cognome insieme'
        );
      }
    }
  }
  openT(t: any) {
    const dialogRef = this.matDialog.open(ProfileComponent,{data:t})
    dialogRef.afterClosed().subscribe((data:any)=>{})
  }

}
