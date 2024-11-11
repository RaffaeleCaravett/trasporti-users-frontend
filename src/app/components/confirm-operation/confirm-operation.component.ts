import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-operation',
  templateUrl: './confirm-operation.component.html',
  styleUrls: ['./confirm-operation.component.scss'],
})
export class ConfirmOperationComponent implements OnInit {
  operation: string = '';
  notification: any;
  today:string = new Date().toISOString().substring(0,10)
  constructor(
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef:MatDialogRef<ConfirmOperationComponent>
  ) {}

  ngOnInit(): void {
    this.notification = this.data[0];
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
    return this.operation[0].toUpperCase()+this.operation.substring(1)
  }
  close(operation?:string){
    this.matDialogRef.close(operation)
  }
}
