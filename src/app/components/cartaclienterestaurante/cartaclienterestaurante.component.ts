import { Component, OnInit } from '@angular/core';
import {CartarestauranteService} from "../../services/cartarestaurante.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cartaclienterestaurante',
  templateUrl: './cartaclienterestaurante.component.html',
  styleUrls: ['./cartaclienterestaurante.component.scss'],
})
export class CartaclienterestauranteComponent  implements OnInit {


  token = {token: ''}
  productos: any;
  entrante: boolean = false;
  guiso: boolean = false;
  frito: boolean = false;
  revuelto: boolean = false;
  carne: boolean = false;
  pescado: boolean = false;
  postre: boolean = false;
  vino: boolean = false;
  refresco: boolean = false;
  agua: boolean = false;
  cerveza: boolean = false;
  bebidaAlcoholica: boolean = false;
  coctel: boolean = false;
  otros: boolean = false;

  constructor(private cartarestauranteService : CartarestauranteService, private router : Router) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.token.token = token;
    }
    this.ocultarPrecio();
  }
  ocultarPrecio(){
    this.cartarestauranteService.listarProducto(this.token).subscribe(data =>{
      data.forEach(item =>{
        if (item.producto?.tipoCategoria === 'ENTRANTE'){
          this.entrante = true;
        }
        if (item.producto?.tipoCategoria === 'GUISO'){
          this.guiso = true;
        }
        if (item.producto?.tipoCategoria === 'FRITO'){
          this.frito = true;
        }
        if (item.producto?.tipoCategoria === 'REVUELTO'){
          this.revuelto = true;
        }
        if (item.producto?.tipoCategoria === 'CARNE'){
          this.carne = true;
        }
        if (item.producto?.tipoCategoria === 'PESCADO'){
          this.pescado = true;
        }
        if (item.producto?.tipoCategoria === 'POSTRE'){
          this.postre = true;
        }
        if (item.producto?.tipoCategoria === 'VINO'){
          this.vino = true;
        }
        if (item.producto?.tipoCategoria === 'REFRESCO'){
          this.refresco = true;
        }
        if (item.producto?.tipoCategoria === 'GUISO'){
          this.guiso = true;
        }
        if (item.producto?.tipoCategoria === 'AGUA'){
          this.agua = true;
        }
        if (item.producto?.tipoCategoria === 'CERVEZA'){
          this.cerveza = true;
        }
        if (item.producto?.tipoCategoria === 'BEBIDA_ALCOHOLICA'){
          this.bebidaAlcoholica = true;
        }
        if (item.producto?.tipoCategoria === 'COCTEL'){
          this.coctel = true;
        }
        if (item.producto?.tipoCategoria === 'OTROS'){
          this.otros = true;
        }
      });
      this.productos = data;
    })
  }

}