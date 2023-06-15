import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { categoriaService } from 'src/app/services/categoria.service';
import { productService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {

  constructor(private fb: FormBuilder, private categoriaService: categoriaService,
    private route: Router, private productService: productService, private aRoute: ActivatedRoute) { }

  idProducto!: number

  loading: boolean = false

  listaCategorias: Categoria[] = []

  myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
    descripcion: [null, [Validators.required, Validators.minLength(10)]],
    price: ['', [Validators.required, Validators.min(0), Validators.max(99999)]],
    stock: ['', [Validators.required, Validators.min(0), Validators.max(999999999)]],
    opcionCategoria: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.idProducto = this.aRoute.snapshot.params['id']

    this.getProducto()

    this.getCategorias()
  }

  getProducto() {
    this.loading=true
    this.productService.getProducto(this.idProducto)
      .subscribe({
        next: (resp) => {
          if (resp) {
            this.myForm.reset({
              nombre: resp.nombre,
              descripcion: resp.descripcion,
              price: resp.price,
              stock: resp.stock,
              opcionCategoria: resp.categoria.id
            })
            this.loading=false
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo ha ido mal'
            }).then((resp) => {
              this.route.navigateByUrl('/products/all')
            })
            this.loading=false
          }
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

  getCategorias() {
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

  updateProduct() {
    this.loading=true
    this.productService.updateProduct(this.idProducto, this.myForm.value.nombre, this.myForm.value.descripcion, this.myForm.value.price, this.myForm.value.stock, this.myForm.value.opcionCategoria)
      .subscribe({
        next: (resp) => {
          if (resp) {
            Swal.fire({
              icon: 'success',
              title: 'Producto actualizado correctamente',
              text: 'Nombre: ' + this.myForm.value.nombre + ', descripcion: ' + this.myForm.value.descripcion
            })
            
            this.loading=false
            this.route.navigate(["/products/all"])
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se pudo actualizar el producto'
            })
            
            this.loading=false
          }
        }
      })
  }
}
