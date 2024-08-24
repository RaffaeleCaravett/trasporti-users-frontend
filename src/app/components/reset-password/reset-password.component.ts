import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  @Output() resetPassword :EventEmitter<boolean> = new EventEmitter<boolean>






  close(){
    this.resetPassword.emit(false)
  }
}
