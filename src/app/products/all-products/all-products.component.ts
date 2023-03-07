import { Component, OnDestroy, OnInit } from '@angular/core';
import { productService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { Content } from '../../interfaces/page.interface';
import { CookieService } from 'ngx-cookie-service';
import { authService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { categoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit, OnDestroy {

  constructor(private servicio:productService, private cookieService:CookieService, private router:Router,
     private authService: authService, private route: ActivatedRoute, private servicioCategoria:categoriaService) {
   }

  isAdmin:boolean=false

  token:string=""

  lista:Content[]=[]

  listaPagination:number[]=[]

  totalPages:number=1

  sizeNumber:number=16

  pageNumber:number=1

  idCategoria!:number

  nombreCategoria!:string

  ngOnInit(): void {


    this.idCategoria=this.route.snapshot.queryParams['idCategoria']
    if(this.idCategoria){
      this.servicioCategoria.getCategoriaById(this.idCategoria)
      .subscribe({
        next: (resp)=>{
          if(resp){  
            this.nombreCategoria=resp.nombre
          }
          else{
            this.router.navigateByUrl('/')
            Swal.fire({
              icon: "error",
              title: "Oops",
              text: "Categoria inexistente"
            })
          }
        },
        error: (error)=>{
          this.router.navigateByUrl('/')
            Swal.fire({
              icon: "error",
              title: "Oops",
              text: "Categoria inexistente"
            })
        }
      })
    }
    this.servicio.getProducts(this.pageNumber, this.sizeNumber, this.idCategoria)
    .subscribe({
    next: (resp)=>{
        this.lista=resp.content
        this.totalPages=resp.totalPages

        for(let i=0; i<this.totalPages;i++){
          this.listaPagination.push(i+1)
        }
      },
      error: (error)=>{
        
      }
    })
    

    this.token = this.cookieService.get('token')
    if(this.token && this.authService.decodeJwt(this.token).role=='ADMIN'){
      this.isAdmin=true;
    }
  
  }

  ngOnDestroy(): void {
    
  }

  previousPageNumber(){
    if(this.pageNumber>1){
      this.pageNumber=this.pageNumber-1

      this.servicio.getProducts(this.pageNumber, this.sizeNumber, this.idCategoria)
      .subscribe({
        next: (resp)=>{
          this.lista=resp.content
        },
        error: (error)=>{
          
        }
      })
    }
    
  }

  nextPageNumber(){
    if(this.pageNumber<this.totalPages){
      this.pageNumber=this.pageNumber+1

      this.servicio.getProducts(this.pageNumber, this.sizeNumber, this.idCategoria)
      .subscribe({
      next: (resp)=>{
        this.lista=resp.content
      },
      error: (error)=>{
        
      }
    })
    }
    
  }

  setPageNumber(numero:number){
    this.pageNumber=numero

    this.servicio.getProducts(this.pageNumber, this.sizeNumber, this.idCategoria)
    .subscribe({
      next: (resp)=>{
        this.lista=resp.content
      },
      error: (error)=>{
        
      }
    })
  }

}
