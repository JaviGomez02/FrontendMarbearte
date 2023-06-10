import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { authService } from 'src/app/auth/auth.service';
import { Direccion } from 'src/app/interfaces/direccion.interface';
import { ItemCarrito } from 'src/app/interfaces/itemCarrito.interface';
import { carritoService } from 'src/app/services/carrito.service';
import { pedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito-final',
  templateUrl: './carrito-final.component.html',
  styleUrls: ['./carrito-final.component.css']
})
export class CarritoFinalComponent implements OnInit {

  constructor(private servicioCarrito: carritoService, private servicioPedido: pedidoService, private authService: authService, private cookieService: CookieService, private route: Router, private servicioUsuario: UsuarioService) { }

  listaProductos: ItemCarrito[] = this.servicioCarrito.getListaCarrito();

  listaDirecciones!: Direccion[]

  token!: string

  ngOnInit(): void {
    // if(!this.listaProductos.length){
    //   Swal.fire({
    //     icon:'info',
    //     title:'La cesta se encuentra vacía',
    //     text: 'Redirigiendo a home...',
    //     timer: 1500
    //   }).then((resp)=>{         
    //     this.route.navigate(["/"])
    //   })
    // }
    this.token = this.cookieService.get('token')
    if (this.token) {
      this.servicioUsuario.getUsuarioByUsername(this.authService.decodeJwt(this.token).sub)
        .subscribe({
          next: (resp) => {
            this.listaDirecciones=resp.direcciones
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops',
              text: 'Ocurrió un error inesperado, volviendo al home...',
              timer: 2000
            }).then((result) => {
              this.route.navigateByUrl('/')
            })
          }
        })
    }


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
                window.location.reload()
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
