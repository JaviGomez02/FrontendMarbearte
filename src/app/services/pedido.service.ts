import { Injectable } from "@angular/core";
import { Product } from "../interfaces/product.interface";
import { CookieService } from "ngx-cookie-service";
import { ItemCarrito, ItemCarritoAux } from "../interfaces/itemCarrito.interface";
import Swal from "sweetalert2";
import { Color } from "../interfaces/page.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, of, switchMap } from "rxjs";
import { carritoService } from "./carrito.service";

@Injectable({
    providedIn: 'root'
})

export class pedidoService {

    constructor(private cookies: CookieService, private http: HttpClient, private servicioCarrito: carritoService) { }

    url: string = 'https://apimarbearte-production.up.railway.app'
    urlLocal: string = 'http://localhost:8082'
    listaCarritoAux: ItemCarritoAux[] = []
    listaCarritoFinal: ItemCarritoAux[] = []

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };


    reportarIncidencia(username:string, idPedido:number, comentario:string, motivo:string){
        return this.http.get<any>(this.url+"/pedido/incidencia/"+idPedido+"?motivo="+motivo+"&comentario="+comentario+"&username="+username)
    }


    realizarPedido() {
        let listaCarrito = this.servicioCarrito.getListaCarrito()
        let encontrado
        for (let i = 0; i < listaCarrito.length; i++) {
            encontrado=false
            for (let j = 0; j < this.listaCarritoAux.length; j++) {
                if (this.listaCarritoAux[j].idArticulo == listaCarrito[i].producto.id) {
                    encontrado = true
                    this.listaCarritoAux[j].cantidad += listaCarrito[i].cantidad
                }
            }
            if (encontrado == false) {
                this.listaCarritoAux.push({
                    "idArticulo": listaCarrito[i].producto.id,
                    "cantidad": listaCarrito[i].cantidad
                })
            }
        }

        // console.log(this.listaCarritoAux)

        return this.http.post<any>(this.url + '/comprar', this.listaCarritoAux, this.httpOptions)
            .pipe(switchMap(resp => {
                return of(true);
            }), catchError(error => {
                return of(false);
            })
            )
    }



}