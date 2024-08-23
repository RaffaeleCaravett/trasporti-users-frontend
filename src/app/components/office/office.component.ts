import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OfficeService } from 'src/app/shared/services/office.service';
import { AnnuncioInfoComponent } from '../annuncio-info/annuncio-info.component';
import { FormsService } from 'src/app/shared/services/forms.service';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent  implements OnInit{
  user:any
  isTrasportatore:boolean=false
  azioni:string[]=['Aggiungi un annuncio','Monitora un annuncio','Modifica il profilo','Cerca un Trasportatore','Monitora le tue statistiche']
  toDo:string='Modifica il profilo'
  aggiungiAnnuncioForm!:FormGroup
  aggiungiAnnuncioSubmitted:boolean=false
  year:number=0
  today = new Date()
  today1 = new Date()
  todayPlusAYear = new Date(this.today1.setDate(this.today1.getDate()+365))
  giorni : number[]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  mesi : number[]=[1,2,3,4,5,6,7,8,9,10,11,12]
  anni : number[]=[this.year,this.year+1]
  annunciByAzienda:any
  searchAnnunciByAzienda!:FormGroup
  annunciByAziendaAndPubblicati:number=0
  annunciByAziendaPages:number[]=[]
  annunciByAziendaElementi:number[]=[]
  annunciByAziendaOrderBy:string[]= []
  typeFormValue:string=''
  searchAnnunciByAziendaRetrMax:number=14000
  searchAnnunciByAziendaRetrMin:number=2000
  modifyProfile!:FormGroup
  cities:any[]=[]
  settori:any[]=[]
  changePasswordForm!:FormGroup
constructor(private toastr:ToastrService,private officeService:OfficeService,private matDialog:MatDialog,private formsService:FormsService){}

  ngOnInit():void{
    localStorage.setItem('location','/office')
this.year = new Date().getFullYear()
        this.user=JSON.parse(localStorage.getItem('Trasportatore')!)||JSON.parse(localStorage.getItem('Azienda')!)
        if(this.user&&this.user.cognome){
          this.isTrasportatore=true
        }

this.aggiungiAnnuncioForm= new FormGroup({
  retribuzione: new FormControl('',Validators.required),
  da:new FormControl('',Validators.required),
  a:new FormControl('',Validators.required),
  data:new FormControl('',[Validators.required,Validators.max(this.year+1),Validators.min(this.year)]),
  testo:new FormControl('',Validators.required),
  numeroPedane:new FormControl('',Validators.required)
})
this.searchAnnunciByAzienda= new FormGroup({
  page:new FormControl(''),
  size:new FormControl(''),
  orderBy:new FormControl(''),
  type:new FormControl(''),
  da:new FormControl(''),
  a:new FormControl('')
})

this.modifyProfile= new FormGroup({
  citta:new FormControl(this.user.citta,Validators.required),
  regione:new FormControl(this.user.regione,Validators.required),
  indirizzo:new FormControl(this.user.indirizzo,Validators.required),
  cap:new FormControl(this.user.cap,Validators.required),
  email:new FormControl(this.user.email,[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
  nomeAzienda:new FormControl(this.user?.nomeAzienda,Validators.required),
  fatturatoMedio:new FormControl(this.user?.fatturatoMedio,Validators.required),
  numeroDipendenti:new FormControl(this.user?.numeroDipendenti,Validators.required),
  settore:new FormControl(this.user?.settore,Validators.required),
  partitaIva:new FormControl(this.user?.partitaIva,[Validators.required,Validators.pattern(/^[0-9]{11}$/)])
})
this.changePasswordForm=new FormGroup({
oldPassword:new FormControl('',[Validators.required,Validators.minLength(6)]),
repeteOldPassword:new FormControl('',[Validators.required,Validators.minLength(6)]),
newPassword:new FormControl('',[Validators.required,Validators.minLength(6)])
})
this.formsService.getCities().subscribe({
  next:(cities:any)=>{
this.cities=cities
  },
  error:(err:any)=>{
    this.toastr.error(err.error.message||err.error.messageList[0])
  },
  complete:()=>{}
})
this.formsService.getSettori().subscribe({
  next:(settori:any)=>{
this.settori=settori
  },
  error:(err:any)=>{
    this.toastr.error(err.error.message||err.error.messageList[0])
  },
  complete:()=>{}
})
this.getAnnunci()
      }

      setBackground(i:number,toDo:string){
        this.getAnnunci()
        this.toDo=toDo
        this.aggiungiAnnuncioSubmitted=false
        let p = document.getElementsByClassName(`p-${i}`)[0] as HTMLElement
for(let a = 6 ;a<=10;a++){

  if(a==i){
  p.style.borderRadius='.3rem'
  p.style.background='red'
  p.style.color='white'
}else{
let otherP = document.getElementsByClassName(`p-${a}`)[0] as HTMLElement
  otherP.style.background='white'
  otherP.style.color='black'
}
}
      }


      addAnnuncio(){
        this.aggiungiAnnuncioSubmitted=true
if(this.aggiungiAnnuncioForm.valid){
  let dataDaSpedire = this.aggiungiAnnuncioForm.controls['data'].value.split('-')
const dialog = this.matDialog.open(AnnuncioInfoComponent,{data:this.aggiungiAnnuncioForm.controls})
dialog.afterClosed().subscribe((data:any)=>{
  if(data&&data=='conferma'){
this.officeService.postSpedizione({
da:this.aggiungiAnnuncioForm.controls['da'].value,
a:this.aggiungiAnnuncioForm.controls['a'].value,
daSpedireAnno:dataDaSpedire[0],
daSpedireMese:dataDaSpedire[1],
daSpedireGiorno:dataDaSpedire[2],
descrizione:this.aggiungiAnnuncioForm.controls['testo'].value,
numeroPedane:this.aggiungiAnnuncioForm.controls['numeroPedane'].value,
azienda_id:this.user.id
}).subscribe({
next:(data:any)=>{
this.officeService.publicAnnuncio({
  retribuzione:this.aggiungiAnnuncioForm.controls['retribuzione'].value,
  aziendaId:this.user.id,
  spedizioneId:data.id
}).subscribe({
  next:(data:any)=>{
    this.toastr.show("Annuncio inserito correttamente")
    this.aggiungiAnnuncioForm.reset()
    this.aggiungiAnnuncioSubmitted=false
  },
  error:(error:any)=>{
    this.toastr.error(error.error.message||error.error.messageList[0]||"Qualcosa è andato storto nell'elaborazione della richiesta.")
  },
  complete:()=>{}
})
},
error:(error:any)=>{
  this.toastr.error(error.error.message||error.error.messageList[0]||"Qualcosa è andato storto nell'elaborazione della richiesta.")
},
complete:()=>{}
})
  }
  else{
    this.toastr.error('Non è stato inserito nessun annuncio.')
  }
})
}else{
this.toastr.error('Completa correttamente il form prima di inserire l\'annuncio')
}

      }

      updateAnnunciByAzienda(){
        this.annunciByAziendaPages=[]
        this.annunciByAziendaElementi=[]
        this.annunciByAziendaOrderBy= []
        if(this.searchAnnunciByAzienda.controls['type'].value==''){
this.officeService.getAnnunciByAziendaId(this.user.id, this.searchAnnunciByAzienda.controls['page'].value||0,this.searchAnnunciByAzienda.controls['size'].value||10,this.searchAnnunciByAzienda.controls['orderBy'].value||"id").subscribe({
          next:(data:any)=>{
        this.annunciByAzienda = data
        for(let i = 0; i<=data.totalPages-1;i++){
          this.annunciByAziendaPages.push(i)
          this.annunciByAziendaElementi=[10,50,100]
          this.annunciByAziendaOrderBy= ['id','retribuzione']
        }
          },
          error:(error:any)=>{

          },
          complete:()=>{
          }
        })
        }else if(this.searchAnnunciByAzienda.controls['type'].value=='retribuzione'){
          this.officeService.getByRetribuzione(this.searchAnnunciByAziendaRetrMin,this.searchAnnunciByAziendaRetrMax, this.searchAnnunciByAzienda.controls['page'].value||0,this.searchAnnunciByAzienda.controls['size'].value||10,this.searchAnnunciByAzienda.controls['orderBy'].value||"id").subscribe({
            next:(data:any)=>{
          this.annunciByAzienda = data
          for(let i = 0; i<=data.totalPages-1;i++){
            this.annunciByAziendaPages.push(i)
            this.annunciByAziendaElementi=[10,50,100]
            this.annunciByAziendaOrderBy= ['id','retribuzione']
          }
            },
            error:(error:any)=>{

            },
            complete:()=>{
            }
          })
        }else if(this.searchAnnunciByAzienda.controls['type'].value=='dataPubblicazione'&&this.searchAnnunciByAzienda.controls['da'].value&&this.searchAnnunciByAzienda.controls['a'].value){
          let da =this.searchAnnunciByAzienda.controls['da'].value.split('-')
          let a = this.searchAnnunciByAzienda.controls['a'].value.split('-')
          var fromDate = Date.parse(da);
          var toDate = Date.parse(a);
        if(fromDate<toDate){
          this.officeService.getByData(da[0],da[1],da[2],a[0],a[1],a[2], this.searchAnnunciByAzienda.controls['page'].value||0,this.searchAnnunciByAzienda.controls['size'].value||10,this.searchAnnunciByAzienda.controls['orderBy'].value||"id").subscribe({
            next:(data:any)=>{
          this.annunciByAzienda = data
          for(let i = 0; i<=data.totalPages-1;i++){
            this.annunciByAziendaPages.push(i)
            this.annunciByAziendaElementi=[10,50,100]
            this.annunciByAziendaOrderBy= ['id','retribuzione']
          }
            },
            error:(error:any)=>{

            },
            complete:()=>{
            }
          })
        }else{
          this.toastr.error("La data 'Da' non può essere superiore alla data 'A'")
        }
        }

      }

      showAnnuncio(annuncio:any){
        const dialog = this.matDialog.open(AnnuncioInfoComponent,{data:annuncio})
        dialog.afterClosed().subscribe((data:any)=>{
         if(data&&data[0].da&&data[0].retribuzione&&data!='elimina'){
          let dataDaSpedire = data[0].data.value.split('-')
            this.officeService.putSpedizioneByAzienda(
             {
               da:data[0].da.value,
               a:data[0].a.value,
               daSpedireAnno:dataDaSpedire[0],
               daSpedireMese:dataDaSpedire[1],
               daSpedireGiorno:dataDaSpedire[2],
               descrizione:data[0].testo.value,
               numeroPedane:data[0].numeroPedane.value,
               azienda_id:this.user.id
             },
           data[1]
            ).subscribe({
             next:(spedizione:any)=>{
               this.officeService.putAnnuncioByAzienda({
                 retribuzione:data[0].retribuzione.value,
                 aziendaId:this.user.id,
                 spedizioneId:spedizione.id
               },
             data[2],
           this.user.id).subscribe({
                 next:(data:any)=>{
                   this.toastr.show("Annuncio modificato correttamente")
                   this.updateAnnunciByAzienda()
                 },
                 error:(error:any)=>{
                   this.toastr.error(error.error.message||error.error.messageList[0]||"Qualcosa è andato storto nell'elaborazione della richiesta.")
                 },
                 complete:()=>{}
               })
               },
               error:(error:any)=>{
                 this.toastr.error(error.error.message||error.error.messageList[0]||"Qualcosa è andato storto nell'elaborazione della richiesta.")
               },
               complete:()=>{}
            })

        }else if(data&&data=='elimina'){
        this.officeService.deleteAnnuncioByAzienda(annuncio.id,this.user.id).subscribe({
          next:(data:any)=>{
            if(data){
            this.toastr.show("Annuncio eliminato correttamente")
            this.updateAnnunciByAzienda()
            }else{
            this.toastr.error("Non è stato possibile eliminare l'annuncio. Lavoreremo per risolvere il problema.")
           }
          },
          error:(error:any)=>{
            this.toastr.error(error.error.message||error.error.messageList[0]||"Qualcosa è andato storto nell'elaborazione della richiesta.")
          },
          complete:()=>{}
        })
        }else{
          this.toastr.error("Non è stato modificato nè eliminato nessun annuncio.")
                }
      })

      }
      getAnnunci(){
        this.officeService.getAnnunciByAziendaIdAndStatoPubblicata(this.user.id).subscribe({
          next:(data:any)=>{
        this.annunciByAziendaAndPubblicati = data
          },
          error:(error:any)=>{

          },
          complete:()=>{

          }
        })

        this.updateAnnunciByAzienda()
      }
      updateSlider(event:any, from:string){
        switch(from){
          case('da'):{
           this.searchAnnunciByAziendaRetrMin=event?.target?.value||this.searchAnnunciByAziendaRetrMin
          }
          break;
          case('a'):{
           this.searchAnnunciByAziendaRetrMax=event?.target?.value||this.searchAnnunciByAziendaRetrMax
          }
          break;
          default:{

          }
        }
      }

      getRegioneByCity(city:string){
        let regione ;
         this.formsService.getRegionByCity(city).subscribe({
          next:(regione:any)=>{
            regione=regione;
            this.modifyProfile.controls['regione'].setValue(regione)
            this.modifyProfile.controls['cap'].setValue("87050")
            this.modifyProfile.updateValueAndValidity()
          },
          error:(err:any)=>{
            console.log(err)
            this.toastr.error(err.error.message||err.error.messageList[0])
          },
          complete:()=>{}
        })
      }
modifyProfilo(){
if(this.modifyProfile.valid){
  this.officeService.putAziendaById({
    citta:this.modifyProfile.controls['citta'].value,
  regione:this.modifyProfile.controls['regione'].value,
  indirizzo:this.modifyProfile.controls['indirizzo'].value,
  cap:this.modifyProfile.controls['cap'].value,
  email:this.modifyProfile.controls['email'].value,
  nomeAzienda:this.modifyProfile.controls['nomeAzienda'].value,
  fatturatoMedio:this.modifyProfile.controls['fatturatoMedio'].value,
  numeroDipendenti:this.modifyProfile.controls['numeroDipendenti'].value,
  settore:this.modifyProfile.controls['settore'].value,
  partitaIva:this.modifyProfile.controls['partitaIva'].value
  }).subscribe({
    next:(data:any)=>{
this.user=data
this.toastr.success("Azienda modificata correttamente.")
    },
    error:(error:any)=>{
      this.toastr.error(error.error.message||error.error.messageList[0]||"Qualcosa è successo nell'elaborazione della richiesta.")
    },
    complete:()=>{}
  })
}
}

checkPasswords(ps1:any,ps2:any){
let div = document.querySelector('.inserisciPassword') as HTMLDivElement
if(ps1.valid&&ps2.valid&&ps1.value==ps2.value){
  div.classList.add('blocked')
  div.classList.remove('noned')
}else{
  div.classList.add('noned')
  div.classList.remove('blocked')
}
}

resetPassword(psw1:string,psw2:string){

this.officeService.changePasswordByProfile(psw1,psw2).subscribe({
  next:()=>{

  },
  error:()=>{

  },
  complete:()=>{
    
  }
})
}
    }
