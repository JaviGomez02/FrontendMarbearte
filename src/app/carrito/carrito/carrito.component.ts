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

  listaProductos:ItemCarrito[]=this.servicioCarrito.getListaCarrito();

  constructor(private cookies:CookieService, private servicioCarrito:carritoService) { }

  ngOnInit(): void {

    console.log(this.listaProductos)


  }

}
