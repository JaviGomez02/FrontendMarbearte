import { Injectable } from "@angular/core";
import { Product } from "../interfaces/product.interface";
import { CookieService } from "ngx-cookie-service";
import { ItemCarrito } from "../interfaces/itemCarrito.interface";
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})

export class carritoService {

    constructor(private cookies: CookieService) { }

    listaCarrito: ItemCarrito[] = []


    cargarCarrito() {
        this.cookies.set('carrito', JSON.stringify(this.listaCarrito))
    }

    getListaCarrito() {
        this.recuperarCarrito()
        return this.listaCarrito
    }

    recuperarCarrito() {
        const carrito = this.cookies.get('carrito');
        if (carrito) {
            this.listaCarrito = JSON.parse(carrito)
        }
    }

    eliminarProducto(idProducto: number) {
        this.listaCarrito = this.getListaCarrito().filter((itemCarrito) => itemCarrito.producto.id != idProducto)
        this.cargarCarrito()
    }

    añadirProducto(producto: Product, cantidad: number) {

        let item: ItemCarrito = { producto, cantidad }
        let encontrado = false;
        if (producto.stock < cantidad) {
            Swal.fire({
                icon: "error",
                title: "Oops",
                text: "Se ha excedido el stock del artículo"
            })
        }
        else {
            for (let i = 0; i < this.listaCarrito.length; i++) {
                if (this.listaCarrito[i].producto.id == producto.id) {
                    encontrado = true
                    if ((this.listaCarrito[i].cantidad + cantidad) > producto.stock) {
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
                        })
                    }
                }
            }
            if (!encontrado) {
                this.listaCarrito.push(item)
                Swal.fire({
                    icon: "success",
                    title: "Producto añadido al carrito!"
                })
            }
            this.cargarCarrito()
        }


    }

    vaciarCarrito() {
        this.listaCarrito = []
    }



}