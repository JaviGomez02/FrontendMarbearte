import { Component, OnInit } from '@angular/core';
import { productService } from '../../services/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  constructor(private servicio:productService) { }

  ngOnInit(): void {

    this.servicio.getProducts()
    .subscribe({
      next: (resp)=>{
        console.log(resp)
      },
      error: (error)=>{
        
      }
    })
  
  }

  

}
