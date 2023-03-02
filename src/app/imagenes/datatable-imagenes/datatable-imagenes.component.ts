import { Component, OnInit } from '@angular/core';
import { Imagen } from '../../interfaces/imagen.interface';
import { imagenService } from '../../services/imagen.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { productService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-datatable-imagenes',
  templateUrl: './datatable-imagenes.component.html',
  styleUrls: ['./datatable-imagenes.component.css']
})
export class DatatableImagenesComponent implements OnInit {

  lista:Imagen[]=[]

  producto!:Product

  idProducto!:number

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private servicioImagen:imagenService, private route:ActivatedRoute, private servicioProducto:productService){}

  ngOnInit(): void {

    this.idProducto=this.route.snapshot.queryParams['idProducto']
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.servicioProducto.getProducto(this.idProducto)
    .subscribe({
      next: (resp)=>{
        this.producto=resp
      },
      error: (error)=>{
        
      }
    })

      this.servicioImagen.getImagenesByProduct(this.idProducto)
      .subscribe({
        next: (resp)=>{
          this.lista=resp
          this.dtTrigger.next(this.lista)
        },
        error:(error)=>{

        }
      })
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
