import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Color, Colore, Content, Imagene } from 'src/app/interfaces/page.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { carritoService } from 'src/app/services/carrito.service';
import { colorService } from 'src/app/services/color.service';
import { productService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private servicioProducto: productService, private servicioColor: colorService, private activatedRoute: ActivatedRoute, private route: Router, private carrito: carritoService) {
  }

  producto!: Product

  fotoPrincipal!: Imagene

  listaImagenes!: Imagene[]

  listaColores!: Colore[]

  elemento!: HTMLElement | null

  listaDivs!: HTMLCollectionOf<HTMLElement> | null

  color: string = ""

  flag: boolean = false

  ngOnInit(): void {
    this.servicioProducto.getProducto(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (resp) => {
          console.log(resp)
          if (resp) {
            this.producto = resp
            this.fotoPrincipal = resp.imagenes[0]
            this.listaImagenes = resp.imagenes
            this.listaImagenes.shift()
            this.listaColores = resp.colores
          }
          else {
            this.route.navigateByUrl('/')
            Swal.fire({
              icon: "error",
              title: "Oops",
              text: "Producto no encontrado"
            })
          }
        },
        error: (error) => {
          this.route.navigateByUrl('/')
          Swal.fire({
            icon: "error",
            title: "Oops",
            text: "Producto no encontrado"
          })
        }
      })
  }


  seleccionarColor(idColor: string) {

    this.listaDivs = document.getElementsByTagName("div")
    for (let i = 0; i < this.listaDivs.length; i++) {
      this.listaDivs[i].classList.remove("div-colorSelect")
    }

    this.color = idColor
    this.elemento = document.getElementById(idColor)
    this.elemento?.classList.add("div-colorSelect")
  }



  anadirAlCarrito(cantidad: number) {
    // this.servicioColor.getColorById(this.color)
    // .subscribe({
    //   next:(resp)=>{
    //     this.producto.colores=[resp];
    //     this.carrito.añadirProducto(this.producto, cantidad)
    //   },
    //   error:(error)=>{
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops",
    //       text: "Algo ha ido mal"
    //     })
    //   }
    // })

    this.producto.colores = [];
    this.carrito.añadirProducto(this.producto, cantidad)
    window.location.reload()
  }
}
