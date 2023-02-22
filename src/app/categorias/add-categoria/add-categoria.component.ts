import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../interfaces/categoria.interface';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css']
})
export class AddCategoriaComponent {

  nuevaCategoria:Categoria={nombre:"", descripcion: "", id: 0}

  constructor(private fb: FormBuilder) { }

  myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: [null, [Validators.required, Validators.minLength(10)]]
  })

  isValidField(field: string){
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched
}

}
