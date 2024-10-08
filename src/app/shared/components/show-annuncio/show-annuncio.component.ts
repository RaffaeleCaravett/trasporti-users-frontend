import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsService } from '../../services/forms.service';
import { OfficeService } from '../../services/office.service';
import { ToastrService } from 'ngx-toastr';
import { errors } from 'src/app/core/errors';

@Component({
  selector: 'app-show-annuncio',
  templateUrl: './show-annuncio.component.html',
  styleUrls: ['./show-annuncio.component.scss'],
})
export class ShowAnnuncioComponent implements OnInit {
  user: any;
  warningDateMessage:string=""
  today = new Date()

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formsService: FormsService,
    private officeService: OfficeService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<ShowAnnuncioComponent>
  ) {}

  ngOnInit(): void {
    this.user = this.formsService.getUser();
    if(this.today.toISOString().split('T')[0]>(this.data.spedizione?.daSpedire)){
      console.log(1)
      this.warningDateMessage="Attenzione, la data di spedizione è scaduta."
    }else if(this.today.toISOString().split('T')[0]==(this.data.spedizione?.daSpedire)){
      console.log(2)
      this.warningDateMessage="Attenzione, la data di spedizione scade oggi."
    }else{
      console.log(3)
      this.warningDateMessage=""
    }
  }

  richiedi() {
    this.officeService.richiediSpedizione(this.data.spedizione.id).subscribe({
      next: () => {
        this.toastr.show('Richiesta effettuata con successo.');
        this.dialogRef.close();
      },
      error: (error: any) => {
        this.toastr.error(
          error?.error?.message ||
            error?.error?.messageList[0] ||
            errors.request_error
        );
      },
      complete: () => {},
    });
  }
}
