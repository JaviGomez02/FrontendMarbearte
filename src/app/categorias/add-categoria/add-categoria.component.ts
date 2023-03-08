import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../interfaces/categoria.interface';
import { categoriaService } from '../../services/categoria.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css']
})
export class AddCategoriaComponent {

  constructor(private fb: FormBuilder, private categoriaService: categoriaService, private route: Router) { }

  myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: [null, [Validators.required, Validators.minLength(10)]]
  })

  isValidField(field: string) {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
  }


  addCategoria() {
    if (this.myForm.invalid) { //Para que no se pueda mandar el formulario sin tocar los campos
      this.myForm.markAllAsTouched()
    }
    else {
      this.categoriaService.addCategoria(this.myForm.value.nombre, this.myForm.value.descripcion)
        .subscribe({
          next: (resp) => {
            if (resp) {
              Swal.fire({
                icon: 'success',
                title: 'Categoria añadida correctamente',
                text: 'Nombre: ' + this.myForm.value.nombre + ', descripcion: ' + this.myForm.value.descripcion
              })
              this.route.navigate(["/categoria"])
            }
            else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo añadir la categoria'
              })
            }
          }
        })
    }

  }

}
