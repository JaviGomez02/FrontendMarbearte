import { Component, OnInit } from '@angular/core';
import { productService } from '../../services/product.service';
import { Content, Color } from '../../interfaces/page.interface';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { colorService } from '../../services/color.service';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-color-producto',
  templateUrl: './color-producto.component.html',
  styleUrls: ['./color-producto.component.css']
})
export class ColorProductoComponent implements OnInit {

  constructor(private servicioProducto:productService, private servicioColor:colorService, private route:ActivatedRoute, private fb: FormBuilder){}

  myForm: FormGroup = this.fb.group({

  })

  

  producto!:Product

  listaColores:Color[]=[]

  idProducto!:number
  ngOnInit(): void {
    this.idProducto=this.route.snapshot.queryParams['idProducto']

      this.servicioProducto.getProducto(this.idProducto)
      .subscribe({
        next: (resp)=>{
          this.producto=resp
        },
        error: (error)=>{
          console.log(error)
        }
      })

      this.servicioColor.getColores()
      .subscribe({
        next: (resp)=>{
          this.listaColores=resp
          for(let i=0; i<this.listaColores.length; i++){
            this.myForm.addControl(this.listaColores[i].nombre, this.fb.control('', [Validators.required]))
          }
        },
        error: (error)=>{
          console.log(error)
        }
      })

      
  }

  save(){
    console.log(this.myForm.value)
  }
}
