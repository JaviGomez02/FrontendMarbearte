import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { categoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-categoria',
  templateUrl: './update-categoria.component.html',
  styleUrls: ['./update-categoria.component.css']
})
export class UpdateCategoriaComponent implements OnInit {

  constructor(private fb: FormBuilder, private categoriaService: categoriaService, private route: Router, private activatedRoute: ActivatedRoute) { }

  id: number = 0

  myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    descripcion: [null, [Validators.required, Validators.minLength(10)]]
  })

  isValidField(field: string) {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
  }

  ngOnInit() {

    this.categoriaService.getCategoriaById(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (resp) => {
          if (resp) {
            this.myForm.reset({
              nombre: resp.nombre,
              descripcion: resp.descripcion
            })
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo ha ido mal'
            }).then((resp) => {
              this.route.navigateByUrl('/categoria')
            })
          }
        }, error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo ha ido mal'
          }).then((resp) => {
            this.route.navigateByUrl('/categoria')
          })
        }
      })

  }



  editarCategoria() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched
    }
    else {
      this.categoriaService.editarCategoria(this.activatedRoute.snapshot.params['id'], this.myForm.value.nombre, this.myForm.value.descripcion)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              icon: 'success',
              title: 'Categoria actualizada correctamente',
              text: 'Nombre: ' + this.myForm.value.nombre + ', descripcion: ' + this.myForm.value.descripcion
            })
            this.route.navigate(["/categoria"])
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
}
