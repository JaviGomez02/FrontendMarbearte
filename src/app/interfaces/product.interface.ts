import { Categoria } from './categoria.interface';
export interface Product{
    id: number,
    nombre: string,
    descripcion: string,
    price: number,
    stock: number,
    categoria: Categoria
}