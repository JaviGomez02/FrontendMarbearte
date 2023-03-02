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
   
    getImagenesByProduct(idProducto:number):Observable<Imagen[]>{
        return this.http.get<Imagen[]>(this.url+'/'+idProducto)
    }


}