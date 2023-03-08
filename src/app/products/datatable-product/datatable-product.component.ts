import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { productService } from '../../services/product.service';
import { Color, Content } from '../../interfaces/page.interface';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-datatable-product',
  templateUrl: './datatable-product.component.html',
  styleUrls: ['./datatable-product.component.css']
})
export class DatatableProductComponent implements OnInit, OnDestroy {

  constructor(private productService: productService, private route: ActivatedRoute, private router: Router) { }


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  lista: Content[] = []


  idCategoria!: number


  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.idCategoria = this.route.snapshot.queryParams['idCategoria']

    this.productService.getProducts(1, 9999, this.idCategoria)
      .subscribe({
        next: (resp) => {
          this.lista = resp.content
          this.dtTrigger.next(this.lista);
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
          }
          else {
            Swal.fire(
              'Oops!',
              'Ocurrió un error inesperado.',
              'error'
            )
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
              }
              else {
                Swal.fire(
                  'Oops!',
                  'Ocurrió un error inesperado.',
                  'error'
                )
              }
            },
            error: (error) => {
              Swal.fire(
                'Oops!',
                'Ocurrió un error inesperado.',
                'error'
              )
            }
          })

      }
    })
  }

}
