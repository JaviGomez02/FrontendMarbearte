import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria.interface';

@Injectable({
    providedIn: 'root'
  })

export class categoriaService{

    url:string='http://localhost:8082/categoria'

    constructor(private http:HttpClient){}

    getCategorias():Observable<Categoria[]>{
      return this.http.get<Categoria[]>(this.url)
    }


}