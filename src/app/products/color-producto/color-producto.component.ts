import { Component, OnInit } from '@angular/core';
import { productService } from '../../services/product.service';
import { Content, Color } from '../../interfaces/page.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { colorService } from '../../services/color.service';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-color-producto',
  templateUrl: './color-producto.component.html',
  styleUrls: ['./color-producto.component.css']
})
export class ColorProductoComponent implements OnInit {

  constructor(private servicioProducto: productService, private servicioColor: colorService,
    private route: ActivatedRoute, private fb: FormBuilder, private router: Router) { }


  loading: boolean = false

  producto!: Product

  listaColores: Color[] = []

  coloresAnnadir: Color[] = []

  idProducto!: number

  ngOnInit(): void {
    this.idProducto = this.route.snapshot.queryParams['idProducto']

    this.getProducto()

    this.getColores()
  }

  getProducto(){
    this.loading=true
    this.servicioProducto.getProducto(this.idProducto)
    .subscribe({
      next: (resp) => {
        this.producto = resp
        this.loading=false
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops',
          text: 'Ocurrió un error inesperado, volviendo...',
          timer: 2000
        }).then((result) => {
          this.router.navigateByUrl('/products/all')
        })
        this.loading=false
      }
    })
  }

  getColores() {
    this.loading=true
    this.servicioColor.getColores()
      .subscribe({
        next: (resp) => {
          this.listaColores = resp
          this.loading=false
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: 'Ocurrió un error inesperado, volviendo...',
            timer: 2000
          }).then((result) => {
            this.router.navigateByUrl('/products/all')
          })
          this.loading=false
        }
      })
  }

  irAnnadir() {
    this.router.navigateByUrl('/products/color/add?idProducto=' + this.idProducto)
  }

  eliminarColor(codigoColor: string, nombre: String) {
    let newCodigo: string = codigoColor.slice(1)
    Swal.fire({
      title: '¿Seguro que desea borrar el color ' + nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading=true
        this.servicioColor.deleteColor(newCodigo)
          .subscribe({
            next: (resp) => {
              if (resp) {
                Swal.fire(
                  'Eliminado!',
                  'Se ha eliminado el color correctamente.',
                  'success'
                ).then((resp) => {
                  this.getColores()
                })
                this.loading=false
              }
              else {
                Swal.fire(
                  'Oops!',
                  'Ocurrió un error inesperado.',
                  'error'
                )
                this.loading=false
              }
            }
          })
      }
    })

  }

  onCheckboxPressed(colorSelected: any, target: EventTarget | null) {

    const input = target as HTMLInputElement

    if (input.checked) { //Si el elemento fue seleccionado
      //Agregamos la categoría seleccionada al arreglo de categorías seleccionadas
      this.coloresAnnadir.push(colorSelected);
    } else { //Si el elemento fue deseleccionado
      //Removemos la categoría seleccionada del arreglo de categorías seleccionadas
      this.coloresAnnadir.splice(this.coloresAnnadir.indexOf(colorSelected), 1);
    }
  }

  save() {
    if (this.coloresAnnadir.length) {
      for (let i = 0; i < this.coloresAnnadir.length; i++) {
        // console.log(this.coloresAnnadir[i])
        this.loading=true
        this.servicioProducto.asignarColor(this.idProducto, this.coloresAnnadir[i].color)
          .subscribe({
            next: (resp) => {
              Swal.fire(
                'Añadido!',
                'El color/colores ha sido añadido correctamente.',
                'success'
              ).then((resp) => {
                this.router.navigateByUrl('/products/all')
              })
              this.loading=false
            },
            error: (error) => {
              Swal.fire(
                'Oops!',
                'Algo ha ido mal.',
                'error'
              )
              this.loading=false
            }
          })
      }
    }
    else {
      Swal.fire(
        'Oops!',
        'No se ha seleccionado ningún color.',
        'error'
      )
    }
  }

}
