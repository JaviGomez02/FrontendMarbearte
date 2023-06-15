import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { categoriaService } from 'src/app/services/categoria.service';
import { productService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css']
})
export class ProductsAddComponent implements OnInit {

  listaCategorias: Categoria[] = []

  loading:boolean=false

  myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
    descripcion: [null, [Validators.required, Validators.minLength(10)]],
    price: ['', [Validators.required, Validators.min(0), Validators.max(99999)]],
    stock: ['', [Validators.required, Validators.min(0), Validators.max(999999999)]],
    opcionCategoria: ['', [Validators.required]]
  })


  constructor(private fb: FormBuilder, private categoriaService: categoriaService,
    private route: Router, private productService: productService) { }


  ngOnInit(): void {
    this.getCategorias()
  }

  getCategorias(){
    this.loading=true
    this.categoriaService.getCategorias()
    .subscribe({
      next: (resp) => {
        this.listaCategorias = resp
        this.loading=false
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo ha ido mal'
        }).then((resp) => {
          this.route.navigateByUrl('/products/all')
        })
        this.loading=false
      }
    })
  }

  isValidField(field: string) {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
  }

  addProduct() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
    }
    else {
      this.loading=true
      // console.log(this.myForm.value.nombre, this.myForm.value.descripcion, this.myForm.value.price, this.myForm.value.stock, this.myForm.value.opcionCategoria)
      this.productService.addProduct(this.myForm.value.nombre, this.myForm.value.descripcion, this.myForm.value.price, this.myForm.value.stock, this.myForm.value.opcionCategoria)
        .subscribe({
          next: (resp) => {
            if (resp) {
              Swal.fire({
                icon: 'success',
                title: 'Producto añadido correctamente',
                text: 'Nombre: ' + this.myForm.value.nombre + ', descripcion: ' + this.myForm.value.descripcion
              })
              this.route.navigate(["/products/all"])
              this.loading=false
            }
            else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo añadir el producto'
              })
              this.loading=false
            }
          }
        })
    }
  }
}
