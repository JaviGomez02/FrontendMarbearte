import { Component, OnDestroy, OnInit } from '@angular/core';
import { productService } from '../../services/product.service';
import { Content } from '../../interfaces/page.interface';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datatable-product',
  templateUrl: './datatable-product.component.html',
  styleUrls: ['./datatable-product.component.css']
})
export class DatatableProductComponent implements OnInit, OnDestroy {

  constructor(private productService:productService) { }

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  lista:Content[]=[]

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };


    this.productService.getProducts(1, 999, -1)
    .subscribe({
      next: (resp)=>{
        this.lista=resp.content
        this.dtTrigger.next(this.lista);
      }
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  deleteProducto(nombre:string, id:number){
    Swal.fire({
      title: '¿Seguro que desea borrar el producto '+nombre+'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteArticulo(id)
        .subscribe({
          next: (resp)=>{
            Swal.fire(
              'Borrado!',
              'El producto ha sido borrado.',
              'success'
            ).then((resp)=>{
              window.location.reload()
            })
          },
          error: (error)=>{
            Swal.fire(
              'Oops!',
              'Ocurrió un error inesperado.',
              'error'
            )
          }
        })
        
      }
    })
  }

}
