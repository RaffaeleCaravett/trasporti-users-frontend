import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OfficeService } from 'src/app/shared/services/office.service';
import { FormsService } from 'src/app/shared/services/forms.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss'],
})
export class OfficeComponent implements OnInit {
  user: any;
  isTrasportatore: boolean = false;
  toDo:string=''
  azioni: string[] = [
    'Aggiungi un annuncio',
    'Monitora un annuncio',
    'Modifica il profilo',
    'Cerca un Trasportatore',
    'Monitora le tue statistiche',
  ];
  modifyProfile!: FormGroup;
  cities: any[] = [];
  settori: any[] = [];
  changePasswordForm!: FormGroup;
  statistica:any
  aggiungiAnnuncioSubmitted: boolean = false;

  constructor(
    private toastr: ToastrService,
    private officeService: OfficeService,
    private matDialog: MatDialog,
    private formsService: FormsService
  ) {}

  ngOnInit(): void {
    localStorage.setItem('location', '/office');

    this.user =
      JSON.parse(localStorage.getItem('Trasportatore')!) ||
      JSON.parse(localStorage.getItem('Azienda')!);
    if (this.user && this.user.cognome) {
      this.isTrasportatore = true;
    }
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
          numeroDipendenti:
            this.modifyProfile.controls['numeroDipendenti'].value,
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

  checkPasswords(ps1: any, ps2: any) {
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
    for (let a = 6; a <= 10; a++) {
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
    if(toDo=='Monitora le tue statistiche'){
    this.getStatistica()
    }
  }
  getStatistica(){
    this.officeService.getStatisticaByAziendaId(this.user.id).subscribe({
next:(sta:any)=>{
this.statistica=sta
},
error:(error:any)=>{
  this.toastr.error(
    error.error.message ||
      error.error.messageList[0] ||
      "Qualcosa è successo nell'elaborazione della richiesta."
  );
},
complete:()=>{}
    })
  }
}

