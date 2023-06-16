import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { productService } from '../../services/product.service';
import { Color, Content } from '../../interfaces/page.interface';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { categoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-datatable-product',
  templateUrl: './datatable-product.component.html',
  styleUrls: ['./datatable-product.component.css']
})
export class DatatableProductComponent implements OnInit, OnDestroy {

  constructor(private productService: productService, private route: ActivatedRoute, private router: Router, private servicioCategoria: categoriaService) { }


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  lista: Content[] = []

  nombreCategoria!: String

  idCategoria!: number

  loading: boolean = false

  ngOnInit(): void {
    this.route.queryParams
      .subscribe({
        next: (queryParams) => {
          this.idCategoria = queryParams['idCategoria']
          console.log(this.idCategoria)
          if (this.idCategoria) {
            this.getCategoria()
          }
          else {
            this.nombreCategoria = ''
          }
          this.getProductos()
        }
      })
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.idCategoria = this.route.snapshot.queryParams['idCategoria']

  }

  getProductos() {
    this.loading = true
    this.productService.getProducts(1, 9999, this.idCategoria)
      .subscribe({
        next: (resp) => {
          this.lista = resp.content
          this.dtTrigger.next(this.lista);
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
            this.router.navigateByUrl('/')
            Swal.fire({
              icon: "error",
              title: "Oops",
              text: "Categoria inexistente"
            })
            this.loading = false
          }
        },
        error: (error) => {
          this.router.navigateByUrl('/')
          Swal.fire({
            icon: "error",
            title: "Oops",
            text: "Categoria inexistente"
          })
          this.loading = false
        }

      })
  }

  asignarColor(idProducto: number) {
    this.router.navigateByUrl('/products/color?idProducto=' + idProducto);
  }

  verImagenes(idProducto: number) {
    this.router.navigateByUrl("/images?idProducto=" + idProducto)
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  eliminarColor(idProducto: number, codigoColor: string) {
    this.loading = true
    this.productService.eliminarColor(idProducto, codigoColor)
      .subscribe({
        next: (resp) => {
          if (resp) {
            Swal.fire(
              'Desasignado!',
              'Se ha eliminado el color correctamente.',
              'success'
            ).then((resp) => {
              window.location.reload()
            })
            this.loading = false
          }
          else {
            Swal.fire(
              'Oops!',
              'Ocurrió un error inesperado.',
              'error'
            )
            this.loading = false
          }
        }
      })
  }

  deleteProducto(nombre: string, id: number) {
    Swal.fire({
      title: '¿Seguro que desea borrar el producto ' + nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true
        this.productService.deleteArticulo(id)
          .subscribe({
            next: (resp) => {
              if (resp) {
                Swal.fire(
                  'Borrado!',
                  'El producto ha sido borrado.',
                  'success'
                ).then((resp) => {
                  window.location.reload()
                })
                this.loading = false
              }
              else {
                Swal.fire(
                  'Oops!',
                  'Ocurrió un error inesperado.',
                  'error'
                )
                this.loading = false
              }
            },
            error: (error) => {
              Swal.fire(
                'Oops!',
                'Ocurrió un error inesperado.',
                'error'
              )
              this.loading = false
            }
          })

      }
    })
  }

}
