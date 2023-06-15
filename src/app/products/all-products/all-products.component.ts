import { Component, OnDestroy, OnInit } from '@angular/core';
import { productService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { Content } from '../../interfaces/page.interface';
import { CookieService } from 'ngx-cookie-service';
import { authService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { categoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit, OnDestroy {

  constructor(private servicio: productService, private cookieService: CookieService, private router: Router,
    private authService: authService, private route: ActivatedRoute, private servicioCategoria: categoriaService) {
  }

  isAdmin: boolean = false

  token: string = ""

  lista: Content[] = []

  listaPagination: number[] = []

  totalPages: number = 1

  sizeNumber: number = 16

  pageNumber: number = 1

  idCategoria!: number

  nombreCategoria: string = ''

  loading: boolean = false

  ngOnInit(): void {
    this.route.queryParams
      .subscribe({
        next: (queryParams) => {
          this.idCategoria = queryParams['idCategoria']
          if (this.idCategoria) {
            this.listaPagination = []
            this.getCategoria()
          }
          this.getProducts()


        }
      })

    this.token = this.cookieService.get('token')
    if (this.token && this.authService.decodeJwt(this.token).role == 'ADMIN') {
      this.isAdmin = true;
    }

  }

  ngOnDestroy(): void {

  }

  getProducts() {
    this.loading = true
    this.servicio.getProducts(this.pageNumber, this.sizeNumber, this.idCategoria)
      .subscribe({
        next: (resp) => {
          this.lista = resp.content
          this.totalPages = resp.totalPages

          for (let i = 0; i < this.totalPages; i++) {
            this.listaPagination.push(i + 1)
          }
          this.loading = false
        },
        error: (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo ha ido mal"
          })
          this.loading = false
        }
      })
  }

  getCategoria() {
    this.loading = true
    this.servicioCategoria.getCategoriaById(this.idCategoria)
      .subscribe({
        next: (resp) => {
          if (resp) {
            this.nombreCategoria = resp.nombre
            this.loading = false
          }
          else {
            Swal.fire({
              icon: "error",
              title: "Oops",
              text: "Categoria inexistente"
            })
            this.loading = false
          }
        },
        error: (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo ha ido mal"
          })
          this.loading = false
        }
      })
  }


  previousPageNumber() {
    if (this.pageNumber > 1) {
      this.pageNumber = this.pageNumber - 1
      this.loading = true
      this.servicio.getProducts(this.pageNumber, this.sizeNumber, this.idCategoria)
        .subscribe({
          next: (resp) => {
            this.lista = resp.content
            this.loading = false
          },
          error: (error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Algo ha ido mal"
            })
            this.loading = false
          }
        })
    }

  }

  nextPageNumber() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber = this.pageNumber + 1
      this.loading = true
      this.servicio.getProducts(this.pageNumber, this.sizeNumber, this.idCategoria)
        .subscribe({
          next: (resp) => {
            this.lista = resp.content
            this.loading = false
          },
          error: (error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Algo ha ido mal"
            })
            this.loading = false
          }
        })
    }

  }

  setPageNumber(numero: number) {
    this.pageNumber = numero
    this.loading = true
    this.servicio.getProducts(this.pageNumber, this.sizeNumber, this.idCategoria)
      .subscribe({
        next: (resp) => {
          this.lista = resp.content
          this.loading = false
        },
        error: (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo ha ido mal"
          })
          this.loading = false
        }
      })
  }

}
