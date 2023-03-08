import { Component, OnInit } from '@angular/core';
import { Imagen } from '../../interfaces/imagen.interface';
import { imagenService } from '../../services/imagen.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { productService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import Swal from 'sweetalert2';
import { Color } from 'src/app/interfaces/page.interface';

@Component({
  selector: 'app-datatable-imagenes',
  templateUrl: './datatable-imagenes.component.html',
  styleUrls: ['./datatable-imagenes.component.css']
})
export class DatatableImagenesComponent implements OnInit {

  lista: Imagen[] = []


  producto!: Product

  idProducto!: number

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private servicioImagen: imagenService, private route: ActivatedRoute, private servicioProducto: productService) { }

  ngOnInit(): void {

    this.idProducto = this.route.snapshot.queryParams['idProducto']

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.servicioProducto.getProducto(this.idProducto)
      .subscribe({
        next: (resp) => {
          this.producto = resp
        },
        error: (error) => {

        }
      })

    this.servicioImagen.getImagenesByProduct(this.idProducto)
      .subscribe({
        next: (resp) => {
          this.lista = resp
          this.dtTrigger.next(this.lista)
        },
        error: (error) => {

        }
      })
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  async addImagen() {
    const { value: file } = await Swal.fire({
      title: 'Selecciona la imagen',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Upload your profile picture'
      }
    })

    if (file) {
      this.servicioImagen.addImagen(file, this.idProducto)
        .subscribe({
          next: (resp) => {
            Swal.fire(
              'Añadido!',
              'La imagen ha sido añadida correctamente.',
              'success'
            ).then((resp) => {
              window.location.reload()
            })
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

  }

  deleteImagen(imagen: Imagen) {
    Swal.fire({
      title: '¿Seguro que desea borrar la imagen?',
      imageUrl: imagen.img,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioImagen.deleteImagen(imagen.id)
          .subscribe({
            next: (resp) => {
              Swal.fire(
                'Borrado!',
                'La imagen ha sido borrada.',
                'success'
              ).then((resp) => {
                window.location.reload()
              })
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
