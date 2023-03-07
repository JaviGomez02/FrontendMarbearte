import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Content, Imagene } from 'src/app/interfaces/page.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { productService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  constructor(private servicioProducto: productService, private activatedRoute:ActivatedRoute, private route:Router){
  }

  producto!:Product

  fotoPrincipal!:Imagene
  
  listaImagenes!:Imagene[]

  ngOnInit(): void {
    this.servicioProducto.getProducto(this.activatedRoute.snapshot.params['id'])
    .subscribe({
      next: (resp)=>{
        console.log(resp)
        if(resp){    
          this.producto=resp
          this.fotoPrincipal=resp.imagenes[0]
          this.listaImagenes=resp.imagenes
          this.listaImagenes.shift()
        }
        else{
          this.route.navigateByUrl('/')
          Swal.fire({
            icon:"error",
            title: "Oops",
            text: "Producto no encontrado"
          })
        }
      },
      error: (error)=>{
        this.route.navigateByUrl('/')
        Swal.fire({
          icon:"error",
          title: "Oops",
          text: "Producto no encontrado"
        })
      }
    })
  }

}
