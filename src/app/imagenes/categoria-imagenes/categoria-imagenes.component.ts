import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { ImagenCategoria } from 'src/app/interfaces/imagen-categoria.interface';
import { categoriaService } from 'src/app/services/categoria.service';
import { imagenService } from 'src/app/services/imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-imagenes',
  templateUrl: './categoria-imagenes.component.html',
  styleUrls: ['./categoria-imagenes.component.css']
})
export class CategoriaImagenesComponent implements OnInit {
  lista: ImagenCategoria[] = []


  categoria!: Categoria

  idCategoria!: number

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private servicioImagen: imagenService, private route: ActivatedRoute, private servicioCategoria: categoriaService) { }

  ngOnInit(): void {

    this.idCategoria = this.route.snapshot.queryParams['idCategoria']

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.servicioCategoria.getCategoriaById(this.idCategoria)
      .subscribe({
        next: (resp) => {
          this.categoria = resp
        },
        error: (error) => {

        }
      })

    this.servicioImagen.getImagenesByCategoria(this.idCategoria)
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
      this.servicioImagen.addImagenCategoria(file, this.idCategoria)
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

  deleteImagen(imagen: ImagenCategoria) {
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
        this.servicioImagen.deleteImagenCategoria(imagen.id)
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
