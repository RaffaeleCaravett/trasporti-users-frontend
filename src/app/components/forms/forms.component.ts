import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit{
section:string = 'login'
loginForm!:FormGroup

ngOnInit():void{
this.loginForm=new FormGroup({
  email:new FormControl('',Validators.required),
  password:new FormControl('',[Validators.required,Validators.minLength(6)])
})
}
login(){

}
}
