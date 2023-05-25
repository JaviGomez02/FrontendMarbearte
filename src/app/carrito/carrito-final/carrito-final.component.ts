import { Component, OnInit } from '@angular/core';
import { ItemCarrito } from 'src/app/interfaces/itemCarrito.interface';
import { carritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-carrito-final',
  templateUrl: './carrito-final.component.html',
  styleUrls: ['./carrito-final.component.css']
})
export class CarritoFinalComponent implements OnInit{

  constructor(private servicioCarrito:carritoService){}

  listaProductos:ItemCarrito[]=this.servicioCarrito.getListaCarrito();


  ngOnInit(): void {
    console.log(this.listaProductos)
  }

  
  calcularTotal():any{
    let total=0
    for (let i=0;i<this.listaProductos.length;i++){
      total+=this.listaProductos[i].producto.price*this.listaProductos[i].cantidad
    }
    return total.toFixed(2);
  }

  calcularUnidades():number{
    let unidades=0
    for (let i=0;i<this.listaProductos.length;i++){
      unidades+=this.listaProductos[i].cantidad
    }
    return unidades;
  }

  eliminarProducto(item:ItemCarrito){
    this.servicioCarrito.eliminarProducto(item)
    this.listaProductos=this.servicioCarrito.getListaCarrito();
  }

}
