import { Injectable } from "@angular/core";
import { Product } from "../interfaces/product.interface";
import { CookieService } from "ngx-cookie-service";
import { ItemCarrito } from "../interfaces/itemCarrito.interface";
import Swal from "sweetalert2";
import { Color } from "../interfaces/page.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, of, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class carritoService {

    constructor(private cookies: CookieService, private http: HttpClient) { }

    url: string = 'https://apimarbearte-production.up.railway.app'
    urlLocal: string = 'http://localhost:8082'
    listaCarrito: ItemCarrito[] = []

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    cargarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(this.listaCarrito))
        // this.cookies.set('carrito', JSON.stringify(this.listaCarrito))
    }

    getListaCarrito() {
        this.recuperarCarrito()
        return this.listaCarrito
    }

    recuperarCarrito() {
        // const carrito = this.cookies.get('carrito');
        const carrito = localStorage.getItem('carrito')
        if (carrito) {
            this.listaCarrito = JSON.parse(carrito)
        }
    }

    eliminarProducto(item: ItemCarrito) {
        let idProducto = item.producto.id
        let contador = 0
        let encontrado = false
        let tieneColor = false;
        if (item.producto.colores.length) {
            tieneColor = true
        }
        if (tieneColor) {
            for (let i = 0; i < this.listaCarrito.length; i++) {
                if ((this.listaCarrito[i].producto.id == item.producto.id) && (this.listaCarrito[i].producto.colores[0].color.nombre == item.producto.colores[0].color.nombre)) {
                    encontrado = true
                }
                if (!encontrado) {
                    contador++
                }
            }
            this.listaCarrito.splice(contador, 1)
        }
        else {
            this.listaCarrito = this.getListaCarrito().filter((itemCarrito) => itemCarrito.producto.id != idProducto)
        }

        this.cargarCarrito()
    }

    añadirProducto(producto: Product, cantidad: number) {

        let item: ItemCarrito = { producto, cantidad }
        let encontrado = false;
        let tieneColor = false;
        let cantidadSuperior = false;
        let cantidadTotal = 0;
        let index = -1;
        
        if (producto.colores.length) {
            tieneColor = true
        }
        if (producto.stock < cantidad) {
            cantidadSuperior = true;
            Swal.fire({
                icon: "error",
                title: "Oops",
                text: "Se ha excedido el stock del artículo"
            })
        }
        else {
            for (let i = 0; i < this.listaCarrito.length; i++) {
                if ((this.listaCarrito[i].producto.id == producto.id)) {
                    if ((this.listaCarrito[i].cantidad + cantidad) > producto.stock) {
                        cantidadSuperior = true
                    }
                    if (tieneColor) {
                        cantidadTotal = cantidadTotal + this.listaCarrito[i].cantidad
                        if (this.listaCarrito[i].producto.colores[0].color.nombre == producto.colores[0].color.nombre) {
                            encontrado = true
                            index = i;
                        }
                    }
                    else {
                        encontrado = true
                        if (cantidadSuperior) {
                            Swal.fire({
                                icon: "error",
                                title: "Oops",
                                text: "Se ha excedido el stock del artículo"
                            })
                        }
                        else {
                            this.listaCarrito[i].cantidad += cantidad
                            Swal.fire({
                                icon: "success",
                                title: "Producto añadido al carrito!"
                            }).then((result) => {
                                window.location.reload()
                            })
                        }
                    }
                }
            }
            if (encontrado && tieneColor) {
                if ((cantidadTotal + cantidad) > producto.stock) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops",
                        text: "Se ha excedido el stock del artículo"
                    })
                }
                else {
                    this.listaCarrito[index].cantidad += cantidad
                    Swal.fire({
                        icon: "success",
                        title: "Producto añadido al carrito!"
                    }).then((result) => {
                        window.location.reload()
                    })
                }
            }
            else if (!encontrado) {
                if (tieneColor && ((cantidadTotal + cantidad) > producto.stock)) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops",
                        text: "Se ha excedido el stock del artículo"
                    })
                }
                else{
                    this.listaCarrito.push(item)
                    Swal.fire({
                        icon: "success",
                        title: "Producto añadido al carrito!"
                    }).then((result) => {
                        window.location.reload()
                    })
                }
            }
            this.cargarCarrito()
        }
    }

    vaciarCarrito() {
        this.listaCarrito = []
    }



}