import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Content } from 'src/app/interfaces/page.interface';
import { categoriaService } from 'src/app/services/categoria.service';
import { productService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private servicioProducto: productService, private route: Router, private servicioCategoria: categoriaService) { }

  nuevosProductos: Content[] = []

  masVendidos: Content[] = []

  listaCategorias: Categoria[] = []

  loading: boolean = false

  ngOnInit(): void {
    this.getNuevosProductos()

    this.getMasVendidos()

    this.getCategorias()
  }


  getNuevosProductos() {
    this.loading=true
    this.servicioProducto.getProducts(1, 8, null)
      .subscribe({
        next: (resp) => {
          this.nuevosProductos = resp.content
          this.loading=false
        },
        error:(error)=>{
          this.loading=false
        }
      })
  }

  getMasVendidos() {
    this.loading=true
    this.servicioProducto.getProducts(2, 8, null)
      .subscribe({
        next: (resp) => {
          this.masVendidos = resp.content
          this.loading=false
        },
        error:(error)=>{
          this.loading=false
        }
      })
  }

  getCategorias() {
    this.loading=true
    this.servicioCategoria.getCategorias()
      .subscribe({
        next: (resp) => {
          if (resp.length >= 3) {
            for (let i = 0; i < 3; i++) {
              this.listaCategorias.push(resp[i])
            }
          }
          this.loading=false
        },
        error: (error) => {
          this.loading=false
        }
      })
  }

  verProductos(idCategoria: number) {
    this.route.navigateByUrl('products/all?idCategoria=' + idCategoria)
  }



}
