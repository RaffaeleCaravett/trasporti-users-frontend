import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OfficeService } from 'src/app/shared/services/office.service';
import { FormsService } from 'src/app/shared/services/forms.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from '@stomp/stompjs';
import { environment } from 'src/app/core/environment';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss'],
})
export class OfficeComponent implements OnInit, OnDestroy {
  user: any;
  isTrasportatore: boolean = false;
  toDo: string = '';
  azioni: string[] = [];
  modifyProfile!: FormGroup;
  cities: any[] = [];
  settori: any[] = [];
  changePasswordForm!: FormGroup;
  statistica: any;
  aggiungiAnnuncioSubmitted: boolean = false;
  client!: Client;
  constructor(
    private toastr: ToastrService,
    private officeService: OfficeService,
    private formsService: FormsService
  ) {}

  ngOnInit(): void {

    this.client = new Client({
      brokerURL: `${environment.WEBSOCKET_API_URL}/trasporti-chat`,
    });
    this.client.onConnect = (frame: any) => {
      this.client.subscribe('/topic/update', (message) =>
        console.log(`Received: ${message}`)
      );
      this.client.publish({
        destination: '/topic/test01',
        body: 'First Message',
      });
    };
    this.client.onWebSocketError = (error) => {
      console.error('Error with websocket', error);
    };
    this.client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };
    // this.client.activate();
    localStorage.setItem('location', '/office');

