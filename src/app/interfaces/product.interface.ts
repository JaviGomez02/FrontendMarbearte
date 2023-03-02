import { Categoria } from './categoria.interface';
import { Imagene, Colore } from './page.interface';
export interface Product{
    id:          number;
    nombre:      string;
    descripcion: string;
    price:       number;
    stock:       number;
    categoria:   Categoria;
    imagenes:    Imagene[];
    compras:     any[];
    colores:     Colore[];
}