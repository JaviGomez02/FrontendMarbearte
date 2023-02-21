import { Component, OnInit } from '@angular/core';
import { productService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { Content } from '../../interfaces/page.interface';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  constructor(private servicio:productService) { }

  lista:Content[]=[]

  ngOnInit(): void {

    this.servicio.getProducts(1, 20)
    .subscribe({
      next: (resp)=>{
        console.log(resp)
        this.lista=resp.content
      },
      error: (error)=>{
        
      }
    })
  
  }

  

}
