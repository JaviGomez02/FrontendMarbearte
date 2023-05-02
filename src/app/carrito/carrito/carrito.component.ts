import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ItemCarrito } from 'src/app/interfaces/itemCarrito.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { carritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  listaProductos!:ItemCarrito[]

  constructor(private cookies:CookieService, private servicioCarrito:carritoService) { }

  ngOnInit(): void {
    this.listaProductos=this.servicioCarrito.getListaCarrito();
    console.log("aaa")
    console.log(this.listaProductos)
  }

}
