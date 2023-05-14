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

    // console.log(this.listaProductos)

  }

  calcularTotal():any{
    let total=0
    for (let i=0;i<this.listaProductos.length;i++){
      total+=this.listaProductos[i].producto.price*this.listaProductos[i].cantidad
    }
    return total.toFixed(2);
  }

  calcularUnidades():number{
    let unidades=0
    for (let i=0;i<this.listaProductos.length;i++){
      unidades+=this.listaProductos[i].cantidad
    }
    return unidades;
  }

}
