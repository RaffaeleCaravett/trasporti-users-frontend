import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsService } from 'src/app/shared/services/forms.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  section: string = 'login';
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  cities: any[] = [];
  settori: any[] = [];
  typeFormValue: string = '';
  trasportatoreForm!: FormGroup;
  aziendaForm!: FormGroup;
  submitted: boolean = false;
  submittedLogin: boolean = false;
  loginValue = '';
  showResetPassword: boolean = false;
  constructor(
    private formsService: FormsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.clear();
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      value: new FormControl(this.loginValue || '', Validators.required),
    });
    this.signupForm = new FormGroup({
      citta: new FormControl('', Validators.required),
      regione: new FormControl('', Validators.required),
      indirizzo: new FormControl('', Validators.required),
      cap: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      type: new FormControl('', Validators.required),
    });
    this.trasportatoreForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      cognome: new FormControl('', Validators.required),
      eta: new FormControl('', [Validators.required, Validators.min(18)]),
      codiceFiscale: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$'
        ),
      ]),
      partitaIva: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
      ]),
      flottaMezzi: new FormControl('', Validators.required),
    });
    this.aziendaForm = new FormGroup({
      nomeAzienda: new FormControl('', Validators.required),
      fatturatoMedio: new FormControl('', Validators.required),
      numeroDipendenti: new FormControl('', Validators.required),
      settore: new FormControl('', [Validators.required]),
      partitaIva: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
      ]),
    });

    this.formsService.getCities().subscribe({
      next: (cities: any) => {
        this.cities = cities;
      },
      error: (err: any) => {},
      complete: () => {},
    });
    this.formsService.getSettori().subscribe({
      next: (settori: any) => {
        this.settori = settori;
      },
      error: (err: any) => {},
      complete: () => {},
    });
  }

  login() {
    this.submittedLogin = true;
    if (this.loginForm.valid) {
      let email = this.loginForm.controls['email'].value;
      let password = this.loginForm.controls['password'].value;
      if (this.loginValue == 'T') {
        this.formsService
          .TlogIn({
            email: email,
            password: password,
          })
          .subscribe({
            next: (data: any) => {
              if (data && data.trasportatore) {
                localStorage.setItem(
                  'trasportatore',
                  JSON.stringify(data.trasportatore)
                );
                this.formsService.setUser(
                  JSON.parse(localStorage.getItem('trasportatore')!)
                );
              } else if (data && data.azienda) {
                localStorage.setItem('azienda', JSON.stringify(data.azienda));
                this.formsService.setUser(
                  JSON.parse(localStorage.getItem('azienda')!)
                );
              }
              localStorage.setItem('TrAccessToken', data.tokens.accessToken);
              localStorage.setItem('TrRefreshToken', data.tokens.refreshToken);
              this.formsService.setToken(data.tokens.accessToken);
              this.formsService.authenticateUser(true);
              this.router.navigate(['/home']);
            },
            error: (error) => {},
          });
      } else {
        this.formsService
          .AlogIn({
            email: email,
            password: password,
          })
          .subscribe({
            next: (data: any) => {
              if (data && data.azienda) {
                localStorage.setItem('azienda', JSON.stringify(data.azienda));
                this.formsService.setUser(
                  JSON.parse(localStorage.getItem('azienda')!)
                );
              } else if (data && data.trasportatore) {
                localStorage.setItem(
                  'trasportatore',
                  JSON.stringify(data.trasportatore)
                );
                this.formsService.setUser(
                  JSON.parse(localStorage.getItem('trasportatore')!)
                );
              }
              localStorage.setItem('AzAccessToken', data.tokens.accessToken);
              localStorage.setItem('AzRefreshToken', data.tokens.refreshToken);
              this.formsService.setToken(data.tokens.accessToken);
              this.formsService.authenticateUser(true);
              this.router.navigate(['/home']);
            },
            error: (error) => {},
          });
      }
    } else {
      this.toastr.error(
        'Assicurati di completare correttamente il form prima di accedere.'
      );
    }
  }
  signup() {
    this.submitted = true;
    if (this.signupForm.valid) {
      let citta = this.signupForm.controls['citta'].value;
      let regione = this.signupForm.controls['regione'].value;
      let indirizzo = this.signupForm.controls['indirizzo'].value;
      let cap = this.signupForm.controls['cap'].value;
      let email = this.signupForm.controls['email'].value;
      let password = this.signupForm.controls['password'].value;
      if (
        this.signupForm.controls['type'].value == 'trasportatore' &&
        this.trasportatoreForm.valid
      ) {
        let nome = this.trasportatoreForm.controls['nome'].value;
        let cognome = this.trasportatoreForm.controls['cognome'].value;
        let eta = this.trasportatoreForm.controls['eta'].value;
        let codiceFiscale =
          this.trasportatoreForm.controls['codiceFiscale'].value;
        let partitaIva = this.trasportatoreForm.controls['partitaIva'].value;
        let flottaMezzi = this.trasportatoreForm.controls['flottaMezzi'].value;

        this.formsService
          .TsignUp({
            citta: citta,
            regione: regione,
            indirizzo: indirizzo,
            cap: cap,
            email: email,
            password: password,
            nome: nome,
            cognome: cognome,
            eta: eta,
            codiceFiscale: codiceFiscale,
            partitaIva: partitaIva,
            flottaMezzi: flottaMezzi,
          })
          .subscribe({
            next: (data) => {
              this.toastr.show(
                'Complimenti! Ti sei registrato correttamente. Adesso effettua il login per scoprire cosa ti aspetta!'
              );
              this.section = 'login';
            },
            error: (err) => {},
            complete: () => {},
          });
      } else {
        if (
          this.aziendaForm.valid &&
          this.signupForm.controls['type'].value == 'azienda'
        ) {
          let nomeAzienda = this.aziendaForm.controls['nomeAzienda'].value;
          let fatturatoMedio =
            this.aziendaForm.controls['fatturatoMedio'].value;
          let numeroDipendenti =
            this.aziendaForm.controls['numeroDipendenti'].value;
          let settore = this.aziendaForm.controls['settore'].value;
          let partitaIva = this.aziendaForm.controls['partitaIva'].value;
          this.formsService
            .AzsignUp({
              citta: citta,
              regione: regione,
              indirizzo: indirizzo,
              cap: cap,
              email: email,
              password: password,
              nomeAzienda: nomeAzienda,
              fatturatoMedio: fatturatoMedio,
              numeroDipendenti: numeroDipendenti,
              partitaIva: partitaIva,
              settore: settore,
            })
            .subscribe({
              next: (data) => {
                this.toastr.show(
                  'Complimenti! Ti sei registrato correttamente. Adesso effettua il login per scoprire cosa ti aspetta!'
                );
                this.section = 'login';
              },
              error: (err) => {},
              complete: () => {},
            });
        } else {
          this.toastr.error(
            'Sembra che tu non abbia completato il form correttamente.'
          );
        }
      }
    } else {
      this.toastr.error(
        'Assicurati di inserire tutti i valori nei rispettivi campi.'
      );
    }
  }

  getRegioneByCity(city: string) {
    this.formsService.getRegionByCity(city).subscribe({
      next: (regione: any) => {
        regione = regione;
        this.signupForm.controls['regione'].setValue(regione);
        this.signupForm.controls['cap'].setValue('87050');
        this.signupForm.updateValueAndValidity();
      },
      error: (err: any) => {
      },
      complete: () => {},
    });
  }

  sectionChange(value: string) {
    this.section = '';
    setTimeout(() => {
      this.section = value;
    }, 2000);
  }
  onReceiveResetPassword(rP: boolean) {
    this.showResetPassword = rP;
  }
}
