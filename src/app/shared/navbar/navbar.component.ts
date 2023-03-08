import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { authService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { categoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Router } from '@angular/router';

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

  listaCategorias: Categoria[] = []

  token!: string

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
    this.authService.logout()
    window.location.reload()
  }

  verProductos(idCategoria: number) {
    this.route.navigateByUrl('products/all?idCategoria=' + idCategoria)

  }

  updateUsuario() {
    this.route.navigateByUrl('usuarios/update/' + this.usuario)
  }

}
