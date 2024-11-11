import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-operation',
  templateUrl: './confirm-operation.component.html',
  styleUrls: ['./confirm-operation.component.scss'],
})
export class ConfirmOperationComponent implements OnInit {
  operation: string = '';
  notification: any;
  constructor(
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.notification = this.data;
    this.operation = this.data[1];
  }

  putNotification(notification: any, action: string) {
    switch (action) {
      case 'rifiuta':
        {
        }
        break;
      case 'accetta':
        {
        }
        break;
      default: {
        this.toastr.show("Seleziona un'opzione. Accetta o rifiuta?");
      }
    }
  }
  title(){
    return this.data[1][0].toUpperCase()+this.data[1].substring(1)
  }
}
