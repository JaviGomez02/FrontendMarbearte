import { Component, OnDestroy, OnInit } from '@angular/core';
import { productService } from '../../services/product.service';
import { Content } from '../../interfaces/page.interface';
import { Subject } from 'rxjs';

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


    this.productService.getProducts(1, 999)
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

}
