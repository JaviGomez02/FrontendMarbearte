import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, catchError, of } from 'rxjs';
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

    addCategoria(nombre:string, descripcion:string):Observable<boolean>{
      return this.http.post<any>(this.url, {"nombre":nombre, "descripcion":descripcion})
      .pipe( switchMap(resp => {
        return of(true);
      }),catchError(error => {
          return of(false);
      })
      )
    }
    


}