    this.user =
      JSON.parse(localStorage.getItem('trasportatore')!) ||
      JSON.parse(localStorage.getItem('azienda')!);
    if (this.user && this.user.cognome) {
      this.isTrasportatore = true;
      this.azioni = [
        'Cerca un annuncio',
        "Cerca un'azienda",
        'Modifica il profilo',
        'Monitora le tue statistiche',
      ];
    } else {
      this.azioni = [
        'Aggiungi un annuncio',
        'Monitora un annuncio',
        'Modifica il profilo',
        'Cerca un Trasportatore',
        'Monitora le tue statistiche',
      ];
    }
    this.formsService.getCities().subscribe({
      next: (cities: any) => {
        this.cities = cities;
      },
      error: (err: any) => {
        this.toastr.error(err.error.message || err.error.messageList[0]);
      },
      complete: () => {},
    });
    this.formsService.getSettori().subscribe({
      next: (settori: any) => {
        this.settori = settori;
      },
      error: (err: any) => {
        this.toastr.error(err.error.message || err.error.messageList[0]);
      },
      complete: () => {
        this.modifyProfile = new FormGroup({
          citta: new FormControl(this.user.citta, Validators.required),
          regione: new FormControl(this.user.regione, Validators.required),
          indirizzo: new FormControl(this.user.indirizzo, Validators.required),
          cap: new FormControl(this.user.cap, Validators.required),
          email: new FormControl(this.user.email, [
            Validators.required,
            Validators.pattern(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
            ),
          ]),
          nomeAzienda: new FormControl(
            this.user?.nomeAzienda,
            Validators.required
          ),
          fatturatoMedio: new FormControl(
            this.user?.fatturatoMedio,
            Validators.required
          ),
          numeroDipendenti: new FormControl(
            this.user?.numeroDipendenti,
            Validators.required
          ),
          settore: new FormControl(this.user?.settore, Validators.required),
          partitaIva: new FormControl(this.user?.partitaIva, [
            Validators.required,
            Validators.pattern(/^[0-9]{11}$/),
          ]),
        });
        this.changePasswordForm = new FormGroup({
          oldPassword: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
          ]),
          repeteOldPassword: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
          ]),
          newPassword: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
          ]),
          newPassword1: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
          ]),
        });
      },
    });
  }
  ngOnDestroy(): void {
    this.client.deactivate();
  }

  modifyProfilo() {
    if (this.modifyProfile.valid) {
      this.officeService
        .putAziendaById({
          citta: this.modifyProfile.controls['citta'].value,
          regione: this.modifyProfile.controls['regione'].value,
          indirizzo: this.modifyProfile.controls['indirizzo'].value,
          cap: this.modifyProfile.controls['cap'].value,
          email: this.modifyProfile.controls['email'].value,
          nomeAzienda: this.modifyProfile.controls['nomeAzienda'].value,
          fatturatoMedio: this.modifyProfile.controls['fatturatoMedio'].value,
          numeroDipendenti:this.modifyProfile.controls['numeroDipendenti'].value,
          settore: this.modifyProfile.controls['settore'].value,
          partitaIva: this.modifyProfile.controls['partitaIva'].value,
        })
        .subscribe({
          next: (data: any) => {
            this.user = data;
            this.toastr.success('Azienda modificata correttamente.');
          },
          error: (error: any) => {
            this.toastr.error(
              error.error.message ||
                error.error.messageList[0] ||
                "Qualcosa è successo nell'elaborazione della richiesta."
            );
          },
          complete: () => {},
        });
    }
  }

  checkPasswords(ps1: AbstractControl<any, any>, ps2: AbstractControl<any, any>) {
    let div = document.querySelector('.inserisciPassword') as HTMLDivElement;
    if (ps1.valid && ps2.valid && ps1.value == ps2.value) {
      div.classList.add('blocked');
      div.classList.remove('noned');
    } else {
      div.classList.add('noned');
      div.classList.remove('blocked');
    }
  }

  resetPassword(psw1: string, psw2: string, userRole: string) {
    if (this.changePasswordForm.valid) {
      if (
        this.changePasswordForm.controls['newPassword'].value ==
        this.changePasswordForm.controls['newPassword1'].value
      ) {
        if (userRole == 'Azienda') {
          this.officeService.changePasswordByProfileAz(psw1, psw2).subscribe({
            next: () => {
              this.toastr.success('Password modificata correttamente.');
              this.changePasswordForm.reset();
            },
            error: (error: any) => {
              this.toastr.error(
                error.error.message ||
                  error.error.messageList[0] ||
                  "Qualcosa è successo nell'elaborazione della richiesta."
              );
            },
            complete: () => {},
          });
        } else {
          console.log(userRole);
        }
      } else {
        this.toastr.error('Le nuove password non coincidono.');
      }
    } else {
      this.toastr.error(
        'Completa prima il form correttamente,le password devono avere minimo 6 caratteri.'
      );
    }
  }
  getRegioneByCity(city: string) {
    this.formsService.getRegionByCity(city).subscribe({
      next: (regione: any) => {
        regione = regione;
        this.modifyProfile.controls['regione'].setValue(regione);
        this.modifyProfile.controls['cap'].setValue('87050');
        this.modifyProfile.updateValueAndValidity();
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error(err.error.message || err.error.messageList[0]);
      },
      complete: () => {},
    });
  }
  setBackground(i: number, toDo: string) {
    this.toDo = toDo;
    this.aggiungiAnnuncioSubmitted = false;
    let p = document.getElementsByClassName(`p-${i}`)[0] as HTMLElement;
    let maxIt = 0;
    if (this.isTrasportatore) {
      maxIt = 9;
    } else {
      maxIt = 10;
    }
    for (let a = 6; a <= maxIt; a++) {
      if (a == i) {
        p.style.borderRadius = '.3rem';
        p.style.background = 'red';
        p.style.color = 'white';
      } else {
        let otherP = document.getElementsByClassName(
          `p-${a}`
        )[0] as HTMLElement;
        otherP.style.background = 'white';
        otherP.style.color = 'black';
      }
    }
    if (toDo == 'Monitora le tue statistiche') {
      this.getStatistica();
    }
  }
  getStatistica() {
    if (!this.isTrasportatore) {
      this.officeService.getStatisticaByAziendaId(this.user.id).subscribe({
        next: (sta: any) => {
          this.statistica = sta;
        },
        error: (error: any) => {
          this.toastr.error(
            error.error.message ||
              error.error.messageList[0] ||
              "Qualcosa è successo nell'elaborazione della richiesta."
          );
        },
        complete: () => {},
      });
    } else {
      console.log('isT');
    }
  }
}
