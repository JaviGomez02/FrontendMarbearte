import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private servicioProducto: productService, private fb: FormBuilder, private servicioColor: colorService, private activatedRoute: ActivatedRoute, private route: Router, private carrito: carritoService) {
  }
  loading: boolean = false
  producto!: Product
  fotoPrincipal!: Imagene
  listaImagenes!: Imagene[]
  listaColores!: Colore[]
  elemento!: HTMLElement | null
  listaDivs!: HTMLCollectionOf<HTMLElement> | null
  color: string = ""
  flag: boolean = false
  tieneStock: boolean = true

  myForm: FormGroup = this.fb.group({
    cantidad: ['', [Validators.required, Validators.min(1), Validators.max(99)]]
  })

  ngOnInit(): void {
    this.myForm.setValue({
      cantidad: 1
    })

    this.getProducto()
  }

  getProducto() {
    this.loading=true
    this.servicioProducto.getProducto(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (resp) => {
          if (resp) {
            this.producto = resp
            this.fotoPrincipal = resp.imagenes[0]
            this.listaImagenes = resp.imagenes
            this.listaImagenes.shift()
            this.listaColores = resp.colores
            if (resp.stock <= 0) {
              this.tieneStock = false
            }
            this.loading=false
          }
          else {
            this.route.navigateByUrl('/')
            Swal.fire({
              icon: "error",
              title: "Oops",
              text: "Producto no encontrado"
            })
            this.loading=false
          }
        },
        error: (error) => {
          this.route.navigateByUrl('/')
          Swal.fire({
            icon: "error",
            title: "Oops",
            text: "Producto no encontrado"
          })
          this.loading=false
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



  anadirAlCarrito() {

    if (!this.myForm.invalid) {
      if (!this.listaColores.length) {
        this.carrito.añadirProducto(this.producto, this.myForm.value.cantidad)
      }
      else {
        if (this.color != "") {
          this.loading=true
          this.servicioColor.getColorById(this.color)
            .subscribe({
              next: (resp) => {
                this.producto.colores = [{ color: resp }]
                this.carrito.añadirProducto(this.producto, this.myForm.value.cantidad)
                this.loading=false
              },
              error: (error) => {
                Swal.fire({
                  icon: "error",
                  title: "Oops",
                  text: "Algo ha ido mal"
                })
                this.loading=false
              }
            })
        }
        else {
          Swal.fire({
            icon: "error",
            title: "Oops",
            text: "Debe seleccionar un color"
          })
          this.loading=false
        }
      }
    }
  }
}
