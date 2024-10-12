import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
images:any[]=[]

ngOnInit(): void {
    this.images = [
      {
        name:"Instagram logo",
        src:"assets/footer/instagram.png"
      },
      {
        name:"Facebook logo",
        src:"assets/footer/facebookLogo.png"
      },
      {
        name:"Instagram logo",
        src:"assets/footer/linkedinLogo.png"
      }
    ]
}
}
