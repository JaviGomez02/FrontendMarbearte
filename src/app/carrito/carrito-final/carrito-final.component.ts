import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { authService } from 'src/app/auth/auth.service';
import { Direccion } from 'src/app/interfaces/direccion.interface';
import { ItemCarrito } from 'src/app/interfaces/itemCarrito.interface';
import { carritoService } from 'src/app/services/carrito.service';
import { direccionService } from 'src/app/services/direccion.service';
import { pedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';


@Component({
  selector: 'app-carrito-final',
  templateUrl: './carrito-final.component.html',
  styleUrls: ['./carrito-final.component.css']
})
export class CarritoFinalComponent implements OnInit {

  constructor(private servicioCarrito: carritoService, private servicioPedido: pedidoService, private authService: authService, private cookieService: CookieService, private route: Router, private servicioUsuario: UsuarioService, private servicioDireccion: direccionService) { }

  listaProductos: ItemCarrito[] = this.servicioCarrito.getListaCarrito();

  listaDirecciones!: Direccion[]

  idDireccion: number = 0

  token!: string

  public payPalConfig?: IPayPalConfig;


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
    this.initConfig();
    this.obtenerDirecciones()
  }

  private initConfig(): void {

    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'AaQ6uY9Tnzc99eBuzOXnYkqWwxE26o7AAOn-TjoFlVmEwC4aOq0ACAA0vSah2vt8cYFmpOaDD6XqDsjW',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: this.calcularTotal().toString(),
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: this.calcularTotal().toString()
              }
            }
          },
          items: this.listaItems()
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        // console.log('onApprove - transaction was approved, but not authorized', data, actions);
        // actions.order.get().then((details: any) => {
        //   console.log('onApprove - you can get full order details inside onApprove: ', details);
        // });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.comprar()
      },
      onCancel: (data, actions) => {
        // console.log('OnCancel', data, actions);
      },
      onError: err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo ha ido mal'
        })
      },
      onClick: (data, actions) => {
        // console.log('onClick', data, actions);

      }
    };
  }

  listaItems() {
    let items: any[] = []
    let item = {}
    for (let i = 0; i < this.listaProductos.length; i++) {
      item = {
        name: this.listaProductos[i].producto.nombre,
        quantity: this.listaProductos[i].cantidad.toString(),
        unit_amount: {
          currency_code: 'EUR',
          value: this.listaProductos[i].producto.price.toString()
        }
      }
      items.push(item)
    }
    return items;
  }

  obtenerDirecciones() {
    this.token = this.cookieService.get('token')
    if (this.token) {
      this.servicioUsuario.getUsuarioByUsername(this.authService.decodeJwt(this.token).sub)
        .subscribe({
          next: (resp) => {
            this.listaDirecciones = resp.direcciones
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

  seleccionarDireccion(id: number) {
    this.idDireccion = id
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

  convertirArray(valor: unknown): string[] {
    if (Array.isArray(valor)) {
      return valor as string[];
    }
    // En caso de que el valor no sea un array, puedes manejar el error o devolver un valor por defecto.
    throw new Error('El valor proporcionado no es un array.');
  }

  addDireccion() {
    Swal.fire({
      title: 'Añadir una direccion',
      html:
        '<input type="text" id="ciudad" style="margin-bottom:20px;height:40px;" placeholder="Ciudad">&nbsp;&nbsp;&nbsp;' +
        '<input type="text" id="localidad" style="height:40px;" placeholder="Localidad">' +
        '<input type="text" id="direccion" style="height:40px;" placeholder="Calle y número">&nbsp;&nbsp;&nbsp;' +
        '<input type="text" id="codigoPostal" style="height:40px;" placeholder="Código postal">',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      width: 600,
      position: 'center',
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve([
            $('#ciudad').val(),
            $('#localidad').val(),
            $('#direccion').val(),
            $('#codigoPostal').val()
          ])
        })
      },
      showLoaderOnConfirm: true,

    }).then((result) => {
      if (result.isConfirmed) {
        let array = this.convertirArray(result.value)
        let codigoPostal = array[3]
        let ciudad = array[0]
        let localidad = array[1]
        let direccion = array[2]
        if (codigoPostal == '' || ciudad == '' || localidad == '' || direccion == '') {
          Swal.fire({
            icon: 'warning',
            title: 'Direccion no añadida',
            text: 'Debes completar todos los campos'
          })
        }
        else {
          this.servicioDireccion.addDireccion(codigoPostal, ciudad, localidad, direccion)
            .subscribe({
              next: (resp) => {
                if (resp) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Direccion añadida correctamente'
                  }).then((result) => {
                    this.obtenerDirecciones()
                  })
                }
                else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops',
                    text: 'Ocurrio un error inesperado.'
                  })
                }
              },
              error: (error) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops',
                  text: 'Ocurrio un error inesperado.'
                })
              }
            })

        }
      }
    })
  }

  borrarDireccion(id: number) {
    Swal.fire({
      icon: 'warning',
      title: 'Esta seguro de que desea borrar la direccion?',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioDireccion.deleteDireccion(id)
          .subscribe({
            next: (resp) => {
              if (resp) {
                Swal.fire({
                  icon: 'success',
                  title: 'Borrado correctamente'
                }).then((result) => {
                  this.obtenerDirecciones()
                })
              }
              else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops',
                  text: 'Ocurrió un error inesperado'
                })
              }
            },
            error: (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'Ocurrió un error inesperado'
              })
            }
          })
      }
    })

  }

  comprar() {

    if (this.listaProductos.length) {
      if (this.idDireccion == 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Selecciona una direccion',
          text: 'Debe seleccionar una direccion para realizar su compra.'
        })
      }
      else {
        this.servicioPedido.realizarPedido()
          .subscribe({
            next: (resp) => {
              if (resp) {
                Swal.fire({
                  icon: 'success',
                  title: 'Pedido realizado correctamente!',
                  text: 'Puedes revisar tu pedido en el apartado "Mis pedidos"'
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

}
