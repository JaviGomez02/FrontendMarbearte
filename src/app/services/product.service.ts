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

    getProducts():Observable<Page>{
      return this.http.get<Page>(this.url)
    }


}