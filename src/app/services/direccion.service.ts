import { Injectable } from "@angular/core";
import { Product } from "../interfaces/product.interface";
import { CookieService } from "ngx-cookie-service";
import { ItemCarrito, ItemCarritoAux } from "../interfaces/itemCarrito.interface";
import Swal from "sweetalert2";
import { Color } from "../interfaces/page.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, of, switchMap } from "rxjs";
import { carritoService } from "./carrito.service";

@Injectable({
    providedIn: 'root'
})

export class direccionService {

    constructor(private cookies: CookieService, private http: HttpClient, private servicioCarrito: carritoService) { }

    url: string = 'https://apimarbearte-production.up.railway.app/direccion'
    urlLocal: string = 'http://localhost:8082/direccion'
    listaCarritoAux: ItemCarritoAux[] = []
    listaCarritoFinal: ItemCarritoAux[] = []

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    addDireccion(codigoPostal: string, ciudad: string, localidad: string, direccion: string) {
        return this.http.post<any>(this.url, {
            "codigoPostal": codigoPostal,
            "ciudad": ciudad,
            "localidad": localidad,
            "direccion": direccion
        })
            .pipe(switchMap(resp => {
                return of(true);
            }), catchError(error => {
                return of(false);
            })
            )
    }

    deleteDireccion(id: number): Observable<boolean> {
        return this.http.delete<any>(this.url + '/' + id)
            .pipe(switchMap(resp => {
                return of(true);
            }), catchError(error => {
                return of(false);
            })
            )
    }



}