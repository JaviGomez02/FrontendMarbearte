import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { authService } from 'src/app/auth/auth.service';
import { Pedido, Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit{

  token!:string
  usuario!:Usuario
  listaPedidos:Pedido[]=[]
  meses:string[]=["Enero", 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

  constructor(private cookieService:CookieService, private authService:authService, private servicioUsuario:UsuarioService, private route:Router){}

  ngOnInit(): void {
    this.token = this.cookieService.get('token')
    if (this.token) {
      this.servicioUsuario.getUsuarioByUsername(this.authService.decodeJwt(this.token).sub)
      .subscribe({
        next: (resp)=>{
          this.usuario=resp
          this.listaPedidos=resp.pedidos
        },
        error: (error)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: 'Ocurrió un error inesperado, volviendo al home...',
            timer: 2000
          }).then((result)=>{
            this.route.navigateByUrl('/')
          })
        }
      })
    }
  }

  devolverListaCompras(index:number){
    return this.listaPedidos[index].compras
  }

  calcularTotalPedido(index:number){
    let total=0
    let lista=this.devolverListaCompras(index)
    for(let i=0;i<lista.length;i++){
      total+=lista[i].price
    }
    return total
  }

  devolverFechaPedido(index:number){
    let fecha = new Date(this.listaPedidos[index].fecha)
    let mes=this.meses[fecha.getMonth()]
    let cadena= fecha.getDate() + ' de '+ mes + ' de ' +fecha.getFullYear()
    return cadena
  }

}
