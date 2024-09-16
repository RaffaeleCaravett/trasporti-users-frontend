import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormsService } from 'src/app/shared/services/forms.service';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isTrasportatore:boolean=false
  recensioniT:any
  recensioneTForm!: FormGroup;
  poli: string[] = ['positiva', 'negativa'];
  user: any;
  recensioneTFormPagination!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private formsService: FormsService
  ) {}

  ngOnInit(): void {
    this.user = this.formsService.getUser();
    this.isTrasportatore=this.data.role=='Trasportatore'
    this.recensioneTForm = new FormGroup({
      polo: new FormControl('', Validators.required),
      message: new FormControl('')
    });
    this.recensioneTFormPagination = new FormGroup({
      size: new FormControl(''),
      orderBy: new FormControl('')
    });
    this.updateReces()
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
            this.toastr.error(error?.error?.message||error?.error?.messageList[0]||"E' sucesso qualcosa durante l'elaborazione della richiesta.")
          },
          complete:()=>{}
        });
      } else {
      }
    } else {
      this.toastr.show('Inserisci la valutazione');
    }
  }

updateReces(page?:number,size?:number,orderBy?:string){
this.profileService.getTRecensioni(this.data.id,0,10,"id").subscribe({
  next:(reces:any)=>{
    this.recensioniT=reces
  },
  error:(error:any)=>{
    this.toastr.error(error?.error?.message||error?.error?.messageList[0]||"E' sucesso qualcosa durante l'elaborazione della richiesta.")
  },
  complete:()=>{}
})
}
deleteRece(receId:number,userId:number){
  this.profileService.deleteTRecensione(userId,receId).subscribe({
    next:(data:any)=>{
      if(data){
       this.toastr.success("Recensione eliminata con successo.")
       this.updateReces()
      }else{
        this.toastr.error("C'è stato un problema nell'elaborazione della richiesta.")
      }
    },
    error:(error:any)=>{
this.toastr.error(error?.error?.message||error.error.messageList[0]||"C'è stato un problema nell'elaborazione della richiesta.")
    },
    complete:()=>{}
  })
}
}
