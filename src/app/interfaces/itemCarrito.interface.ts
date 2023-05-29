
import { Color } from './page.interface';
import { Product } from './product.interface';
export interface ItemCarrito {
    producto:Product,
    cantidad:number
}

export interface ItemCarritoAux{
    idArticulo:number,
    cantidad:number
}