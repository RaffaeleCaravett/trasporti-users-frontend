import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormsService } from 'src/app/shared/services/forms.service';
import { OfficeService } from 'src/app/shared/services/office.service';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  recensioneTForm!: FormGroup;
  poli: string[] = ['Positiva', 'Negativa'];
  user: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private formsService: FormsService
  ) {}

  ngOnInit(): void {
    this.user = this.formsService.getUser();
    this.recensioneTForm = new FormGroup({
      polo: new FormControl('', Validators.required),
      message: new FormControl(''),
    });
  }

  inviaRecensione() {
    if (this.recensioneTForm.controls['polo'].valid) {
      if (this.data.role == 'Trasportatore') {
        this.profileService.postTRecensione({
          message: this.recensioneTForm.controls['message'].value || '',
          polo: this.recensioneTForm.controls['polo'].value,
          trasportatore_id: this.data.id,
          azienda_id:this.user.id
        }).subscribe({
          next:(rece:any)=>{
            this.updateReces()
          },
          error:(error:any)=>{
            this.toastr.error(error?.message||error?.messageList[0]||"E' sucesso qualcosa durante l'elaborazione della richiesta.")
          },
          complete:()=>{}
        });
      } else {
      }
    } else {
      this.toastr.show('Inserisci la valutazione');
    }
  }

updateReces(){

}
}
