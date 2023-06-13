import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { authService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { categoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private cookieService: CookieService, private authService: authService,
    private categoriaService: categoriaService, private route: Router) { }

  isAdmin$!: Observable<boolean>

  isLoged$!: Observable<boolean>

  carrito: boolean = false

  listaCategorias: Categoria[] = []

  token!: string

  claseCarrito: string = ''

  usuario: string = ""

  ngOnInit(): void {
    this.isAdmin$ = this.authService.isAdmin;
    this.isLoged$ = this.authService.isLoged;

    this.categoriaService.getCategorias()
      .subscribe({
        next: (resp) => {
          this.listaCategorias = resp
        }
      })

    this.token = this.cookieService.get('token')
    if (this.token) {
      this.usuario = this.authService.decodeJwt(this.token).sub

    }
  }

  logout() {
    this.cerrarCarrito()
    this.authService.logout()
    this.route.navigateByUrl('/')
  }

  verProductos(idCategoria: number) {
    this.route.navigateByUrl('products/all?idCategoria=' + idCategoria)

  }

  updateUsuario() {
    this.route.navigateByUrl('usuarios/update/' + this.usuario)
  }

  mostrarCarrito() {
    // this.isLoged$
    //   .subscribe({
    //     next: (resp) => {
    //       if (resp) {
    //         this.carrito = true
    //         document.querySelector('.overlay')?.classList.remove("overlayCerrado")
    //         document.querySelector('.overlay')?.classList.add("overlayAbierto")
    //         this.claseCarrito = 'abierto'
    //       }
    //       else {
    //         Swal.fire({
    //           icon: "info",
    //           title: "Inicie sesión",
    //           text: "Necesita iniciar sesión para acceder al carrito",
    //           timer: 2000
    //         }).then((resp) => {
    //           this.route.navigateByUrl("account/login")
    //         })
    //       }
    //     }
    //   })

    this.carrito = true
    this.claseCarrito = 'abierto'

  }

  cerrarCarrito() {
    this.carrito = false;
    this.claseCarrito = 'cerrado';
  }

  recibirEvento(flag:boolean){
    if(flag){
      this.cerrarCarrito()
    }
  }


}
