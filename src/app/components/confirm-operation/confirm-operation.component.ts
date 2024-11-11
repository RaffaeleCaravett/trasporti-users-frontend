import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormsService } from 'src/app/shared/services/forms.service';
import { HomeService } from 'src/app/shared/services/home.service';

@Component({
  selector: 'app-confirm-operation',
  templateUrl: './confirm-operation.component.html',
  styleUrls: ['./confirm-operation.component.scss'],
})
export class ConfirmOperationComponent implements OnInit {
  operation: string = '';
  notification: any;
  today: string = new Date().toISOString().substring(0, 10);
  user: any ;
  constructor(
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<ConfirmOperationComponent>,
    private homeService: HomeService,
    private formsService:FormsService
  ) {}

  ngOnInit(): void {
    this.notification = this.data[0];
    this.operation = this.data[1];
    this.user = this.formsService.getUser();

  }

  putNotification(notification: any, action: string) {
    switch (action) {
      case 'rifiuta':
        {
          this.homeService
            .rejectNotification(notification.id, this.user.id)
            .subscribe({
              next: (rejected: any) => {
                if (rejected) {
                  this.close('rifiuta');
                } else {
                  this.close();
                }
              },
              error: () => {
                this.close();
              },
              complete: () => {},
            });
        }
        break;
      case 'accetta':
        {
          this.homeService
            .acceptNotification(notification.id, this.user.id)
            .subscribe({
              next: (res: any) => {
                const newBlob = new Blob([res], {
                  type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                });
                //@ts-ignore
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                  //@ts-ignore
                  window.navigator.msSaveOrOpenBlob(newBlob);
                  return;
                }
                const url = URL.createObjectURL(newBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `richiesta-spedizione-copia.docx`;
                link.click();
                URL.revokeObjectURL(url);

                this.close('accetta');
              },
              error: () => {
                this.close();
              },
              complete: () => {},
            });
        }
        break;
      default: {
        this.toastr.show("Seleziona un'opzione. Accetta o rifiuta?");
      }
    }
  }
  title() {
    return this.operation[0].toUpperCase() + this.operation.substring(1);
  }
  close(operation?: string) {
    this.matDialogRef.close(operation);
  }
}
