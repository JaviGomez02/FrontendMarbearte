import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ItemCarrito } from 'src/app/interfaces/itemCarrito.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { carritoService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  listaProductos: ItemCarrito[] = this.servicioCarrito.getListaCarrito();

  
  @Output() miEvento = new EventEmitter<boolean>();


  constructor(private cookies: CookieService, private servicioCarrito: carritoService, private router: Router) { }


  ngOnInit(): void {
    // console.log(this.listaProductos)
  }

  calcularTotal(): any {
    let total = 0
    for (let i = 0; i < this.listaProductos.length; i++) {
      total += this.listaProductos[i].producto.price * this.listaProductos[i].cantidad
    }
    return total.toFixed(2);
  }

  calcularUnidades(): number {
    let unidades = 0
    for (let i = 0; i < this.listaProductos.length; i++) {
      unidades += this.listaProductos[i].cantidad
    }
    return unidades;
  }

  irCesta() {
    if (this.listaProductos.length) {
      this.router.navigateByUrl("/cart")
      this.miEvento.emit(true)
    }
    else{
      Swal.fire({
        icon: 'info',
        title: 'No hay productos',
        text: 'Añada algún producto al carrito para ir a la cesta'
      })
    }
  }

  eliminarProducto(item: ItemCarrito) {
    this.servicioCarrito.eliminarProducto(item)
    this.listaProductos = this.servicioCarrito.getListaCarrito();
  }

}
