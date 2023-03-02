import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap, catchError, of } from 'rxjs';
import { Imagen } from "../interfaces/imagen.interface";

@Injectable({
    providedIn: 'root'
  })

export class imagenService{

    url:string='http://localhost:8082/imagen'

    constructor(private http:HttpClient){}

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    httpMultipartHeader = {
      headers: new HttpHeaders({'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'})
    }
   
    getImagenesByProduct(idProducto:number):Observable<Imagen[]>{
        return this.http.get<Imagen[]>(this.url+'/'+idProducto)
    }

    deleteImagen(idImagen:number):Observable<boolean>{
      return this.http.delete<any>(this.url+'/'+idImagen)
      .pipe( switchMap(resp => {
        return of(true);
      }),catchError(error => {
          return of(false);
      })
      )
    }

    addImagen(file:File, idProducto:number):Observable<boolean>{

      const datos:FormData = new FormData()
      datos.append("imagen", new Blob([JSON.stringify({})], {type: 'application/json'}))
      datos.append("file", file)
      console.log(datos)
      return this.http.post<any>(this.url+"/"+idProducto,datos)
      .pipe( switchMap(resp => {
        return of(true);
      }),catchError(error => {
          return of(false);
      })
      )
    }


}