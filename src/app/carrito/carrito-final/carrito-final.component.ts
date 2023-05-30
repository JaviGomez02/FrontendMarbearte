import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemCarrito } from 'src/app/interfaces/itemCarrito.interface';
import { carritoService } from 'src/app/services/carrito.service';
import { pedidoService } from 'src/app/services/pedido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito-final',
  templateUrl: './carrito-final.component.html',
  styleUrls: ['./carrito-final.component.css']
})
export class CarritoFinalComponent implements OnInit {

  constructor(private servicioCarrito: carritoService, private servicioPedido:pedidoService, private route:Router) { }

  listaProductos: ItemCarrito[] = this.servicioCarrito.getListaCarrito();


  ngOnInit(): void {
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

  eliminarProducto(item: ItemCarrito) {
    this.servicioCarrito.eliminarProducto(item)
    this.listaProductos = this.servicioCarrito.getListaCarrito();
  }

  comprar() {
    if (this.listaProductos.length) {
      this.servicioPedido.realizarPedido()
        .subscribe({
          next: (resp) => {
            if (resp) {
              Swal.fire({
                icon: 'success',
                title: 'Pedido realizado correctamente!'
              }).then((resp) => {
                this.route.navigateByUrl('/home')
              })
              
              this.servicioCarrito.vaciarCarrito();
              this.listaProductos = this.servicioCarrito.getListaCarrito();
            }
            else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo ha ido mal'
              })
            }

          }
          , error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo ha ido mal'
            })
          }
        })
    }

  }

}
