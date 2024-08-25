import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  @Output() resetPassword: EventEmitter<boolean> = new EventEmitter<boolean>();
  reset!: FormGroup;
  emailSended:boolean=false
  codeVerified:boolean=false

  ngOnInit(): void {
    this.reset=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.pattern('^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$')]),
      codice:new FormControl('',Validators.required),
      nuovaPassword:new FormControl('',[Validators.required,Validators.minLength(6)]),
      ripetiNuovaPassword:new FormControl('',[Validators.required,Validators.minLength(6)])
    })
  }

  close() {
    this.resetPassword.emit(false);
  }
}
