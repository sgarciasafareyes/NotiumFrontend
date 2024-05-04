import {Component, NgModule, OnInit} from '@angular/core';
import {HeaderrestauranteComponent} from "../headerrestaurante/headerrestaurante.component";
import {FooterrestauranteComponent} from "../footerrestaurante/footerrestaurante.component";
import {RestauranteUserComponent} from "./restaurante-user/restaurante-user.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.scss'],
  imports: [
    HeaderrestauranteComponent,
    FooterrestauranteComponent,
  ],
  standalone: true
})

@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})


export class RestauranteComponent  implements OnInit {

  current: any;
  constructor() { }

  ngOnInit() {}

}