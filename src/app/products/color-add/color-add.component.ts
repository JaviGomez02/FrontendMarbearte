import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { categoriaService } from 'src/app/services/categoria.service';
import { colorService } from 'src/app/services/color.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent {

  color!:string;

  constructor(private fb: FormBuilder, private colorService: colorService, private route: Router) { }

  myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    color: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]]
  })

  isValidField(field: string) {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
  }


  addColor() {
    if (this.myForm.invalid) { //Para que no se pueda mandar el formulario sin tocar los campos
      this.myForm.markAllAsTouched()
    }
    else {
      this.colorService.addColor(this.myForm.value.color, this.myForm.value.nombre)
        .subscribe({
          next: (resp) => {
            if (resp) {
              Swal.fire({
                icon: 'success',
                title: 'Color creado correctamente',
                text: 'Nombre: ' + this.myForm.value.nombre + ', color: ' + this.myForm.value.color
              })
              this.route.navigate(["/products/all"])
            }
            else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo crear el color'
              })
            }
          }
        })
    }

  }
}
