import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap, catchError, of } from 'rxjs';
import { Imagen } from "../interfaces/imagen.interface";
import { ImagenCategoria } from "../interfaces/imagen-categoria.interface";

@Injectable({
  providedIn: 'root'
})

export class imagenService {

  url: string = 'https://apimarbearte-production.up.railway.app/imagen'
  urlLocal:string='http://localhost:8082/imagen'

  url2: string = 'https://apimarbearte-production.up.railway.app/imagen_categoria'
  urlLocal2:string='http://localhost:8082/imagen_categoria'

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  httpMultipartHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>' })
  }

  getImagenesByProduct(idProducto: number): Observable<Imagen[]> {
    return this.http.get<Imagen[]>(this.urlLocal + '/' + idProducto)
  }

  deleteImagen(idImagen: number): Observable<boolean> {
    return this.http.delete<any>(this.urlLocal + '/' + idImagen)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  addImagen(file: File, idProducto: number): Observable<boolean> {

    const datos: FormData = new FormData()
    datos.append("imagen", new Blob([JSON.stringify({})], { type: 'application/json' }))
    datos.append("file", file)
    return this.http.post<any>(this.urlLocal + "/" + idProducto, datos)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  getImagenesByCategoria(idCategoria: number): Observable<ImagenCategoria[]> {
    return this.http.get<ImagenCategoria[]>(this.urlLocal2 + '/' + idCategoria)
  }

  deleteImagenCategoria(idImagen: number): Observable<boolean> {
    return this.http.delete<any>(this.urlLocal2 + '/' + idImagen)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  addImagenCategoria(file: File, idCategoria: number): Observable<boolean> {
    const datos: FormData = new FormData()
    datos.append("imagen", new Blob([JSON.stringify({})], { type: 'application/json' }))
    datos.append("file", file)
    return this.http.post<any>(this.urlLocal2 + "/" + idCategoria, datos)
      .pipe(switchMap(resp => {
        console.log(resp)
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }


}