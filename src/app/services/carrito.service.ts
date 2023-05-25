import { Injectable } from "@angular/core";
import { Product } from "../interfaces/product.interface";
import { CookieService } from "ngx-cookie-service";
import { ItemCarrito } from "../interfaces/itemCarrito.interface";
import Swal from "sweetalert2";
import { Color } from "../interfaces/page.interface";

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
        if (producto.colores.length) {
            tieneColor = true
        }
        if (producto.stock < cantidad) {
            Swal.fire({
                icon: "error",
                title: "Oops",
                text: "Se ha excedido el stock del artículo"
            })
        }
        else {
            for (let i = 0; i < this.listaCarrito.length; i++) {
                if ((this.listaCarrito[i].producto.id == producto.id)) {
                    if (tieneColor) {
                        if (this.listaCarrito[i].producto.colores[0].color.nombre == producto.colores[0].color.nombre) {

                            encontrado = true
                            console.log("existe")
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
                                }).then((result) => {
                                    window.location.reload()
                                })
                            }
                        }
                    }
                    else {
                        encontrado = true
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
            if (!encontrado) {
                console.log("no existe")
                this.listaCarrito.push(item)
                Swal.fire({
                    icon: "success",
                    title: "Producto añadido al carrito!"
                }).then((result) => {
                    window.location.reload()
                })
            }
            this.cargarCarrito()
        }


    }

    vaciarCarrito() {
        this.listaCarrito = []
    }



}