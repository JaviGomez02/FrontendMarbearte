import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap, catchError, of } from 'rxjs';
import { Categoria } from '../interfaces/categoria.interface';

@Injectable({
  providedIn: 'root'
})

export class categoriaService {

  url: string = 'https://apimarbearte-production.up.railway.app/categoria'



  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url)
  }

  addCategoria(nombre: string, descripcion: string): Observable<boolean> {
    return this.http.post<any>(this.url, { "nombre": nombre, "descripcion": descripcion }, this.httpOptions)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }


  deleteCategoria(id: number): Observable<boolean> {
    return this.http.delete<any>(this.url + '/' + id)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  editarCategoria(id: number, nombre: string, descripcion: string): Observable<boolean> {
    return this.http.put<any>(this.url + '/' + id, { "nombre": nombre, "descripcion": descripcion }, this.httpOptions)
      .pipe(switchMap(resp => {
        return of(true)
      }), catchError(error => {
        return of(false)
      })
      )
  }

  getCategoriaById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(this.url + '/' + id)
  }


}