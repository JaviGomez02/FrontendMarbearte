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

  loading: boolean = false

  nombreProducto:string=''

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

    this.getImagenes()

    this.getProducto()


  }

  getProducto() {
    this.loading = true
    this.servicioProducto.getProducto(this.idProducto)
      .subscribe({
        next: (resp) => {
          this.producto = resp
          this.nombreProducto=resp.nombre
          this.loading = false
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo ha ido mal'
          })
          this.loading = false
        }
      })
  }

  getImagenes() {
    this.loading = true
    this.servicioImagen.getImagenesByProduct(this.idProducto)
      .subscribe({
        next: (resp) => {
          this.lista = resp
          this.dtTrigger.next(this.lista)
          this.loading = false
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo ha ido mal'
          })
          this.loading = false
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
        this.loading = true
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
              this.loading = false
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


    }

  }

  deleteImagen(imagen: Imagen) {
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
        this.loading = true
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
              this.loading = false
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
