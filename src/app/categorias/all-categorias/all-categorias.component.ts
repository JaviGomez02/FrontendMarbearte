import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../interfaces/categoria.interface';
import { categoriaService } from '../../services/categoria.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-categorias',
  templateUrl: './all-categorias.component.html',
  styleUrls: ['./all-categorias.component.css']
})
export class AllCategoriasComponent implements OnInit {

  constructor(private categoriaService: categoriaService, private fb: FormBuilder, private route: Router) { }

  nombreCategoria: string = ""

  lista: Categoria[] = []

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.getCategorias()

    
  }

  getCategorias(){
    this.categoriaService.getCategorias()
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


  verProductos(idCategoria: number) {
    this.route.navigateByUrl("/products/all?idCategoria=" + idCategoria)
  }

  verImagenes(idCategoria: number) {
    this.route.navigateByUrl("/images/categoria?idCategoria=" + idCategoria)
  }

  deleteCategoria(nombre: string, id: number) {
    Swal.fire({
      title: '¿Seguro que desea borrar la categoria ' + nombre + '?',
      icon: 'warning',
      text: 'Se borraran todos los productos asociados a esa categoria',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.deleteCategoria(id)
          .subscribe({
            next: (resp) => {
              Swal.fire(
                'Borrado!',
                'La categoría ha sido borrada.',
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
