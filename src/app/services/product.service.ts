import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, of, catchError } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { Page } from '../interfaces/page.interface';

@Injectable({
  providedIn: 'root'
})

export class productService {

  url: string = 'https://apimarbearte-production.up.railway.app/articulo'
  urlLocal: string = 'http://localhost:8082/articulo'


  constructor(private http: HttpClient) { }

  getProducts(pageNumber: number, sizeNumber: number, idCategoria: number | null): Observable<Page> {
    if (idCategoria) {
      return this.http.get<Page>(this.url + '?pageNumber=' + pageNumber + '&sizeNumber=' + sizeNumber + '&idCategoria=' + idCategoria)
    }
    else {
      return this.http.get<Page>(this.url + '?pageNumber=' + pageNumber + '&sizeNumber=' + sizeNumber)

    }
  }

  getProducto(idProducto: number): Observable<Product> {
    return this.http.get<Product>(this.url + '/' + idProducto)
  }

  addProduct(nombre: string, descripcion: string, price: number, stock: number, idCategoria: number): Observable<boolean> {
    return this.http.post<any>(this.url, {
      "nombre": nombre,
      "descripcion": descripcion,
      "price": price,
      "stock": stock,
      "categoria": {
        "id": idCategoria
      }
    })
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  asignarColor(idProducto: number, codigoColor: string): Observable<boolean> {
    return this.http.put<any>(this.url + "/asignarColor/" + idProducto, { "color": codigoColor })
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  eliminarColor(idProducto: number, codigoColor: string): Observable<boolean> {
    return this.http.put<any>(this.url + "/desasignarColor/" + idProducto, { "color": codigoColor })
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  updateProduct(idProducto: number, nombre: string, descripcion: string, price: number, stock: number, idCategoria: number): Observable<boolean> {
    return this.http.put<any>(this.url + '/' + idProducto, {
      "nombre": nombre,
      "descripcion": descripcion,
      "price": price,
      "stock": stock,
      "categoria": {
        "id": idCategoria
      }
    })
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  deleteArticulo(id: number): Observable<boolean> {
    return this.http.delete<any>(this.url + '/' + id)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }
}