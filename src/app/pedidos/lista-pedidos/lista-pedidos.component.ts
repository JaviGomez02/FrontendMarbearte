import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { authService } from 'src/app/auth/auth.service';
import { Pedido, Usuario } from 'src/app/interfaces/usuario.interface';
import { pedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {

  loading: boolean = false
  token!: string
  usuario!: Usuario
  listaPedidos: Pedido[] = []
  meses: string[] = ["Enero", 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

  constructor(private cookieService: CookieService, private servicioPedido: pedidoService, private authService: authService, private servicioUsuario: UsuarioService, private route: Router) { }

  ngOnInit(): void {
    this.token = this.cookieService.get('token')

    this.getUsuario()
  }

  getUsuario() {
    if (this.token) {
      this.loading=true
      this.servicioUsuario.getUsuarioByUsername(this.authService.decodeJwt(this.token).sub)
        .subscribe({
          next: (resp) => {
            this.usuario = resp
            this.listaPedidos = resp.pedidos
            this.loading=false
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ocurrió un error inesperado, volviendo al home...',
              timer: 2000
            }).then((result) => {
              this.route.navigateByUrl('/')
            })
            this.loading=false
          }
        })
    }
  }

  devolverListaCompras(index: number) {
    return this.listaPedidos[index].compras
  }

  calcularTotalPedido(index: number) {
    let total = 0
    let lista = this.devolverListaCompras(index)
    for (let i = 0; i < lista.length; i++) {
      total += lista[i].price
    }
    return total
  }

  devolverFechaPedido(index: number) {
    let fecha = new Date(this.listaPedidos[index].fecha)
    let mes = this.meses[fecha.getMonth()]
    let cadena = fecha.getDate() + ' de ' + mes + ' de ' + fecha.getFullYear()
    return cadena
  }

  convertirArray(valor: unknown): string[] {
    if (Array.isArray(valor)) {
      return valor as string[];
    }
    // En caso de que el valor no sea un array, puedes manejar el error o devolver un valor por defecto.
    throw new Error('El valor proporcionado no es un array.');
  }

  iniciarIncidencia(idPedido: number) {
    Swal.fire({
      title: 'Reportar un problema',
      html:
        '<select id="motivo" class="swal2-input" style="width:400px;">' +
        '<option value="" disabled selected hidden>Selecciona un motivo</option>' +
        '<option value="Defectuoso">El pedido ha llegado defectuoso</option>' +
        '<option value="Llegada">El pedido no ha llegado</option>' +
        '<option value="Falso">El paquete recibido no concuerda con el pedido</option>' +
        '<option value="tros">Otros</option>' +
        '</select>' +
        '<textarea id="comentario" placeholder="Introduce tu comentario" style="width:400px;" class="swal2-textarea"></textarea>',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      focusConfirm: false,
      width: 600,
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve([
            $('#motivo').val(),
            $('#comentario').val()
          ])
        })
      },
      showLoaderOnConfirm: true,

    }).then((result) => {
      if (result.isConfirmed) {
        let array = this.convertirArray(result.value)

        if ((array[0] == null || array[0] == '') || (array[1] == null || array[1] == '')) {
          Swal.fire({
            icon: 'warning',
            title: 'Incidencia no reportada',
            text: 'Debes completar los dos campos'
          })
        }
        else {
          this.loading=true
          this.servicioPedido.reportarIncidencia(this.usuario.username, idPedido, array[0], array[1])
            .subscribe({
              next: (resp) => {
                if (resp) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Incidencia reportada correctamente',
                    text: 'La incidencia se ha reportado de forma correcta. Le contestaremos lo antes posible por via email.'
                  })
                  this.loading=false
                }
                else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops',
                    text: 'Ocurrio un error inesperado.'
                  })
                  this.loading=false
                }
              },
              error: (error) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops',
                  text: 'Ocurrio un error inesperado.'
                })
                this.loading=false
              }
            })

        }
      }
    })
  }

}
