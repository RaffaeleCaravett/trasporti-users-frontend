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
  warningDateMessage: string = '';
  today = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formsService: FormsService,
    private officeService: OfficeService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<ShowAnnuncioComponent>
  ) {}

  ngOnInit(): void {
    this.user = this.formsService.getUser();
    if (
      this.today.toISOString().split('T')[0] > this.data.spedizione?.daSpedire
    ) {
      this.warningDateMessage = 'Attenzione, la data di spedizione è scaduta.';
    } else if (
      this.today.toISOString().split('T')[0] == this.data.spedizione?.daSpedire
    ) {
      this.warningDateMessage = 'Attenzione, la data di spedizione scade oggi.';
    } else {
      this.warningDateMessage = '';
    }
  }

  richiedi() {
    this.officeService.richiediSpedizione(this.data.spedizione.id).subscribe({
      next: (data:any) => {
        console.log(data)
        this.toastr.show('Richiesta effettuata con successo.');
        this.dialogRef.close('Richiesta');
      },
      error: (error: any) => {},
      complete: () => {},
    });
  }
}
