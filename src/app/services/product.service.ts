import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { Page } from '../interfaces/page.interface';

@Injectable({
    providedIn: 'root'
  })

export class productService{

    url:string='http://localhost:8082/articulo'

    constructor(private http:HttpClient){}

    getProducts(pageNumber:number, sizeNumber:number, idCategoria:number):Observable<Page>{
      if(idCategoria){
        return this.http.get<Page>(this.url+'?pageNumber='+pageNumber+'&sizeNumber='+sizeNumber+'&idCategoria='+idCategoria)
      }
      else{
        return this.http.get<Page>(this.url+'?pageNumber='+pageNumber+'&sizeNumber='+sizeNumber)

      }
    }




}