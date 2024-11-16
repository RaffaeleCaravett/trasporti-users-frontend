import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormsService } from 'src/app/shared/services/forms.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  @Output() resetPassword: EventEmitter<boolean> = new EventEmitter<boolean>();
  reset!: FormGroup;
  emailSended: boolean = false;
  codeVerified: boolean = false;

  constructor(
    private formsService: FormsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.reset = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
      ]),
      codice: new FormControl('', [
        Validators.required,
        Validators.minLength(18),
      ]),
      nuovaPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      ripetiNuovaPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  close() {
    this.resetPassword.emit(false);
  }
  verifyEmail(email: string) {
    if (this.reset.controls['email'].valid) {
      this.formsService.verifyEmail({ to: email }).subscribe({
        next: (value: any) => {
          if (value) {
            this.emailSended = true;
          }
        },
        error: (error: any) => {},
        complete: () => {},
      });
    } else {
      this.toastr.error('Inserisci una mail valida.');
    }
  }
  verifyCode(code: string) {
    if (this.reset.controls['codice'].valid) {
      this.formsService
        .verifyCode({
          secretCode: this.reset.controls['codice'].value,
          email: this.reset.controls['email'].value,
        })
        .subscribe({
          next: (value: any) => {
            if (value) {
              this.codeVerified = true;
            } else {
              this.toastr.error(
                'Il codice che hai inserito sembra non coincidere con quello che ti abbiamo inviato.'
              );
            }
          },
          error: (error: any) => {},
          complete: () => {},
        });
    }
  }
  changePassword(psw: string, newPsw: string, code: string) {
    if (this.reset.valid) {
      if (psw == newPsw) {
        this.formsService
          .changePassword(psw, this.reset.controls['email'].value, code)
          .subscribe({
            next: (user) => {
              this.toastr.show('Password cambiata correttamente.');
              this.resetPassword.emit(false);
            },
            error: (error: any) => {},
            complete: () => {},
          });
      } else {
        this.toastr.error('Le password che hai inserito non coincidono.');
      }
    } else {
      this.toastr.error('Sembra che in form non sia valido.');
    }
  }
}
