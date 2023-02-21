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

  listaPagination:number[]=[]

  totalPages:number=1

  sizeNumber:number=20

  pageNumber:number=1

  ngOnInit(): void {

    this.servicio.getProducts(this.pageNumber, this.sizeNumber)
    .subscribe({
      next: (resp)=>{
        console.log(resp)
        this.lista=resp.content
        this.totalPages=resp.totalPages

        for(let i=0; i<this.totalPages;i++){
          this.listaPagination.push(i+1)
        }
      },
      error: (error)=>{
        
      }
    })
  
  }

  setPageNumber(numero:number){
    this.pageNumber=numero

    this.servicio.getProducts(this.pageNumber, this.sizeNumber)
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
