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

  loading: boolean = false

  categoria!: Categoria

  nombreCategoria:string=''

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

    this.getCategoria()

    this.getImagenes()
    
  }

  getImagenes(){
    this.loading=true
    this.servicioImagen.getImagenesByCategoria(this.idCategoria)
    .subscribe({
      next: (resp) => {
        this.lista = resp
        this.dtTrigger.next(this.lista)
        this.loading=false
      },
      error: (error) => {
        Swal.fire({
          icon:'error',
          title: 'Oops...',
          text: 'Algo ha ido mal'
        })
        this.loading=false

      }
    })
  }

  getCategoria() {
    this.loading=true
    this.servicioCategoria.getCategoriaById(this.idCategoria)
      .subscribe({
        next: (resp) => {
          this.categoria = resp
          this.nombreCategoria=resp.nombre
          this.loading=false
        },
        error: (error) => {
          Swal.fire({
            icon:'error',
            title: 'Oops...',
            text: 'Algo ha ido mal'
          })
          this.loading=false
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
      const tamañoMaximo = 1048576;
      const nombreArchivo = file.name;
      const extension = nombreArchivo.substring(nombreArchivo.lastIndexOf('.') + 1).toLowerCase();
      if (file.size >= tamañoMaximo) {
        Swal.fire({
          icon: 'error',
          title: 'Tamaño superado',
          text: 'El archivo que intentas subir es demasiado grande'
        })
      }
      else if (!(extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif' || extension === 'webp')) {
        Swal.fire({
          icon: 'error',
          title: 'Tipo incorrecto',
          text: 'El archivo que intentas subir no es una imagen'
        })
      }
      else {
        this.loading=true
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
              this.loading=false
            },
            error: (error) => {
              Swal.fire(
                'Oops!',
                'Ocurrió un error inesperado.',
                'error'
              )
              this.loading=false

            }
          })
      }

    }

  }

  deleteImagen(imagen: ImagenCategoria) {
    Swal.fire({
      title: '¿Seguro que desea borrar la imagen?',
      imageUrl: imagen.img,
      imageHeight: 300,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading=true
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
              this.loading=false
            },
            error: (error) => {
              Swal.fire(
                'Oops!',
                'Ocurrió un error inesperado.',
                'error'
              )
              this.loading=false
            }
          })

      }
    })
  }

}
