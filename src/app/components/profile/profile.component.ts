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
  recensioneForm!: FormGroup;
  poli: string[] = ['positiva', 'negativa'];
  user: any;
  recensioneFormPagination!: FormGroup;
  recePageNumbers:number[]=[]
  showDeleteConfirm:boolean=false;
  recensioniAz:any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private formsService: FormsService
  ) {}

  ngOnInit(): void {
    this.user = this.formsService.getUser();
    console.log(this.data.role)
    this.isTrasportatore=this.data.role=='Trasportatore'
    this.recensioneForm = new FormGroup({
      polo: new FormControl('', Validators.required),
      message: new FormControl('')
    });
    this.recensioneFormPagination = new FormGroup({
      size: new FormControl(''),
      orderBy: new FormControl('')
    });
    this.updateReces()
  }

  inviaRecensione() {
    if (this.recensioneForm.controls['polo'].valid) {
      if (this.data.role == 'Trasportatore') {
        this.profileService.postTRecensione({
          message: this.recensioneForm.controls['message'].value || '',
          polo: this.recensioneForm.controls['polo'].value,
          trasportatore_id: this.data.id,
          azienda_id:this.user.id
        }).subscribe({
          next:(rece:any)=>{
            this.recensioneForm.reset()
            this.updateReces()
          },
          error:(error:any)=>{
            this.recensioneForm.reset()
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
  this.showDeleteConfirm=false;
  if(this.isTrasportatore){
this.profileService.getTRecensioni(this.data.id,0,10,"id").subscribe({
  next:(reces:any)=>{
    this.recensioniT=reces

    for(let i = 1; i <=this.recensioniT.totalPages;i++){
this.recePageNumbers.push(i)
    }
  },
  error:(error:any)=>{
    this.toastr.error(error?.error?.message||error?.error?.messageList[0]||"E' sucesso qualcosa durante l'elaborazione della richiesta.")
  },
  complete:()=>{}
})
  }else{
    this.profileService.getAzRecensioni(this.data.id,page||0,size||10,orderBy||"id").subscribe({
      next:(reces:any)=>{
        this.recensioniAz=reces

        for(let i = 1; i <=this.recensioniAz.totalPages;i++){
    this.recePageNumbers.push(i)
        }
      },
      error:(error:any)=>{
        this.toastr.error(error?.error?.message||error?.error?.messageList[0]||"E' sucesso qualcosa durante l'elaborazione della richiesta.")
      },
      complete:()=>{}
    });
  }
}
deleteRece(receId?:number,userId?:number){
  if(receId&&userId){
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
  }else{
    this.showDeleteConfirm=!this.showDeleteConfirm;
  }
}
Number(value:string){
  return Number(value);
}
}
