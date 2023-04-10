import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap, catchError, of } from 'rxjs';
import { Categoria } from '../interfaces/categoria.interface';

@Injectable({
  providedIn: 'root'
})

export class categoriaService {

  url: string = 'https://apimarbearte-production.up.railway.app/categoria'
  urlLocal:string='http://localhost:8082/categoria'


  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlLocal)
  }

  addCategoria(nombre: string, descripcion: string): Observable<boolean> {
    return this.http.post<any>(this.urlLocal, { "nombre": nombre, "descripcion": descripcion }, this.httpOptions)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }


  deleteCategoria(id: number): Observable<boolean> {
    return this.http.delete<any>(this.urlLocal + '/' + id)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  editarCategoria(id: number, nombre: string, descripcion: string): Observable<boolean> {
    return this.http.put<any>(this.urlLocal + '/' + id, { "nombre": nombre, "descripcion": descripcion }, this.httpOptions)
      .pipe(switchMap(resp => {
        return of(true)
      }), catchError(error => {
        return of(false)
      })
      )
  }

  getCategoriaById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(this.urlLocal + '/' + id)
  }


}